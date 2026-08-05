import { useEffect } from "react";

export default function CharacterBios() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <section className="space-y-4 mx-20 mt-10">
        <h2 className="text-3xl font-bold mb-7 text-slate-200">
          Your Characters
        </h2>
        <div className="bg-slate-900 p-6 rounded-lg shadow-md space-y-4 border border-sky-700">
          <h3 className="text-2xl font-medium text-sky-400">Feature Coming Soon</h3>
          <p className="text-white">
            This feature is currently under development and will be available in
            a future update. Stay tuned for more information and updates on the
            progress of this feature.
          </p>
          <p className="text-white">
            Thank you for your patience as we work on bringing this feature to
            you.
          </p>
        </div>
      </section>
    </div>
  );
}
