import { useEditor, EditorContent } from "@tiptap/react";
import useAutoSave from "../../hooks/useAutoSave";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect, useState } from "react";
import TipTapEditorToolbar from "./TipTapEditorToolbar";
import useSocketStore from "../../store/useSocketStore";
import useChatStore from "../../store/useChatStore";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useRolePlayChat from "../../hooks/useRolePlayChat";

export default function TipTapEditor() {
  const { editorUsername, socket } = useSocketStore();
  const { data: currentUser } = useCurrentUser();
  const { autosave } = useAutoSave();
  const { selectedChat } = useChatStore();
  const { rolePlayNotes } = useRolePlayChat(selectedChat?._id || "");
  const [idleTimer, setIdleTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: "focus:outline-none flex-1 h-full",
      },
    },
    content: rolePlayNotes?.notes || "",
    onUpdate: ({ editor }) => {
      autosave(editor.getHTML());

      if (idleTimer) {
        clearTimeout(idleTimer);
      }

      const newIdleTimer = setTimeout(() => {
        socket?.emit("noteEditorUpdate", {
          chatID: selectedChat?._id,
          uid: currentUser?._id,
          username: currentUser?.username,
          action: "stop",
        });
        console.log("User is idle, sent stop editing event");
      }, 15_000); // 15 seconds
      setIdleTimer(newIdleTimer);
    },
  });

  const isEditorDisabled =
    !!editorUsername && editorUsername !== currentUser?.username;

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!isEditorDisabled);
  }, [editor, isEditorDisabled]);

  useEffect(() => {
    if (!editor) return;

    const nextContent = rolePlayNotes?.notes || "";

    if (editor.getHTML() !== nextContent) {
      editor.commands.setContent(nextContent, { emitUpdate: false });
    }
  }, [editor, selectedChat?._id, rolePlayNotes?.notes]);

  if (!editor) return null;

  return (
    <div className="w-full">
      <TipTapEditorToolbar editor={editor} isDisabled={isEditorDisabled} />
      <div
        className="text-white mt-3 leading-5 h-full overflow-y-auto
                [&_p]:mb-2 text-sm
                [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:list-decimal [&_ol]:pl-6
                [&_li]:mb-1
                [&_a]:text-sky-400 [&_a]:underline [&_a]:hover:text-sky-300"
      >
        <EditorContent editor={editor} className="flex-1 h-full" />
      </div>
    </div>
  );
}
