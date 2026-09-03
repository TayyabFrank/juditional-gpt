import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'

/**
 * Saves a legal document or case draft to Firestore
 */
export const saveLegalDocument = async (userId, { title, content, type = 'draft', tags = [] }) => {
  if (!userId) throw new Error('User ID is required to save document')

  const documentPayload = {
    userId,
    title: title || 'Untitled Legal Document',
    content: content || '',
    type,
    tags,
    createdAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString(),
    updatedAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString()
  }

  if (!isFirebaseConfigured || !db) {
    return {
      id: 'doc_' + Date.now(),
      ...documentPayload
    }
  }

  const docsRef = collection(db, 'users', userId, 'documents')
  const newDoc = await addDoc(docsRef, documentPayload)

  return {
    id: newDoc.id,
    ...documentPayload
  }
}

/**
 * Retrieves all saved legal documents for a user
 */
export const getUserDocuments = async (userId) => {
  if (!userId || !isFirebaseConfigured || !db) return []

  try {
    const docsRef = collection(db, 'users', userId, 'documents')
    const q = query(docsRef, orderBy('updatedAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }))
  } catch (err) {
    console.error('[JudicialGPT Document] Error fetching documents:', err)
    return []
  }
}

/**
 * Deletes a saved legal document
 */
export const deleteLegalDocument = async (userId, docId) => {
  if (!userId || !docId || !isFirebaseConfigured || !db) return
  const docRef = doc(db, 'users', userId, 'documents', docId)
  await deleteDoc(docRef)
}
