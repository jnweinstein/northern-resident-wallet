import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from "./firebaseConfig";

export const auth = getAuth(app);