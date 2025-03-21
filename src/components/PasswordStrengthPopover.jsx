import { useState } from "react";
import { Popover, TextInput } from "flowbite-react";

const PasswordStrengthPopover = ({ password, setPassword }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [validatePassword, setValidatePassword] = useState(false);

	const handleChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		if (
			isProperlyCased(newPassword) &&
			isNumber(newPassword) &&
			isSymbol(newPassword) &&
			isLonger(newPassword)
		) {
			setValidatePassword(true);
		} else {
			setValidatePassword(false);
		}
	};

	const isProperlyCased = (password) => {
		return /[a-z]/.test(password) && /[A-Z]/.test(password);
	};

	const isNumber = (password) => {
		return /[0-9]/.test(password);
	};

	const isSymbol = (password) => {
		return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
	};

	const isLonger = (password) => {
		return password.length >= 6;
	};

	return (
		<Popover
			trigger="hover"
			content={
				<div className="space-y-2 p-3">
					<h3 className="font-semibold text-gray-900 dark:text-white">
						Must have at least 6 characters
					</h3>
					<div className="grid grid-cols-4 gap-2">
						<div
							className={`h-1 ${
								isProperlyCased(password)
									? validatePassword
										? "bg-green-300 dark:bg-green-400"
										: "bg-orange-300 dark:bg-orange-400"
									: "bg-gray-200 dark:bg-gray-600"
							}`}
						></div>
						<div
							className={`h-1 ${
								isSymbol(password)
									? validatePassword
										? "bg-green-300 dark:bg-green-400"
										: "bg-orange-300 dark:bg-orange-400"
									: "bg-gray-200 dark:bg-gray-600"
							}`}
						></div>
						<div
							className={`h-1 ${
								isNumber(password)
									? validatePassword
										? "bg-green-300 dark:bg-green-400"
										: "bg-orange-300 dark:bg-orange-400"
									: "bg-gray-200 dark:bg-gray-600"
							}`}
						></div>
						<div
							className={`h-1 ${
								isLonger(password)
									? validatePassword
										? "bg-green-300 dark:bg-green-400"
										: "bg-orange-300 dark:bg-orange-400"
									: "bg-gray-200 dark:bg-gray-600"
							}`}
						></div>
					</div>
					<p>It’s better to have:</p>
					<ul>
						<li className="mb-1 flex items-center">
							{isProperlyCased(password) ? (
								<svg
									className="me-2 h-3.5 w-3.5 text-green-400 dark:text-green-500"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 16 12"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M1 5.917 5.724 10.5 15 1.5"
									/>
								</svg>
							) : (
								<svg
									className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
							)}
							UPPER & lower case letters
						</li>
						<li className="mb-1 flex items-center">
							{isNumber(password) ? (
								<svg
									className="me-2 h-3.5 w-3.5 text-green-400 dark:text-green-500"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 16 12"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M1 5.917 5.724 10.5 15 1.5"
									/>
								</svg>
							) : (
								<svg
									className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
							)}
							A Number (0-9)
						</li>
						<li className="mb-1 flex items-center">
							{isSymbol(password) ? (
								<svg
									className="me-2 h-3.5 w-3.5 text-green-400 dark:text-green-500"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 16 12"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M1 5.917 5.724 10.5 15 1.5"
									/>
								</svg>
							) : (
								<svg
									className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
							)}
							A symbol (!@#$%^&*)
						</li>
						<li className="flex items-center">
							{isLonger(password) ? (
								<svg
									className="me-2 h-3.5 w-3.5 text-green-400 dark:text-green-500"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 16 12"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M1 5.917 5.724 10.5 15 1.5"
									/>
								</svg>
							) : (
								<svg
									className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
							)}
							A longer password (min. 6 chars.)
						</li>
					</ul>
				</div>
			}
		>
			<div className="relative">
				<TextInput
					id="password1"
					type={showPassword ? "text" : "password"}
					required
					value={password}
					onChange={handleChange}
					autoComplete="off"
				/>
				<button
					type="button"
					className="absolute inset-y-0 right-0 flex items-center px-2"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						</svg>
					)}
				</button>
			</div>
		</Popover>
	);
};

export default PasswordStrengthPopover;
