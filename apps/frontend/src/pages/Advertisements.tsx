import Ad from "../components/Ad";

export default function Advertisements() {
	return (
		<div className="min-h-screen bg-slate-950 text-white flex">
			<div className="w-2/3 m-auto p-3 flex flex-col">
				<div className="w-1/3 m-auto p-3"></div>
				<input
					type="text"
					placeholder="Search..."
					className="w-full p-2 mb-10 border border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-800 rounded"
				/>

				<Ad />
			</div>
		</div>
	);
}
