import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, query, where, getDocs, orderBy, limit, startAfter, writeBatch } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Collections
export const COLLECTIONS = {
  USERS: 'users',
  STUDENTS: 'students',
  INSTITUTIONS: 'institutions',
  COMPANIES: 'companies',
  COURSES: 'courses',
  APPLICATIONS: 'applications',
  JOBS: 'jobs',
  JOB_APPLICATIONS: 'job_applications',
  FACULTIES: 'faculties',
  NOTIFICATIONS: 'notifications',
  REPORTS: 'reports'
};

// Firebase Auth Functions
export const firebaseAuth = {
  // Register new user
  register: async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, {
        displayName: userData.name
      });

      // Send email verification
      await sendEmailVerification(user);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Firestore Functions
export const firestore = {
  // Create document
  create: async (collectionName, id, data) => {
    try {
      await setDoc(doc(db, collectionName, id), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Read document
  read: async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update document
  update: async (collectionName, id, data) => {
    try {
      await updateDoc(doc(db, collectionName, id), {
        ...data,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete document
  delete: async (collectionName, id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Query documents
  query: async (collectionName, conditions = [], orderByField = null, limitCount = null) => {
    try {
      let q = collection(db, collectionName);
      
      // Add where conditions
      conditions.forEach(condition => {
        q = query(q, where(condition.field, condition.operator, condition.value));
      });
      
      // Add ordering
      if (orderByField) {
        q = query(q, orderBy(orderByField));
      }
      
      // Add limit
      if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Storage Functions
export const firebaseStorage = {
  // Upload file
  upload: async (file, path) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete file
  delete: async (path) => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Utility Functions
export const utils = {
  // Generate unique ID
  generateId: () => {
    return doc(collection(db, 'temp')).id;
  },

  // Format date for Firestore
  formatDate: (date) => {
    return new Date(date);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return auth.currentUser !== null;
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  }
};

export default app;