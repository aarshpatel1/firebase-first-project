import React, { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import TrueFocus from "../components/TrueFocus";
import PasswordStrengthPopover from "../components/PasswordStrengthPopover";
import { useAuth, handleAuthError } from "../authContext/AuthContext";

export default function SignUp() {
	// State variables to manage email, password, confirm password, loading state, and error messages
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Get signup and googleSignIn functions from the authentication context
	const { signup, googleSignIn } = useAuth();
	const navigate = useNavigate();

	// Effect to check if the password and confirm password match
	useEffect(() => {
		setPasswordMatch(password === confirmPassword);
	}, [password, confirmPassword]);

	// Function to handle change in confirm password input
	const handleChangeConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};

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

	// Function to handle form submission for email/password sign-up
	async function handleSubmit(event) {
		event.preventDefault();

		// Check if passwords match
		if (password !== confirmPassword) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(email, password);
			navigate("/dashboard"); // Navigate to the dashboard on successful sign-up
		} catch (error) {
			setError(handleAuthError(error)); // Set error message if sign-up fails
			console.log(error);
		}
		setLoading(false);
	}

	return (
		<main className="flex items-center justify-center h-screen">
			<form
				className="flex max-w-md flex-col gap-4 w-1/5"
				onSubmit={handleSubmit}
			>
				<TrueFocus
					sentence="Sign Up"
					manualMode={false}
					blurAmount={2.5}
					borderColor="aqua"
					animationDuration={0.4}
					pauseBetweenAnimations={2.5}
				/>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email" value="Your email" />
					</div>
					<TextInput
						id="email"
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
					<PasswordStrengthPopover
						password={password}
						setPassword={setPassword}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="confirmPassword" value="Confirm your password" />
					</div>
					<TextInput
						id="confirmPassword"
						type="password"
						required
						value={confirmPassword}
						onChange={handleChangeConfirmPassword}
						autoComplete="off"
						color={!passwordMatch ? "failure" : "gray"}
					/>
					{!passwordMatch && (
						<p className="text-red-500 text-sm mt-2">Passwords do not match</p>
					)}
					{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					If you already have an account,{" "}
					<Link
						to="/signin"
						className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
					>
						Sign In
					</Link>
					.
				</p>
				<Button type="submit" disabled={!passwordMatch || loading}>
					Sign Up
				</Button>
				<Button type="button" onClick={handleGoogleSignIn} disabled={loading}>
					Sign Up with Google
				</Button>
			</form>
		</main>
	);
}
