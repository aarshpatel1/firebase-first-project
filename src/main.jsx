import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

createRoot(document.getElementById("root")).render(
	<Flowbite>
		<App />
		<DarkThemeToggle />
	</Flowbite>
);
