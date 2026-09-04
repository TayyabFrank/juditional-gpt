import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'

/**
 * Creates a new chat session for a user
 */
export const createChatSession = async (userId, title = 'New Legal Inquiry') => {
  if (!userId) throw new Error('User ID is required to create a chat session')

  if (!isFirebaseConfigured || !db) {
    const localId = 'session_' + Date.now()
    const session = {
      id: localId,
      userId,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastMessage: ''
    }
    return session
  }

  const chatsRef = collection(db, 'users', userId, 'chats')
  const newChatDoc = await addDoc(chatsRef, {
    userId,
    title,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastMessage: ''
  })

  return {
    id: newChatDoc.id,
    userId,
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastMessage: ''
  }
}

/**
 * Subscribes to all chat sessions belonging to a user in real-time
 */
export const subscribeToUserChats = (userId, callback) => {
  if (!userId) {
    callback([])
    return () => {}
  }

  if (!isFirebaseConfigured || !db) {
    callback([])
    return () => {}
  }

  try {
    const chatsRef = collection(db, 'users', userId, 'chats')
    const q = query(chatsRef, orderBy('updatedAt', 'desc'))

    return onSnapshot(
      q,
      (snapshot) => {
        const chats = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }))
        callback(chats)
      },
      (error) => {
        console.error('[JudicialGPT Chat] Error listening to user chats:', error)
        callback([])
      }
    )
  } catch (err) {
    console.error('[JudicialGPT Chat] subscribeToUserChats initialization error:', err)
    callback([])
    return () => {}
  }
}

/**
 * Adds a message (user query or AI response) to a specific chat session
 */
export const addMessageToChat = async (userId, chatId, messageData) => {
  if (!userId || !chatId) return null

  const formattedMessage = {
    sender: messageData.sender || 'user',
    text: messageData.text || '',
    citations: messageData.citations || [],
    model: messageData.model || 'JudicialGPT',
    timestamp: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString()
  }

  if (!isFirebaseConfigured || !db) {
    return {
      id: 'msg_' + Date.now(),
      ...formattedMessage,
      timestamp: new Date().toISOString()
    }
  }

  // 1. Add message doc to users/{userId}/chats/{chatId}/messages
  const messagesRef = collection(db, 'users', userId, 'chats', chatId, 'messages')
  const addedDoc = await addDoc(messagesRef, formattedMessage)

  // 2. Update parent chat doc's updatedAt timestamp and preview snippet
  const chatDocRef = doc(db, 'users', userId, 'chats', chatId)
  await updateDoc(chatDocRef, {
    updatedAt: serverTimestamp(),
    lastMessage: messageData.text.slice(0, 80)
  }).catch(() => {})

  return {
    id: addedDoc.id,
    ...formattedMessage,
    timestamp: new Date().toISOString()
  }
}

/**
 * Subscribes to real-time messages inside a specific chat session
 */
export const subscribeToChatMessages = (userId, chatId, callback) => {
  if (!userId || !chatId) {
    callback([])
    return () => {}
  }

  if (!isFirebaseConfigured || !db) {
    callback([])
    return () => {}
  }

  try {
    const messagesRef = collection(db, 'users', userId, 'chats', chatId, 'messages')
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    return onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }))
        callback(msgs)
      },
      (error) => {
        console.error('[JudicialGPT Chat] Error listening to messages:', error)
        callback([])
      }
    )
  } catch (err) {
    console.error('[JudicialGPT Chat] subscribeToChatMessages error:', err)
    callback([])
    return () => {}
  }
}

/**
 * Updates a chat session's title
 */
export const updateChatTitle = async (userId, chatId, newTitle) => {
  if (!isFirebaseConfigured || !db || !userId || !chatId) return
  const chatDocRef = doc(db, 'users', userId, 'chats', chatId)
  await updateDoc(chatDocRef, {
    title: newTitle,
    updatedAt: serverTimestamp()
  })
}

/**
 * Deletes a chat session
 */
export const deleteChatSession = async (userId, chatId) => {
  if (!isFirebaseConfigured || !db || !userId || !chatId) return
  const chatDocRef = doc(db, 'users', userId, 'chats', chatId)
  await deleteDoc(chatDocRef)
}
