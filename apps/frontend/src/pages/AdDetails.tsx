import { useParams } from "react-router-dom";
import Ad from "../components/Ad";
import useRolePlayAds from "../hooks/useRolePlayAds";

export default function AdDetails() {
	const { adID } = useParams();
	const { adData } = useRolePlayAds(adID || "");

	return (
		<div className="min-h-screen bg-slate-950">
			{adData && (
				<div className="p-10">
					<Ad rolePlayAd={adData} hideButton />
				</div>
			)}
		</div>
	);
}
