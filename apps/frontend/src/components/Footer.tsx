import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="py-6 text-center text-slate-500 text-sm z-10">
			<div className="flex flex-wrap justify-center gap-4 md:gap-6">
				<Link to="/about" className="hover:text-slate-300 transition-colors">
					About
				</Link>
				<span className="hidden md:inline text-slate-700">|</span>
				<Link
					to="/terms-of-service"
					className="hover:text-slate-300 transition-colors"
				>
					Terms of Service
				</Link>
				<span className="hidden md:inline text-slate-700">|</span>
				<Link
					to="/privacy-policy"
					className="hover:text-slate-300 transition-colors"
				>
					Privacy Policy
				</Link>
				{/* <span className="hidden md:inline text-slate-700">|</span>
				<Link to="/contact" className="hover:text-slate-300 transition-colors">
					Contact
				</Link> */}
			</div>
		</footer>
	);
}
