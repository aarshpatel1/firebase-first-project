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

// Create a context for authentication
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export function useAuth() {
	return useContext(AuthContext);
}

// Function to handle Firebase authentication errors and return user-friendly messages
export function handleAuthError(error) {
	if (error.code) {
		switch (error.code) {
			case "auth/email-already-in-use":
				return "Email is already in use";
			case "auth/invalid-email":
				return "Invalid email format";
			case "auth/invalid-credential":
				return "Invalid email or password!";
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

// AuthProvider component to provide authentication context to its children
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Function to handle Google sign-in
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

	// Function to handle email/password sign-up
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

	// Function to handle email/password login
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

	// Function to handle logout
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

	// Effect to set the current user and loading state on authentication state change
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	// Value to be provided by the AuthContext
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
