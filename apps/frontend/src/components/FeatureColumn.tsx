import type { FeatureColumnProps } from "../interfaces";

export default function FeatureColumn({
	title,
	text,
	hasBorder = false
}: FeatureColumnProps) {
	return (
		<div className="relative flex flex-col items-center px-4 py-6 text-center">
			{/* Glowing vertical border for desktop */}
			{hasBorder && (
				<>
					{/* Left Glow */}
					<div className="hidden md:block absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-sky-500/50 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
					{/* Right Glow */}
					<div className="hidden md:block absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-sky-500/50 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
				</>
			)}

			<h3 className="text-xl md:text-2xl font-semibold text-white mb-3 tracking-wide">
				{title}
			</h3>
			<p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xs md:max-w-sm">
				{text}
			</p>
		</div>
	);
}
