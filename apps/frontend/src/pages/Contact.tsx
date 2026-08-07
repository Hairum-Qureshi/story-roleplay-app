import { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useEmail from "../hooks/useEmail";

export default function Contact() {
  const { data: currUser } = useCurrentUser();
  const { sendFeedbackEmail, successMessage, errorMessage } = useEmail();

  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!currUser) return;

    setFrom(`${currUser.firstName} ${currUser.lastName} (${currUser.email})`);
  }, [currUser]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (!from.trim() || !subject.trim() || !message.trim()) {
      return;
    }

    try {
      setIsSending(true);

      await sendFeedbackEmail({
        from,
        subject,
        message,
      });

      setSubject("");
      setMessage("");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 -left-48 h-[30rem] w-[30rem] rounded-full bg-blue-900/20 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[30rem] w-[30rem] rounded-full bg-indigo-900/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-full items-center justify-center px-6 py-16">
        <div className="grid w-full max-w-5xl gap-12 md:grid-cols-2">
          {/* Information */}
          <section className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-blue-400">
              Support
            </p>

            <h1 className="mt-3 text-4xl font-semibold text-slate-100">
              Have feedback?
            </h1>

            <p className="mt-5 max-w-md leading-relaxed text-slate-400">
              Whether you found a bug, have a feature suggestion, or want to
              share an idea to improve the experience, your feedback helps shape
              Taleweaver.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              {/* <div className="border-t border-slate-800 pt-4">
                <p className="text-slate-500">Email</p>
                <p className="mt-1 text-sky-400">support@taleweaver.com</p>
              </div> */}

              <div className="border-t border-slate-800 pt-4">
                <p className="text-slate-500">Response time</p>
                <p className="mt-1 text-slate-300">
                  Usually within a few business days
                </p>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <p className="text-slate-500">
                  Please avoid sharing sensitive information.
                </p>
                <p className="text-red-500/70 hover:text-red-500">
                  Innappropriate content will be ignored and may result in
                  account suspension.
                </p>
              </div>
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl p-8 shadow-xl shadow-black/20"
          >
            <div className="space-y-6">
              <div aria-live="polite" className="text-center text-sm">
                {successMessage && (
                  <p className="text-green-400">{successMessage}</p>
                )}

                {errorMessage && <p className="text-red-400">{errorMessage}</p>}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  From
                </p>

                <div className="mt-2 rounded-md border border-slate-800 bg-slate-950 px-4 py-3">
                  <p className="text-sm text-slate-200">
                    {currUser?.firstName} {currUser?.lastName}
                    <span className="ml-2 text-slate-500">
                      ({currUser?.email})
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wide text-slate-500">
                  Subject<span className="text-red-500">*</span>
                </label>

                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Bug report, suggestion, question..."
                  className="w-full rounded-md border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wide text-slate-500">
                  Message<span className="text-red-500">*</span>
                </label>

                <textarea
                  rows={7}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what happened..."
                  className="w-full resize-none rounded-md border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/40"
                />
              </div>

              <button
                disabled={isSending}
                className="w-full rounded-md bg-blue-900 px-6 py-3 font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
