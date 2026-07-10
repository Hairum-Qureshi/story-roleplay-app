import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";
import TipTapEditorToolbar from "./TipTapEditorToolbar";
import useSocketStore from "../../store/useSocketStore";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function TipTapEditor() {
  const { editorUsername } = useSocketStore();
  const { data: currentUser } = useCurrentUser();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: "focus:outline-none flex-1 h-full",
      },
    },
  });

  const isEditorDisabled =
    !!editorUsername && editorUsername !== currentUser?.username;

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!isEditorDisabled);
  }, [editor, isEditorDisabled]);

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
        <EditorContent editor={editor} className="flex-1 h-full" />{" "}
      </div>
    </div>
  );
}
