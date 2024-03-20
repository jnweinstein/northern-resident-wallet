import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { app } from "./firebaseConfig";

const auth = getAuth(app);

export async function signIn(email: string, password: string): Promise<void> {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (errors) {
        console.error(errors)
    }
}
export async function signUp(email: string, password: string): Promise<void> {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (errors) {
        console.error(errors)
    }
}
export async function signOutUser(): Promise<void> {
    try {
        await signOut(auth)
    } catch (errors) {
        console.error(errors)
    }
}