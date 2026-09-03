import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "./config";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

/**
 * Maps Firebase Auth error codes to user-friendly messages
 */
export const getFriendlyAuthErrorMessage = (error) => {
  const code = error?.code || "";
  switch (code) {
    case "auth/operation-not-allowed":
      return "Google Sign-In is not enabled yet in your Firebase Console. Go to Firebase Console > Authentication > Sign-in method and enable Google.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized. Please add 'localhost' in Firebase Console > Authentication > Settings > Authorized domains.";
    case "auth/invalid-email":
      return "The email address entered is not valid.";
    case "auth/user-disabled":
      return "This user account has been disabled.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password. Please verify your credentials.";
    case "auth/email-already-in-use":
      return "An account with this email address already exists. Please sign in.";
    case "auth/weak-password":
      return "The password is too weak. Please use at least 6 characters.";
    case "auth/popup-closed-by-user":
      return "Google sign-in popup was closed before completing sign in.";
    case "auth/popup-blocked":
      return "Sign-in popup was blocked by your browser. Please allow popups for this site.";
    case "auth/cancelled-popup-request":
      return "Google sign-in popup was cancelled.";
    case "auth/network-request-failed":
      return "Network connection error. Please check your internet connection.";
    case "auth/too-many-requests":
      return "Too many failed login attempts. Please try again in a few minutes.";
    default:
      return error?.message || "Authentication failed. Please check your credentials.";
  }
};

/**
 * Register user with Email, Password and create Firestore profile in users/{uid}
 */
export const registerUser = async ({ email, password, firstName, lastName, mobile, role = "Legal Professional" }) => {
  const fullName = `${firstName?.trim() || ""} ${lastName?.trim() || ""}`.trim() || "Advocate User";

  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const firebaseUser = userCredential.user;

  // Update Auth Profile Display Name
  try {
    await updateProfile(firebaseUser, {
      displayName: fullName
    });
  } catch (err) {
    console.warn("Could not update displayName:", err);
  }

  // Create/Merge User Profile Document in Firestore: users/{uid}
  const userProfileData = {
    uid: firebaseUser.uid,
    name: fullName,
    firstName: firstName?.trim() || "",
    lastName: lastName?.trim() || "",
    email: email.trim(),
    mobile: mobile ? mobile.trim() : "",
    role: role || "Legal Professional",
    photoURL: firebaseUser.photoURL || null,
    authProvider: "email",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  try {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    await setDoc(userDocRef, userProfileData, { merge: true });
  } catch (err) {
    console.warn("Firestore profile save skipped or failed:", err);
  }

  return {
    ...userProfileData,
    createdAt: new Date().toISOString()
  };
};

/**
 * Sign in user with email & password and retrieve Firestore profile
 */
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
  const firebaseUser = userCredential.user;

  try {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      return userSnap.data();
    }
  } catch (err) {
    console.warn("Firestore getDoc error:", err);
  }

  const fallbackProfile = {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || email.split("@")[0],
    email: firebaseUser.email,
    role: "Legal Professional",
    photoURL: firebaseUser.photoURL || null,
    authProvider: "email",
    updatedAt: new Date().toISOString()
  };

  try {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    await setDoc(userDocRef, fallbackProfile, { merge: true });
  } catch (err) {
    console.warn("Firestore setDoc fallback error:", err);
  }

  return fallbackProfile;
};

/**
 * Sign in with Google Popup and synchronize Firestore profile
 */
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  let profile = {
    uid: user.uid,
    name: user.displayName || "Advocate User",
    email: user.email,
    role: "Advocate High Court",
    photoURL: user.photoURL || null,
    mobile: user.phoneNumber || "",
    authProvider: "google"
  };

  try {
    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const existingData = userSnap.data();
      profile = { ...existingData, photoURL: user.photoURL || existingData.photoURL };
      await updateDoc(userDocRef, {
        lastLoginAt: serverTimestamp(),
        photoURL: user.photoURL || existingData.photoURL || null
      });
    } else {
      await setDoc(userDocRef, {
        ...profile,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      });
    }
  } catch (err) {
    console.warn("[JudicialGPT Auth] Firestore profile sync warning (Auth still successful):", err);
  }

  return profile;
};

export const signInWithGoogle = loginWithGoogle;

/**
 * Send password reset email
 */
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email.trim());
  return true;
};

/**
 * Sign out current user
 */
export const logoutUser = () => signOut(auth);

/**
 * Real-time listener for Auth State changes
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          callback(userSnap.data());
          return;
        }
        callback({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "Advocate User",
          email: firebaseUser.email,
          role: "Legal Professional",
          photoURL: firebaseUser.photoURL || null,
          authProvider: firebaseUser.providerData[0]?.providerId || "email"
        });
      } catch (err) {
        console.error("[JudicialGPT Auth] Error fetching user profile:", err);
        callback({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "Advocate User",
          email: firebaseUser.email
        });
      }
    } else {
      callback(null);
    }
  });
};