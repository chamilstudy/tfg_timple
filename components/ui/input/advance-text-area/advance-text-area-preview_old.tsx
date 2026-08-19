import { ArrowDown, ArrowUp, X, Minus, ArrowDownToDot } from "lucide-react";

type AdvanceTextAreaPreview = {
  publicationBody: string;
};

export default function AdvanceTextAreaPreview({
  publicationBody,
}: AdvanceTextAreaPreview) {
  if (!publicationBody) return null;

  const chordRegex =
    /^(?:\s*((?:[A-G]|Do|Re|Mi|Fa|Sol|La|Si)[#b]?(?:\s*(?:mayor|maj|M|menor|m|7|m7|maj7|dim|aug|dim7|aug7)?)?)\s*)+$/;

  const lines = publicationBody.split("\n");

  return (
    <div className="w-full break-words whitespace-pre-wrap p-3 font-mono cursor-default">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        // 1️⃣ Línea de acordes
        if (chordRegex.test(trimmed)) {
          return (
            <div
              key={i}
              className="font-bold text-primary font-mono whitespace-pre-wrap"
            >
              {line.split(/(\s+)/).map((part, j) => (
                <span key={j}>{part}</span>
              ))}
            </div>
          );
        }

        // 2️⃣ Línea de rasgueo
        if (/^[DUTX\s\-]+$/.test(trimmed)) {
          return (
            <div key={i} className="flex gap-[2px]">
              {line.split("").map((ch, j) => {
                switch (ch) {
                  case "D":
                    return (
                      <ArrowDown key={j} className="w-6 h-6" strokeWidth={1} />
                    );
                  case "U":
                    return (
                      <ArrowUp key={j} className="w-6 h-6" strokeWidth={1} />
                    );
                  case "T":
                    return (
                      <ArrowDownToDot
                        key={j}
                        className="w-6 h-6"
                        strokeWidth={1}
                      />
                    );
                  case "X":
                    return <X key={j} className="w-6 h-6" strokeWidth={1} />;

                  case "-":
                    return (
                      <Minus key={j} className="w-6 h-6" strokeWidth={1} />
                    );
                  case " ":
                    return <span key={j} className="w-2" />;
                  default:
                    return <span key={j}>{ch}</span>;
                }
              })}
            </div>
          );
        }

        // 3️⃣ Texto normal, con negrita por asteriscos
        if (trimmed === "") {
          // línea vacía → mantener el salto
          return (
            <div key={i} className="font-mono whitespace-pre-wrap">
              &nbsp;
            </div>
          );
        }

        // texto con contenido
        return (
          <div key={i} className="font-mono whitespace-pre-wrap">
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
      })}
    </div>
  );
}
