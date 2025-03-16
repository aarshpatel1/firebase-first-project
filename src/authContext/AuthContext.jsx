import { createContext, useContext, useState, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export function useAuth() {
	return useContext(AuthContext);
}

export function handleAuthError(error) {
	if (error.code) {
		switch (error.code) {
			case "auth/email-already-in-use":
				return "Email is already in use";
			case "auth/invalid-email":
				return "Invalid email format";
			case "auth/invalid-credential":
				return "Invalid email or password";
			case "auth/user-not-found":
				return "User not found, please check your email";
			case "auth/wrong-password":
				return "Incorrect password";
			case "auth/weak-password":
				return "Password should be at least 6 characters";
			case "auth/too-many-requests":
				return "Too many failed attempts. Please try again later";
			default:
				return "An unknown error occurred. Please try again";
		}
	}
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function googleSignIn() {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			const errorMessage = handleAuthError(error);
			setError(errorMessage);
			throw new Error(errorMessage);
		}
	}

	async function signup(email, password) {
		try {
			setError(null);
			return await createUserWithEmailAndPassword(auth, email, password);
		} catch (error) {
			const errorMessage = handleAuthError(error);
			setError(errorMessage);
			throw new Error(errorMessage);
		}
	}

	async function login(email, password) {
		try {
			setError(null);
			return await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			const errorMessage = handleAuthError(error);
			setError(errorMessage);
			throw new Error(errorMessage);
		}
	}

	async function logout() {
		try {
			setError(null);
			return await signOut(auth);
		} catch (error) {
			const errorMessage = handleAuthError(error);
			setError(errorMessage);
			throw new Error(errorMessage);
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		googleSignIn,
		error,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
