import { useState, type ChangeEvent } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

// TODO - make sure age isn't less than 18

export default function CharacterBioForm() {
	const [traits, setTraits] = useState([{ trait: "" }]);

	const handleAddTrait = () => {
		setTraits([...traits, { trait: "" }]);
	};

	const handleChangeTrait = (
		event: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { value } = event.target;
		const newTraits = [...traits];
		newTraits[index] = { ...newTraits[index], trait: value };
		setTraits(newTraits);
	};

	const handleDeleteTrait = (index: number) => {
		const newArray = [...traits];
		newArray.splice(index, 1);
		setTraits(newArray);
	};

	return (
		<div className="min-h-screen bg-slate-950">
			<div className="w-2/3 m-auto p-3 flex flex-col">
				<h1 className="text-3xl font-bold text-zinc-100 mt-10 mb-5">
					Create Your Character Bio
				</h1>

				<div className="border border-slate-700 bg-slate-900 rounded-md p-4 mb-7">
					<div className="flex items-start gap-3">
						<div className="text-sky-500 mt-1">
							<IoMdInformationCircleOutline />
						</div>
						<div>
							<h3 className="text-sky-400 font-semibold mb-1">
								Tips for your character
							</h3>
							<p className="text-zinc-400 text-sm mb-3">
								Adding these details helps others understand your character:
							</p>
							<ul className="list-disc list-inside text-zinc-300 text-sm space-y-1">
								<li>Personality traits</li>
								<li>Appearance & age</li>
								<li>Background or backstory</li>
								<li>Skills or special abilities</li>
								<li>Goals or motivations</li>
								<li>Likes, dislikes, and quirks</li>
								<li>Gender</li>
							</ul>
						</div>
					</div>
				</div>

				<form className="bg-slate-900 border border-sky-700 rounded-md p-5 mb-7 space-y-4">
					<div>
						<label className="block text-zinc-200 font-medium mb-1">
							Character Name <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							className="w-full p-2 rounded-md bg-slate-800 text-zinc-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
							placeholder="Enter your character's name"
						/>
					</div>
					<div>
						<label className="block text-zinc-200 font-medium mb-1">
							Age (must be at least 18 years old){" "}
							<span className="text-red-500">*</span>
						</label>
						<input
							type="number"
							className="w-full p-2 rounded-md bg-slate-800 text-zinc-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
							placeholder="Enter character's age"
							min={18}
						/>
					</div>
					<div>
						<label className="block text-zinc-200 font-medium mb-1">
							Appearance
						</label>
						<textarea
							rows={3}
							className="w-full p-2 rounded-md bg-slate-800 text-zinc-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-20"
							placeholder="Describe your character's appearance"
						/>
					</div>
					<div>
						<div className="flex items-center justify-between mb-2">
							<label className="block text-zinc-200 font-medium">
								Traits & Skills
							</label>
							<button
								type="button"
								className="text-sm px-3 py-1 bg-slate-800 text-sky-400 border border-slate-700 rounded-md hover:bg-slate-700 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:cursor-pointer"
								onClick={handleAddTrait}
							>
								+ Add
							</button>
						</div>

						{traits.map((item, index) => (
							<div key={index} className="flex items-center mb-3">
								<span className="text-sm text-zinc-400 w-5">{index + 1}.</span>
								<input
									type="text"
									value={item.trait}
									onChange={e => handleChangeTrait(e, index)}
									className="flex-1 p-2 rounded-md bg-slate-800 text-zinc-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
									placeholder="Enter a trait or skill"
								/>
								{index > 0 && (
									<button
										type="button"
										className="text-2xl px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2 hover:cursor-pointer"
										onClick={() => handleDeleteTrait(index)}
										title="Delete"
									>
										<IoCloseSharp />
									</button>
								)}
							</div>
						))}
					</div>
					<div>
						<label className="block text-zinc-200 font-medium mb-1">
							Backstory
						</label>
						<textarea
							rows={4}
							className="w-full p-2 rounded-md bg-slate-800 text-zinc-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-20"
							placeholder="Brief backstory or description"
						/>
					</div>
					<p className="text-sm mt-10 text-sky-300 italic">
						By submitting this character, I certify that it is entirely
						fictional, at least 18 years old, and not based on any real person,
						and that it is my original creation. I understand that failure to
						comply with these guidelines may result in the removal of the
						character and possible suspension of my account.
					</p>
					<button
						type="submit"
						className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:cursor-pointer"
					>
						Create Character
					</button>
				</form>
			</div>
		</div>
	);
}
