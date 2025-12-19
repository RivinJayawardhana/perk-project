"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Minus,
  Strikethrough,
  Type,
  Eraser,
  IndentDecrease,
  IndentIncrease,
  Undo,
  Redo,
  HelpCircle,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RichTextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const handleHeadingChange = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else if (value === "code") {
      editor.chain().focus().toggleCodeBlock().run();
    } else {
      const level = parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6;
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const ToolbarButton = ({
    onClick,
    active,
    icon: Icon,
    title,
    disabled = false,
  }: {
    onClick: () => void;
    active: boolean;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    disabled?: boolean;
  }) => (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      size="icon"
      className="w-8 h-8"
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      <Icon className="w-4 h-4" />
    </Button>
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-muted/50 border-b p-2 space-y-2">
        {/* Row 2 - Formatting */}
        <div className="flex items-center gap-1 flex-wrap border-t border-border pt-2">
          <Select defaultValue="paragraph">
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue placeholder="Paragraph" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="1">Heading 1</SelectItem>
              <SelectItem value="2">Heading 2</SelectItem>
              <SelectItem value="3">Heading 3</SelectItem>
              <SelectItem value="4">Heading 4</SelectItem>
              <SelectItem value="5">Heading 5</SelectItem>
              <SelectItem value="6">Heading 6</SelectItem>
              <SelectItem value="code">Code Block</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-6 w-px bg-border mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            icon={Bold}
            title="Bold"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            icon={Italic}
            title="Italic"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            icon={Strikethrough}
            title="Strikethrough"
          />

          <div className="h-6 w-px bg-border mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            icon={List}
            title="Bullet List"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            icon={ListOrdered}
            title="Ordered List"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            icon={Quote}
            title="Blockquote"
          />

          <div className="h-6 w-px bg-border mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            icon={AlignLeft}
            title="Align Left"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            icon={AlignCenter}
            title="Align Center"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            icon={AlignRight}
            title="Align Right"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            active={editor.isActive({ textAlign: "justify" })}
            icon={AlignJustify}
            title="Align Justify"
          />

          <div className="h-6 w-px bg-border mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            icon={Code}
            title="Code Block"
          />
        </div>

        {/* Row 3 - Additional Actions */}
        <div className="flex items-center gap-1 flex-wrap border-t border-border pt-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            active={false}
            icon={Minus}
            title="Horizontal Rule"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().clearNodes().run()}
            active={false}
            icon={Eraser}
            title="Clear Formatting"
          />

          <div className="ml-auto flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              active={false}
              icon={Undo}
              title="Undo"
              disabled={!editor.can().undo()}
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              active={false}
              icon={Redo}
              title="Redo"
              disabled={!editor.can().redo()}
            />
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="bg-background p-4 min-h-[300px]">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none focus:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:min-h-[300px]"
        />
      </div>
    </div>
  );
}
