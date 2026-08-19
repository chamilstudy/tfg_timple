import { Textarea } from "@/components/ui/input/text-area";
import { useRef } from "react";

import PublicationBodyNew from "../../publication/publication-body";

type AdvanceTextAreaHorizontalSplitProps = {
  publicationBody: string;
  onChange: (value: any) => void;
  disabled: boolean;
};

export default function AdvanceTextAreaHorizontalSplit({
  publicationBody,
  onChange,
  disabled,
}: AdvanceTextAreaHorizontalSplitProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef<"textarea" | "preview" | null>(null);

  const handleTextareaScroll = () => {
    const textarea = textareaRef.current;
    const preview = previewRef.current;
    if (!textarea || !preview) return;

    if (isSyncing.current === "preview") return; // evita loop

    isSyncing.current = "textarea";

    const scrollPercent =
      textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);

    preview.scrollTop =
      scrollPercent * (preview.scrollHeight - preview.clientHeight);

    isSyncing.current = null;
  };

  const handlePreviewScroll = () => {
    const textarea = textareaRef.current;
    const preview = previewRef.current;
    if (!textarea || !preview) return;

    if (isSyncing.current === "textarea") return; // evita loop

    isSyncing.current = "preview";

    const scrollPercent =
      preview.scrollTop / (preview.scrollHeight - preview.clientHeight);

    textarea.scrollTop =
      scrollPercent * (textarea.scrollHeight - textarea.clientHeight);

    isSyncing.current = null;
  };
  return (
    <div className="grid grid-cols-2 divide-x h-[39rem]" tabIndex={1}>
      <Textarea
        maxLength={1500}
        ref={textareaRef}
        className="font-mono border-none shadow-none focus-within:ring-0"
        placeholder="Escribe la canción"
        value={publicationBody}
        onChange={onChange}
        onScroll={handleTextareaScroll}
        rows={25}
        disabled={disabled}
      />
      <div
        ref={previewRef}
        onScroll={handlePreviewScroll}
        className="bg-white whitespace-pre overflow-y-scroll p-3"
      >
        {/**<PublicationPreview publicationBody={publicationBody} />*/}
        <PublicationBodyNew body={publicationBody} />
      </div>
    </div>
  );
}
