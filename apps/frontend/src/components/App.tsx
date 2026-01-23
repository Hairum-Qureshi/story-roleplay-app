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
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import CharacterBioForm from "../pages/CharacterBioForm";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/role-play-ads" element={<Advertisements />} />
				<Route path="/new-ad" element={<AdForm />} />
				<Route path="/new-character" element={<CharacterBioForm />} />
				<Route path="/inbox" element={<Inbox />} />
				<Route path="/inbox/:chatID" element={<Inbox />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms-of-service" element={<TermsOfService />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
