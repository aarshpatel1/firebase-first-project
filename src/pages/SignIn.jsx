import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import TrueFocus from "../components/TrueFocus";
import { useAuth } from "../authContext/AuthContext";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { login, googleSignIn } = useAuth();
	const navigate = useNavigate();

	async function handleGoogleSignIn() {
		try {
			await googleSignIn();
			navigate("/dashboard");
		} catch (error) {
			setError(handleAuthError(error));
			console.log(error);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(email, password);
			navigate("/dashboard");
		} catch (error) {
			setError(handleAuthError(error));
			alert(error);
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
		</main>
	);
}
