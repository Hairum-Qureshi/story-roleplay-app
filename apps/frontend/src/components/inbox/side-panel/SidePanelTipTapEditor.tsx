import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import TipTapEditor from "../../tiptap/TipTapEditor";

export default function SidePanelTipTapEditor() {
  const [closeNotice, setCloseNotice] = useState(false);

  return (
    <>
      <div className="px-5 pt-6 pb-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white mt-5">
          Role-Play Notes
        </h2>
        <div className="flex items-start gap-2">
          <div className="flex items-center gap-1">
            <span className="relative flex items-center size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative flex items-center size-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-sm text-green-500">
              @shreddedfreedman54 is currently editing.
            </p>
          </div>
          {/* {!closeNotice && (
            <>
              <IoCloseCircle
                className="text-red-500 hover:text-red-800 w-9 h-9 text-lg cursor-pointer"
                onClick={() => setCloseNotice(true)}
              />
              <p className="text-sm text-slate-400 mt-1">
                These notes will be editable by both you and your partner.
                Please do not share any personal info.
              </p>
            </>
          )} */}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <TipTapEditor />
      </div>
    </>
  );
}
