import { useState, type ChangeEvent } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function AdForm() {
	const [inputs, setInputs] = useState([{ expectation: "" }]);

	const handleAddInput = () => {
		setInputs([...inputs, { expectation: "" }]);
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { value } = event.target;
		const onChangeValue = [...inputs];
		onChangeValue[index] = { ...onChangeValue[index], expectation: value };
		setInputs(onChangeValue);
	};

	const handleDeleteInput = (index: number) => {
		const newArray = [...inputs];
		newArray.splice(index, 1);
		setInputs(newArray);
	};

	return (
		<div className="min-h-screen bg-slate-950">
			<div className="w-2/3 m-auto p-3 flex flex-col">
				<h1 className="text-3xl font-bold text-zinc-100 mt-10 mb-5">
					Create Your Role-Play Ad
				</h1>
				<div className="border border-slate-700 bg-slate-900 rounded-md p-4">
					<div className="flex items-start gap-3">
						<div className="text-sky-500 mt-1">
							<IoMdInformationCircleOutline />
						</div>
						<div>
							<h3 className="text-sky-400 font-semibold mb-1">
								Good to remember
							</h3>
							<p className="text-zinc-400 text-sm mb-3">
								Including these details in your ad helps potential partners know
								if your story is a good fit for them (but is not required to
								include).
							</p>
							<ul className="list-disc list-inside text-zinc-300 text-sm space-y-1">
								<li>Any content warnings or hard limits</li>
								<li>The intended tone (dark, lighthearted, serious, etc.)</li>
								<li>Expected reply length or posting pace</li>
								<li>Any triggers</li>
								<li>Your timezone</li>
								<li>Whether you prefer OOC planning or improvisation</li>
								<li>Your preferred communication method (DMs, email, etc.)</li>
								<li>Fandom or original setting details</li>
								<li>
									Whether you're open to plot suggestions from your partner
								</li>
								<li>
									Do you prefer your partners to already have a character bio or
									do you prefer character descriptions expressed within the
									story itself?
								</li>
								<li>Your overall availability</li>
								<li>
									Whether you're looking for a long-term or short-term role-play
								</li>
								<li>
									Any specific requirements or preferences for your partner
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="my-5 bg-slate-900 p-3 rounded-md border border-slate-700">
					<h2 className="text-xl font-semibold text-slate-200 mb-3">
						{" "}
						Want to create a character bio?{" "}
					</h2>
					<p className="text-sm text-slate-400 mb-4">
						Character bios help potential role-play partners learn more about
						your character. You can{" "}
						<a href="/new-character" className="text-sky-500 underline">
							create a new character bio
						</a>{" "}
						or{" "}
						<a href="/character-bios" className="text-sky-500 underline">
							view your existing characters
						</a>{" "}
						to share with your role-play partners.
					</p>
				</div>
				<form className="bg-slate-900 border border-sky-700 rounded-md p-5 mb-7 space-y-4">
					<div>
						<label
							htmlFor="title"
							className="block text-zinc-200 font-medium mb-1"
						>
							Title <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="title"
							name="title"
							className="w-full p-2 rounded-md bg-slate-800 text-zinc-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
							placeholder="Enter the title of your role-play"
						/>
					</div>
					<div>
						<label
							htmlFor="tags"
							className="block text-zinc-200 font-medium mb-1"
						>
							Choose Your POV <span className="text-red-500">*</span>
						</label>
						<div className="space-x-4 my-2">
							<button className="px-3 py-1 bg-slate-800 text-sky-400 border border-slate-700 rounded-md hover:bg-slate-700 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:cursor-pointer">
								First Person
							</button>
							<button className="px-3 py-1 bg-slate-800 text-sky-400 border border-slate-700 rounded-md hover:bg-slate-700 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:cursor-pointer">
								Second Person
							</button>
							<button className="px-3 py-1 bg-slate-800 text-sky-400 border border-slate-700 rounded-md hover:bg-slate-700 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:cursor-pointer">
								Third Person
							</button>
						</div>
					</div>
					<div>
						<label
							htmlFor="tags"
							className="block text-zinc-200 font-medium mb-1"
						>
							Is this role-play 18+? <span className="text-red-500">*</span>
						</label>
						<div className="space-x-4 my-2">
							<button className="px-3 py-1 bg-slate-800 text-sky-400 border border-slate-700 rounded-md hover:bg-slate-700 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:cursor-pointer">
								Yes
							</button>
							<button className="px-3 py-1 bg-slate-800 text-sky-400 border border-slate-700 rounded-md hover:bg-slate-700 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:cursor-pointer">
								No
							</button>
						</div>
					</div>
					<div>
						<label
							htmlFor="premise"
							className="block text-zinc-200 font-medium mb-1"
						>
							Premise <span className="text-red-500">*</span>
						</label>
						<textarea
							id="premise"
							name="premise"
							rows={4}
							className="w-full p-2 rounded-md bg-slate-800 text-zinc-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-20"
							placeholder="Describe the premise of your role-play"
						></textarea>
					</div>
					<div>
						<div className="flex items-center justify-between mb-2">
							<label
								htmlFor="expectations"
								className="block text-zinc-200 font-medium"
							>
								Writing Expectations <span className="text-red-500">*</span>
							</label>
							<button
								type="button"
								className="text-sm px-3 py-1 bg-slate-800 text-sky-400 border border-slate-700 rounded-md hover:bg-slate-700 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:cursor-pointer"
								onClick={handleAddInput}
							>
								+ Add
							</button>
						</div>

						{inputs.map((item, index) => (
							<div key={index}>
								<div className="flex items-center">
									<div className="flex flex-1 items-center mb-5">
										<span className="text-sm text-zinc-400 w-5">
											{index + 1}.
										</span>
										<input
											name="expectation"
											type="text"
											value={item.expectation}
											onChange={event => handleChange(event, index)}
											className="flex-1 p-2 rounded-md bg-slate-800 text-zinc-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
											placeholder="List your role-play expectation here"
										/>
										{index > 0 && (
											<button
												type="button"
												className="text-2xl px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2 hover:cursor-pointer"
												onClick={() => handleDeleteInput(index)}
												title="Delete"
											>
												<IoCloseSharp />
											</button>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
					<div>
						<label
							htmlFor="content-notes"
							className="block text-zinc-200 font-medium mb-1"
						>
							Content Notes <span className="text-red-500">*</span>
						</label>
						<textarea
							id="content-notes"
							name="content-notes"
							rows={4}
							className="w-full p-2 rounded-md bg-slate-800 text-zinc-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-20"
							placeholder="Specify any content notes"
						></textarea>
					</div>
					<p className="text-sm mt-10 text-sky-300 italic">
						By posting this role-play ad, I certify that it does not promote
						illegal activities and that it is entirely my own work. I understand
						that failure to adhere to these guidelines may result in the removal
						of the ad and possible suspension of my account.
					</p>
					<button
						type="submit"
						className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:cursor-pointer"
					>
						Post Ad
					</button>
				</form>
			</div>
		</div>
	);
}
