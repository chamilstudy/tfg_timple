import { useState } from "react";
import { Textarea } from "../text-area";
import { Columns, Rows, Square, X } from "lucide-react";
import { Button } from "../button";

import AdvanceTextAreaHorizontalSplit from "./advance-text-area-horizontal-split";
import AdvanceTextAreaVerticalSplit from "./advance-text-area-vertical-split";
import AdvanceTextAreaPreview from "./advance-text-area-preview_old";
import { cn } from "@/lib/utils";
import PublicationBodyNew from "../../publication/publication-body";
import ToggleButton from "../toggle-button";

type AdvanceTextArea = {
  body: string;
  onChange: (value: string) => void;
  disabled: boolean;
  variant?: "default" | "error";
};

export default function AdvanceTextArea({
  body,
  onChange,
  disabled,
  variant,
}: AdvanceTextArea) {
  //const [showPreview, setShowPreview] = useState(0);
  const [viewMode, setViewMode] = useState("editor");

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  function showCurrentPreview() {
    switch (viewMode) {
      default:
      case "editor":
        return (
          <Textarea
            maxLength={5000}
            className="font-mono border-none shadow-none focus-within:ring-0"
            placeholder="Escribe la canción"
            value={body}
            onChange={handleBodyChange}
            rows={25}
            disabled={disabled}
            variant={variant}
          />
        );
      case "preview":
        return (
          <div className="h-[39rem] p-3">
            <PublicationBodyNew body={body} />
          </div>
        );
      /**case 2:
        return (
          <AdvanceTextAreaVerticalSplit
            onChange={handleBodyChange}
            publicationBody={body}
            disabled={disabled}
          />
        );
      case 3:
        return (
          <AdvanceTextAreaHorizontalSplit
            onChange={handleBodyChange}
            publicationBody={body}
            disabled={disabled}
          />
        );*/
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-3 border rounded bg-white p-3 w-full">
        <div className="flex flex-row justify-end gap-3 items-start">
          <p className="self-center px-5 text-muted">
            <span className={cn(body.length < 300 ? "text-destructive" : "")}>
              {body.length}
            </span>{" "}
            / 5000
          </p>

          <div>
            <ToggleButton
              options={["editor", "preview"]}
              currentOption={viewMode}
              setCurrent={setViewMode}
              size="sm"
            />
          </div>
        </div>

        <hr></hr>
        {showCurrentPreview()}
      </div>
    </div>
  );
}

/**
 * 
 <div className="flex flex-row flex-nowrap">
            <Button
              className={`rounded-r-none hover:border-primary ${showPreview == 0 ? `bg-primary text-white hover:bg-primary cursor-default` : null}`}
              type="button"
              onClick={() => setShowPreview(0)}
              variant={"outline"}
              size={"sm"}
            >
              <X />
            </Button>
            <Button
              className={`rounded-none border-l-0 hover:border-primary ${showPreview == 1 ? `bg-primary text-white hover:bg-primary cursor-default` : null}`}
              type="button"
              onClick={() => setShowPreview(1)}
              variant={"outline"}
              size={"sm"}
            >
              <Square />
            </Button>
            <Button
              className={`rounded-none border-l-0 hover:border-primary ${showPreview == 2 ? `bg-primary text-white hover:bg-primary cursor-default` : null}`}
              type="button"
              onClick={() => setShowPreview(2)}
              variant={"outline"}
              size={"sm"}
            >
              <Rows />
            </Button>
            <Button
              className={`rounded-l-none border-l-0 hover:border-primary ${showPreview == 3 ? `bg-primary text-white hover:bg-primary cursor-default` : null}`}
              type="button"
              onClick={() => setShowPreview(3)}
              variant={"outline"}
              size={"sm"}
            >
              <Columns />
            </Button>
          </div>
 */
