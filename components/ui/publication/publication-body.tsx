import { useState } from "react";
import { createPortal } from "react-dom";
import ToggleAutoscroll from "../input/toggle-autoscroll";
import ChordDiagram from "./chord-diagram";
import { ArrowDownToDot, Minus, MoveDown, MoveUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import PublicationBodySkeleton from "./publication-body-skeleton";

type PublicationBodyProps = {
  chords?: Record<string, Array<number>>;
  body: string;
  autoscroll?: boolean;
  isLoading: boolean;
};

export default function PublicationBody({
  chords,
  body,
  autoscroll = false,
  isLoading,
}: PublicationBodyProps) {
  const [activeChord, setActiveChord] = useState<{
    chord: string;
    rect: DOMRect;
  } | null>(null);

  const chordRegex =
    /^(?:\s*((?:[A-G]|Do|Re|Mi|Fa|Sol|La|Si)[#b]?(?:\s*(?:mayor|maj|M|menor|m|7|m7|maj7|dim|aug|dim7|aug7)?)?)\s*)+$/;

  const handleEnter = (e: React.MouseEvent, chord: string) => {
    if (!chords) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    setActiveChord({
      chord,
      rect,
    });
  };

  const handleLeave = () => {
    setActiveChord(null);
  };

  const renderPreview = (text: string) => {
    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, i) => {
      const trimmed = line.trim();

      // 1️⃣ Acordes
      if (chordRegex.test(trimmed)) {
        return (
          <div
            key={i}
            className="font-bold text-primary font-mono whitespace-pre pt-3"
          >
            {line.split(/(\s+)/).map((part, j) =>
              part.trim().length ? (
                <span
                  key={j}
                  className={cn(
                    "relative px-1 rounded hover:bg-pressed",
                    chords ? "cursor-pointer" : "",
                  )}
                  tabIndex={1}
                  onMouseEnter={(e) => handleEnter(e, part)}
                  onMouseLeave={handleLeave}
                >
                  {part}
                </span>
              ) : (
                <span key={j}>{part}</span>
              ),
            )}
          </div>
        );
      }

      // 2️⃣ Rasgueo
      if (/^[DUTX\s\-]+$/.test(trimmed)) {
        return (
          <div key={i} className="flex pt-3">
            {line.split("").map((ch, j) => {
              switch (ch) {
                case "D":
                  return <MoveDown key={j} className="w-6 h-6" />;
                case "U":
                  return <MoveUp key={j} className="w-6 h-6" />;
                case "T":
                  return <ArrowDownToDot key={j} className="w-6 h-6" />;
                case "X":
                  return <X key={j} className="w-6 h-6" />;
                case "-":
                  return <Minus key={j} className="w-6 h-6" />;
                case " ":
                  return <span key={j} className="w-2" />;
                default:
                  return <span key={j}>{ch}</span>;
              }
            })}
          </div>
        );
      }

      // 3️⃣ Texto normal
      if (trimmed === "") {
        return (
          <div key={i} className="font-mono">
            &nbsp;
          </div>
        );
      }

      return (
        <div key={i} className="font-mono">
          {line
            .split(/(\*.*?\*)/)
            .map((part, j) =>
              part.startsWith("*") && part.endsWith("*") ? (
                <strong key={j}>{part.slice(1, -1)}</strong>
              ) : (
                <span key={j}>{part}</span>
              ),
            )}
        </div>
      );
    });
  };

  return isLoading ? (
    <PublicationBodySkeleton />
  ) : (
    <div className="flex flex-col gap-8 relative h-full w-full">
      {autoscroll && <ToggleAutoscroll />}

      {/* scroll container */}
      <div className="flex-col overflow-x-scroll w-full h-full text-nowrap">
        {renderPreview(body)}
      </div>

      {/* TOOLTIP GLOBAL (FUERA DEL OVERFLOW) */}
      {activeChord &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: activeChord.rect.top,
              left: activeChord.rect.left + activeChord.rect.width / 2,
              transform: "translate(-50%, calc(-100% - 6px))",
              zIndex: 9999,
              pointerEvents: "none",
            }}
            className="border py-4 px-3 flex flex-col items-center rounded bg-white shadow"
          >
            <h3 className="font-bold text-xl text-foreground">
              {activeChord.chord}
            </h3>

            <ChordDiagram
              fretPositions={chords?.[activeChord.chord] ?? []}
              fretDepth={5}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
