import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import TrueFocus from "../components/TrueFocus";
import { useAuth, handleAuthError } from "../authContext/AuthContext";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function SignIn() {
	// State variables to manage email, password, loading state, and error messages
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Get login and googleSignIn functions from the authentication context
	const { login, googleSignIn } = useAuth();
	const navigate = useNavigate();

	// Function to handle Google sign-in
	async function handleGoogleSignIn() {
		try {
			await googleSignIn();
			navigate("/dashboard"); // Navigate to the dashboard on successful sign-in
		} catch (error) {
			setError(handleAuthError(error)); // Set error message if sign-in fails
			console.log(error);
		}
	}

	// Function to handle form submission for email/password sign-in
	async function handleSubmit(e) {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			setError("");
			setLoading(true);
			await login(email, password);
			navigate("/dashboard"); // Navigate to the dashboard on successful sign-in
		} catch (error) {
			setError(error.message); // Set error message if sign-in fails
			console.log("Email and password login error: ", error.message);
		}
		setLoading(false);
	}

	return (
		<main className="flex items-center justify-center h-screen position-relative">
			<form
				className="flex max-w-md flex-col gap-4 w-1/5"
				onSubmit={handleSubmit}
			>
				<TrueFocus
					sentence="Sign In"
					manualMode={false}
					blurAmount={2.5}
					borderColor="aqua"
					animationDuration={0.4}
					pauseBetweenAnimations={2.5}
				/>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email1" value="Your email" />
					</div>
					<TextInput
						id="email1"
						type="email"
						placeholder="email@xyz.com"
						required
						autoComplete="off"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" value="Your password" />
					</div>
					<TextInput
						id="password1"
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="off"
					/>
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					If you don't have an account,{" "}
					<Link
						to="/signup"
						className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
					>
						Sign Up
					</Link>
					.
				</p>
				<Button type="submit" disabled={loading}>
					Sign In
				</Button>
				<Button type="button" onClick={handleGoogleSignIn} disabled={loading}>
					Sign In with Google
				</Button>
			</form>
			{error && (
				<Alert
					color="failure"
					icon={HiInformationCircle}
					className="fixed bottom-4 right-4 w-1/3"
				>
					<span className="font-medium">Login Alert!</span> {error}
				</Alert>
			)}
		</main>
	);
}
