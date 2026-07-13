import { Link } from "react-router-dom";
import FeatureColumn from "../components/FeatureColumn";
import Footer from "../components/Footer";
import { useCurrentUser } from "../hooks/useCurrentUser";
import GoogleOAuthButton from "../components/GoogleOAuthButton";

export default function Home() {
  const { data: currUserData } = useCurrentUser();

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0b101b] to-black -z-10" />

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center z-10">
        {/* Logo / Hero Section */}
        <div className="mb-10 animate-fade-in-down">
          <h1 className="font-serif text-5xl md:text-7xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-50 to-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center gap-4">
            TaleWeaver
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 md:w-16 md:h-16 text-amber-100"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
              <line x1="16" y1="8" x2="2" y2="22" />
              <line x1="17.5" y1="15" x2="9" y2="15" />
            </svg>
          </h1>
        </div>

        <h2 className="text-xl md:text-4xl font-semibold max-w-4xl mx-auto leading-tight mb-4">
          Craft Stories Together, One Message at a Time
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Jump into collaborative role-play worlds and co-create immersive
          narratives with friends. Check out our{" "}
          <Link to="/guidelines" className="underline text-yellow-500">
            guidelines
          </Link>{" "}
          for more information.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4">
          {!currUserData && <GoogleOAuthButton />}

          {/* Link directly under the button */}
          <Link
            to="/about"
            className="text-sky-500 hover:text-sky-400 transition-colors text-lg font-medium hover:underline"
          >
            What is TaleWeaver?
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full mt-20">
          <FeatureColumn
            title="Real-Time Collaboration"
            text="Write seamlessly with others in a live chat interface. See the story unfold instantly."
          />
          <FeatureColumn
            title="Downloadable Stories"
            text="Done your story or want to see the progress so far? Have the ability to download it all in its entirety."
            hasBorder
          />
          <FeatureColumn
            title="Focus on the Narrative"
            text="A minimalist, distraction-free environment designed purely for the art of collaborative storytelling."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
