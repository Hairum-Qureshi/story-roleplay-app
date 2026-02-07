import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaPlusSquare } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { FaHeart } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import useGoogleAuth from "../hooks/useGoogleAuth";

export default function Navbar() {
	const location = useLocation();
	const { data: currUserData } = useCurrentUser();
	const { signOut } = useGoogleAuth();

	return (
		<div
			className={`w-full h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-center px-6 space-x-4 ${location.pathname !== "/inbox" && location.pathname !== "/faq" && "sticky top-0 z-50"}`}
		>
			<Link to="/">
				<h1
					className="border border-slate-700 px-2 py-1 rounded-full h-10 w-10 text-xl font-bold text-zinc-100 flex items-center justify-center"
					title="Home"
				>
					<IoHomeSharp className="text-sky-400" />
				</h1>
			</Link>
			<Link to="/role-play-ads">
				<h1
					className="border border-yellow-700 px-2 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center justify-center text-xl"
					title="Main Feed"
				>
					<FaStar className="text-yellow-400" />
				</h1>
			</Link>
			{currUserData && (
				<>
					<Link to="/profile">
						<h1
							className="border border-slate-700 px-3 py-1 rounded-full h-10 w-10 text-xl font-bold text-zinc-100 flex items-center"
							title="Profile"
						>
							<FaUser className="text-sky-400" />
						</h1>
					</Link>
					<Link to="/inbox">
						<h1
							className="border border-slate-700 px-3 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-xl"
							title="Messages"
						>
							<FaMessage className="text-sky-400" />
						</h1>
					</Link>
					<Link to="/new-ad">
						<h1
							className="border border-slate-700 px-3 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-xl"
							title="Create New Ad"
						>
							<FaPlusSquare className="text-sky-400" />
						</h1>
					</Link>
					<Link to="/new-character">
						<h1
							className="border border-slate-700 px-2 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-2xl"
							title="Create Character"
						>
							<FaUserPlus className="text-sky-400" />
						</h1>
					</Link>
					<Link to="/character-bios">
						<h1
							className="border border-slate-700 px-2 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-2xl"
							title="Character Bios"
						>
							<FaUsers className="text-sky-400" />
						</h1>
					</Link>
					<Link to="/favorited-ads">
						<h1
							className="border border-slate-700 px-2 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-2xl"
							title="Favorited Ads"
						>
							<FaHeart className="text-sky-400" />
						</h1>
					</Link>
					<Link to="/contact">
						<h1
							className="border border-slate-700 px-2 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-2xl"
							title="Contact"
						>
							<IoMail className="text-sky-400" />
						</h1>
					</Link>
				</>
			)}
			<Link to="/faq">
				<h1
					className="border border-slate-700 px-2 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-2xl"
					title="FAQ"
				>
					<IoIosInformationCircle className="text-sky-400" />
				</h1>
			</Link>
			<Link to="/updates-changelog">
				<h1
					className="border border-slate-700 px-2 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-2xl"
					title="Updates and Changelog"
				>
					<MdTipsAndUpdates className="text-sky-400" />
				</h1>
			</Link>
			<Link to="/about">
				<h1
					className="border border-slate-700 px-2 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-2xl"
					title="About"
				>
					<HiQuestionMarkCircle className="text-sky-400" />
				</h1>
			</Link>
			{currUserData && (
				<Link to="/" onClick={() => signOut()}>
					<h1
						className="border border-red-700 px-2 py-1 rounded-full h-10 w-10 font-bold text-zinc-100 flex items-center text-2xl"
						title="Logout"
					>
						<RiLogoutBoxRFill className="text-red-600" />
					</h1>
				</Link>
			)}
		</div>
	);
}
