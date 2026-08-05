import Ad from "./Ad";
import useRolePlayAds from "../hooks/useRolePlayAds";

export default function AdDetails() {
  const { adData } = useRolePlayAds();

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
