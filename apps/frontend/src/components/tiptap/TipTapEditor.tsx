import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
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
    content: "Hello, World",
  });

  if (!editor) return null;

  if (editorUsername && editorUsername !== currentUser?.username) {
    editor.setEditable(false);
  } else {
    editor.setEditable(true);
  }

  return (
    <div className="w-full">
      <TipTapEditorToolbar editor={editor} />
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

/* The classNames:

"text-white mx-4 mt-3 leading-5 h-72 overflow-y-auto
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-4
                [&_p]:mb-2
                [&_blockquote]:pl-4 [&_blockquote]:border-l-4 [&_blockquote]:border-sky-500 [&_blockquote]:italic [&_blockquote]:text-slate-400
                [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:list-decimal [&_ol]:pl-6
                [&_li]:mb-1
                [&_a]:text-sky-400 [&_a]:underline [&_a]:hover:text-sky-300"
                
Are all apart of Tailwind Typography 
*/
