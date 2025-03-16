import React, { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import TrueFocus from "../components/TrueFocus";
import PasswordStrengthPopover from "../components/PasswordStrengthPopover";

export default function SignUp() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(true);

	const handleChangeConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};

	useEffect(() => {
		setPasswordMatch(password === confirmPassword);
	}, [password, confirmPassword]);

	return (
		<main className="flex items-center justify-center h-screen">
			<form className="flex max-w-md flex-col gap-4 w-1/5">
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
						<Label htmlFor="email1" value="Your email" />
					</div>
					<TextInput
						id="email1"
						type="email"
						placeholder="email@xyz.com"
						required
						autoComplete="off"
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
					/>
					{!passwordMatch && (
						<p className="text-red-500 text-sm mt-2">Passwords do not match</p>
					)}
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
				<Button type="submit" disabled={!passwordMatch}>
					Sign Up
				</Button>
			</form>
		</main>
	);
}
