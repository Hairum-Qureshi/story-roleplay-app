import { Editor } from "@tiptap/react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
  FaListUl,
  FaListOl,
} from "react-icons/fa";

interface TipTapEditorToolbarProps {
  editor: Editor;
}

export default function TipTapEditorToolbar({
  editor,
}: TipTapEditorToolbarProps) {
  const getButtonClassName = (isActive: boolean) =>
    `space-x-4 rounded-md p-1 transition hover:cursor-pointer ${
      isActive
        ? "bg-sky-500/20 ring-1 ring-sky-400/70"
        : "text-slate-600 hover:bg-slate-200/20"
    }`;

  const getIconClassName = (isActive: boolean) =>
    `p-1 text-2xl transition ${
      isActive ? "text-sky-400" : "text-slate-500 hover:text-slate-400"
    }`;

  return (
    <div className="flex items-center">
      <button
        className={getButtonClassName(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        title="Bold"
      >
        <FaBold className={getIconClassName(editor.isActive("bold"))} />
      </button>
      <button
        className={getButtonClassName(editor.isActive("italic"))}
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <FaItalic className={getIconClassName(editor.isActive("italic"))} />
      </button>
      <button
        className={getButtonClassName(editor.isActive("strike"))}
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <FaStrikethrough
          className={getIconClassName(editor.isActive("strike"))}
        />
      </button>
      <button
        className={getButtonClassName(editor.isActive("underline"))}
        title="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
      >
        <FaUnderline
          className={getIconClassName(editor.isActive("underline"))}
        />
      </button>
      <button
        className={getButtonClassName(editor.isActive("bulletList"))}
        title="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
      >
        <FaListUl className={getIconClassName(editor.isActive("bulletList"))} />
      </button>
      <button
        className={getButtonClassName(editor.isActive("orderedList"))}
        title="Ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
      >
        <FaListOl
          className={getIconClassName(editor.isActive("orderedList"))}
        />
      </button>
    </div>
  );
}
