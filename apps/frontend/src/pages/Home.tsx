import { Link } from "react-router-dom";
import FeatureColumn from "../components/FeatureColumn";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col">
			{/* Background Gradient */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0b101b] to-black -z-10" />

			<main className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center z-10">
				{/* Logo / Hero Section */}
				<div className="mb-10 animate-fade-in-down">
					<h1 className="font-serif text-5xl md:text-7xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-50 to-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center gap-4">
						TaleWeaver
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="w-12 h-12 md:w-16 md:h-16 text-amber-100"
						>
							<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
							<line x1="16" y1="8" x2="2" y2="22" />
							<line x1="17.5" y1="15" x2="9" y2="15" />
						</svg>
					</h1>
				</div>

				<h2 className="text-xl md:text-4xl font-semibold max-w-4xl mx-auto leading-tight mb-4">
					Craft Stories Together, One Message at a Time
				</h2>
				<p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
					Jump into collaborative role-play worlds and co-create immersive
					narratives with friends.
				</p>

				{/* CTA Buttons */}
				<div className="flex flex-col items-center gap-4">
					<button className="group relative flex items-center gap-3 bg-white text-slate-900 px-8 py-3.5 rounded-lg font-medium hover:bg-slate-100 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]">
						<svg className="w-5 h-5" viewBox="0 0 24 24">
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						Continue with Google
					</button>

					{/* Link directly under the button */}
					<Link
						to="/about"
						className="text-sky-500 hover:text-sky-400 transition-colors text-lg font-medium hover:underline"
					>
						What is TaleWeaver?
					</Link>
				</div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full mt-20">
					<FeatureColumn
						title="Real-Time Collaboration"
						text="Write seamlessly with others in a live chat interface. See the story unfold instantly."
					/>
					<FeatureColumn
						title="Character & World Building"
						text="Define your roles, create unique personas, and build rich, shared universes solely through text."
						hasBorder
					/>
					<FeatureColumn
						title="Focus on the Narrative"
						text="A minimalist, distraction-free environment designed purely for the art of collaborative storytelling."
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}
