import { Link, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

export default function Navbar() {
	const location = useLocation();
	const { data: currUserData } = useCurrentUser();
	const { signOut } = useGoogleAuth();
	const [showMenu, setMenuVisibility] = useState(false);

	return (
		<div
			className={`w-full h-16 text-white bg-slate-900/95 backdrop-blur border-b border-slate-800 flex items-center px-6 ${
				location.pathname !== "/inbox" && location.pathname !== "/faq"
					? "sticky top-0 z-50"
					: ""
			}`}
		>
			{/* LEFT */}
			<div className="flex items-center gap-6">
				<Link to="/" className="flex items-center">
					<IoHomeSharp className="text-sky-400 text-xl hover:scale-110 transition" />
				</Link>

				<Link
					to="/role-play-ads"
					className="text-base font-medium text-zinc-300 hover:text-white transition"
				>
					Main Feed
				</Link>

				{currUserData && (
					<>
						<Link
							to="/inbox"
							className="text-base font-medium text-zinc-300 hover:text-white transition"
						>
							Inbox
						</Link>
						<Link
							className="hover:cursor-pointer px-2 py-1 hover:bg-slate-800 hover:rounded-md"
							to="/favorited-ads"
						>
							Favorited Ads
						</Link>
						<Link
							className="hover:cursor-pointer px-2 py-1 hover:bg-slate-800 hover:rounded-md"
							to="/new-ad"
						>
							Create Ad
						</Link>
						<Link
							className="hover:cursor-pointer px-2 py-1 hover:bg-slate-800 hover:rounded-md"
							to="/new-character"
						>
							Create Character
						</Link>
						<Link
							className="hover:cursor-pointer px-2 py-1 hover:bg-slate-800 hover:rounded-md"
							to="/character-bios"
						>
							Character Bios
						</Link>
					</>
				)}
			</div>

			{/* RIGHT */}
			<div className="ml-auto flex items-center gap-4">
				{currUserData ? (
					<div className="relative group">
						<button
							className="px-3 py-1.5 text-2xl hover:cursor-pointer text-zinc-200 rounded-md hover:bg-slate-700"
							onClick={() => setMenuVisibility(prev => !prev)}
						>
							{showMenu ? <IoCloseSharp /> : <GiHamburgerMenu />}
						</button>
						{/* Dropdown */}
						{showMenu && (
							<div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-md shadow-lg">
								<div className="flex flex-col text-sm p-3 space-y-2">
									<div className="flex items-center transition hover:cursor-pointer px-2 py-1 hover:bg-slate-800 hover:rounded-md">
										<img
											src={currUserData.profilePicture}
											alt="Profile"
											className="w-7 h-7 rounded-full mr-3"
										/>
										<Link className="" to="/profile">
											Profile
										</Link>
									</div>
									<div className="border-t border-slate-700 my-1" />
									<Link
										className="hover:cursor-pointer transition px-2 py-1 mt-2 hover:bg-slate-800 hover:rounded-md"
										to="/contact"
									>
										Contact
									</Link>
									<Link
										className="hover:cursor-pointer transition px-2 py-1 hover:bg-slate-800 hover:rounded-md"
										to="/faq"
									>
										FAQ
									</Link>
									<Link
										className="hover:cursor-pointer transition  px-2 py-1 hover:bg-slate-800 hover:rounded-md"
										to="/about"
									>
										About
									</Link>
									<Link
										className="hover:cursor-pointer transition px-2 py-1 hover:bg-slate-800 hover:rounded-md"
										to="/guidelines"
									>
										Guidelines
									</Link>
									<Link
										className="hover:cursor-pointer transition px-2 py-1 hover:bg-slate-800 hover:rounded-md"
										to="/updates-changelog"
									>
										Updates
									</Link>

									<div className="border-t border-slate-700 my-1" />

									<button
										onClick={signOut}
										className="text-left px-4 py-2 hover:cursor-pointer rounded-md text-red-500 hover:bg-slate-800 transition"
									>
										Sign Out
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<Link
						to="/login"
						className="text-sm font-medium text-zinc-300 hover:text-white"
					>
						Login
					</Link>
				)}
			</div>
		</div>
	);
}
