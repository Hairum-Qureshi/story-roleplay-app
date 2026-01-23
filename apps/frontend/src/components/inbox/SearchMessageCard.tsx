export default function SearchMessageCard() {
	return (
		<div className="border border-slate-700 bg-slate-800 p-2 m-2 hover:cursor-pointer hover:bg-slate-700 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
			<p className="text-slate-400 text-sm mb-1">From: John Doe</p>
			<p className="text-white text-base">
				This is a <span className="font-bold">searched phrase</span> in the chat
				message.
			</p>
			<p className="text-slate-500 text-xs mt-2">2:45 PM • Today</p>
		</div>
	);
}
