import "../css/index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Advertisements from "../pages/Advertisements";
import AdForm from "../pages/AdForm";
import Navbar from "./Navbar";
import Inbox from "../pages/Inbox";
import Profile from "../pages/Profile";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/role-play-ads" element={<Advertisements />} />
				<Route path="/new-ad" element={<AdForm />} />
				<Route path="/inbox" element={<Inbox />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
