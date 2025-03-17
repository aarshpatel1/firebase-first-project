import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// PrivateRoute component to protect routes that require authentication
export default function PrivateRoute({ children }) {
	const { currentUser } = useAuth();

	// If the user is authenticated, render the children components
	// Otherwise, navigate to the signup page
	return currentUser ? <>{children}</> : <Navigate to="/signup" />;
}
