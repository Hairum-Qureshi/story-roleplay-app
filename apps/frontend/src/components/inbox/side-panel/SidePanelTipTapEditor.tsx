import TipTapEditor from "../../tiptap/TipTapEditor";
import useSocketStore from "../../../store/useSocketStore";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useParams } from "react-router-dom";
import { ring2 } from "ldrs";
import { autoSaveStore } from "../../../store/useAutoSaveStore";

export default function SidePanelTipTapEditor() {
  const { editorUsername, chatID: editorChatID } = useSocketStore();
  const { data: currentUser } = useCurrentUser();
  const { chatID } = useParams<{ chatID: string }>();
  const { saving } = autoSaveStore();

  ring2.register();

  return (
    <>
      <div className="px-5 pt-6 pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white mt-5">
            Role-Play Notes
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="text-sm text-slate-400 flex items-center gap-2">
              {saving ? (
                <>
                  {" "}
                  <l-ring-2
                    size="20"
                    stroke="2"
                    stroke-length="0.25"
                    bg-opacity="0.1"
                    speed="0.8"
                    color="white"
                  ></l-ring-2>
                  <p>Saving...</p>
                </>
              ) : (
                <p className="text-sm text-green-500">Notes Saved</p>
              )}
            </div>
          </div>
        </div>
        {editorUsername && editorChatID === chatID && (
          <div className="flex items-start gap-2">
            <div className="flex items-center gap-1">
              <span className="relative flex items-center size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative flex items-center size-2 rounded-full bg-green-500"></span>
              </span>

              <p className="text-sm text-green-500">
                {editorUsername === currentUser?.username
                  ? "You are"
                  : `${editorUsername} is`}{" "}
                editing this note
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <TipTapEditor />
      </div>
    </>
  );
}
