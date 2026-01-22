export default function ChatContainer() {
	return (
		<div className="w-full max-w-md m-auto">
			{/* Single Chat Item */}
			<div className="flex items-center m-2 border border-gray-700 justify-between p-2 mb-2 bg-gray-900 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
				<div className="flex items-center space-x-3">
					{/* Avatar */}
					<div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0"></div>

					{/* Chat Info */}
					<div>
						<h3 className="text-white font-semibold text-lg">Chat Title</h3>
						<p className="text-gray-400 text-sm truncate w-48">
							This is the last message sent in this chat…
						</p>
					</div>
				</div>

				{/* Optional Metadata */}
				<div className="flex flex-col items-end space-y-1">
					<span className="text-gray-500 text-xs">2:45 PM</span>
					<span className="bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
						3
					</span>
				</div>
			</div>

			{/* You can repeat the div above for more chat items */}
		</div>
	);
}
