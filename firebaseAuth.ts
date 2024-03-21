import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential, User } from 'firebase/auth'
import { app } from "./firebaseConfig";

const auth = getAuth(app);

export async function signIn(email: string, password: string): Promise<User | null> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (errors) {
        console.error(errors)
        return null;
    }
}
export async function signUp(email: string, password: string): Promise<User | null> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (errors) {
        console.error(errors)
        return null;
    }
}
export async function signOutUser(): Promise<void> {
    try {
        await signOut(auth)
    } catch (errors) {
        console.error(errors)
    }
}