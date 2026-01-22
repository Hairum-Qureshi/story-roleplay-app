import { useState } from "react";
import ChatContainer from "../components/inbox/ChatContainer";

export default function Inbox() {
	const [fullWidth, setFullWith] = useState(false);

	return (
		<div className="min-h-screen bg-slate-950 text-white flex">
			<div className=" w-1/4 min-h-[100vh - 4rem] max-h-auto space-y-3 overflow-y-scroll">
				<ChatContainer />
			</div>
			<div
				className={`border border-orange-500 w-1/2 min-h-[100vh - 4rem] max-h-auto ${fullWidth ? "w-3/4" : "w-1/2"}`}
			>
				<div className="w-full border-b border-white flex justify-end">
					<button
						onClick={() => setFullWith(!fullWidth)}
						className="m-2 border border-white rounded-md px-2 py-1 hover:cursor-pointer"
					>
						Open Side Panel
					</button>
				</div>
				<div className="border border-green-500 min-h-[80vh]"></div>
			</div>
			<div
				className={`border border-yellow-500 w-1/4 min-h-[100vh - 4rem] max-h-auto ${fullWidth ? "hidden" : "block"}`}
			></div>
		</div>
	);
}
