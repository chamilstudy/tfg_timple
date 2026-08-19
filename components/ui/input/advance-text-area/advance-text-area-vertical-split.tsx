import { Textarea } from "@/components/ui/input/text-area";
import { useRef } from "react";
import PublicationBodyNew from "../../publication/publication-body";

type AdvanceTextAreaVerticalSplitProps = {
  publicationBody: string;
  onChange: (value: any) => void;
  disabled: boolean;
};

export default function AdvanceTextAreaVerticalSplit({
  publicationBody,
  onChange,
  disabled,
}: AdvanceTextAreaVerticalSplitProps) {
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
    <div className="flex flex-col h-[39rem] overflow-auto" tabIndex={1}>
      {/* Textarea con scroll */}
      <Textarea
        maxLength={1500}
        ref={textareaRef}
        className="flex-1 font-mono border-none shadow-none focus-within:ring-0 h-1/2 overflow-auto"
        placeholder="Escribe la canción"
        value={publicationBody}
        onChange={onChange}
        onScroll={handleTextareaScroll}
        rows={25}
        disabled={disabled}
      />
      <hr></hr>
      <div
        ref={previewRef}
        className="flex-1 bg-white rounded-b font-mono h-1/2 overflow-auto p-3"
        onScroll={handlePreviewScroll}
      >
        {/**<AdvanceTextAreaPreview publicationBody={publicationBody} />*/}
        <PublicationBodyNew body={publicationBody} />
      </div>
    </div>
  );
}
