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
  getDocs,
  collection,
  query,
  where,
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
      return "No account found with this email. Please sign up first before logging in.";
    case "auth/wrong-password":
      return "Incorrect password. Please verify your password or reset it.";
    case "auth/invalid-credential":
      return "Invalid email or password. If you don't have an account, please sign up first.";
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
 * Checks whether an email address exists in the Firestore users collection
 */
export const checkEmailRegistered = async (email) => {
  if (!email || !db) return null;
  try {
    const clean = email.trim().toLowerCase();
    const q1 = query(collection(db, "users"), where("email", "==", clean));
    const snap1 = await getDocs(q1);
    if (!snap1.empty) return true;

    const q2 = query(collection(db, "users"), where("email", "==", email.trim()));
    const snap2 = await getDocs(q2);
    if (!snap2.empty) return true;

    return false;
  } catch (err) {
    console.warn("[JudicialGPT Auth] checkEmailRegistered warning:", err);
    return null;
  }
};

/**
 * Register user with Email, Password and create Firestore profile in users/{uid}
 */
export const registerUser = async ({ email, password, firstName, lastName, mobile, role = "Legal Professional" }) => {
  const fullName = `${firstName?.trim() || ""} ${lastName?.trim() || ""}`.trim() || "Advocate User";
  const cleanEmail = email.trim();

  const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
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
    email: cleanEmail.toLowerCase(),
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
  const cleanEmail = email.trim();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
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
      name: firebaseUser.displayName || cleanEmail.split("@")[0],
      email: firebaseUser.email || cleanEmail,
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
  } catch (authError) {
    // Check if account doesn't exist
    if (authError.code === "auth/user-not-found") {
      throw new Error("No account found with this email. Please sign up first before logging in.");
    }
    if (authError.code === "auth/invalid-credential" || authError.code === "auth/wrong-password") {
      const isRegistered = await checkEmailRegistered(cleanEmail);
      if (isRegistered === false) {
        throw new Error("No account found with this email. Please sign up first before logging in.");
      }
      throw new Error("Incorrect password. Please verify your password or use 'Forgot password' to reset it.");
    }
    throw new Error(getFriendlyAuthErrorMessage(authError));
  }
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
    email: user.email ? user.email.toLowerCase() : "",
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
 * Send password reset email with prior registration verification
 */
export const resetPassword = async (email) => {
  const cleanEmail = email.trim();

  // Verify whether email exists in Firestore registration database
  const isRegistered = await checkEmailRegistered(cleanEmail);
  if (isRegistered === false) {
    throw new Error("This email is not registered with JudicialGPT. Please sign up first to create an account.");
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:5174";
  const actionCodeSettings = {
    url: `${origin}/login`,
    handleCodeInApp: false
  };

  try {
    await sendPasswordResetEmail(auth, cleanEmail, actionCodeSettings);
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      throw new Error("This email is not registered with JudicialGPT. Please sign up first to create an account.");
    }
    await sendPasswordResetEmail(auth, cleanEmail);
  }
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