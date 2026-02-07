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
import CharacterBios from "../pages/CharacterBios";
import FAQ from "../pages/FAQ";
import ProtectedRoutesGuard from "./middleware/ProtectedRoutesGuard";
import "../css/index.css";
import FavoritedAds from "../pages/FavoritedAds";
import useSocketStore from "../store/useSocketStore";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect } from "react";
import OwnerRoutesGuard from "./middleware/OwnerRoutesGuard";
import AdDetails from "../pages/AdDetails";
import IsMemberRoutesGuard from "./middleware/IsMemberRoutesGuard";
import UpdatesAndChangelog from "../pages/UpdatesAndChangelog";

export default function App() {
	const connectSocket = useSocketStore(state => state.connectSocket);
	const disconnectSocket = useSocketStore(state => state.disconnectSocket);
	const { data: userData } = useCurrentUser();

	useEffect(() => {
		if (!userData) return;

		connectSocket(userData._id);

		return () => {
			disconnectSocket();
		};
	}, [userData]);

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/role-play-ads" element={<Advertisements />} />
				<Route
					path="/new-ad"
					element={
						<ProtectedRoutesGuard>
							<AdForm />
						</ProtectedRoutesGuard>
					}
				/>
				<Route
					path="/character-bios"
					element={
						<ProtectedRoutesGuard>
							<CharacterBios />
						</ProtectedRoutesGuard>
					}
				/>
				<Route
					path="/new-character"
					element={
						<ProtectedRoutesGuard>
							<CharacterBioForm />
						</ProtectedRoutesGuard>
					}
				/>
				<Route
					path="/inbox"
					element={
						<ProtectedRoutesGuard>
							<Inbox />
						</ProtectedRoutesGuard>
					}
				/>
				<Route
					path="/inbox/:chatID"
					element={
						<ProtectedRoutesGuard>
							<IsMemberRoutesGuard>
								<Inbox />
							</IsMemberRoutesGuard>
						</ProtectedRoutesGuard>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoutesGuard>
							<Profile />
						</ProtectedRoutesGuard>
					}
				/>
				<Route
					path="/favorited-ads"
					element={
						<ProtectedRoutesGuard>
							<FavoritedAds />
						</ProtectedRoutesGuard>
					}
				/>
				<Route
					path="/role-play-ad/:adID/edit"
					element={
						<ProtectedRoutesGuard>
							<OwnerRoutesGuard>
								<AdForm />
							</OwnerRoutesGuard>
						</ProtectedRoutesGuard>
					}
				/>
				<Route
					path="/role-play-ad/:adID"
					element={
						<ProtectedRoutesGuard>
							<AdDetails />
						</ProtectedRoutesGuard>
					}
				/>
				<Route path="/updates-changelog" element={<UpdatesAndChangelog />} />
				<Route path="/faq" element={<FAQ />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms-of-service" element={<TermsOfService />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
