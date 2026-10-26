// next
import { useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import Link from "next/link";

// icons
import { MessageCircle, SendHorizonal, X } from "lucide-react";

// domains
import { createCommentAction } from "@/lib/domains/publication/manage-publication/create-comment";

// contexts
import { useAuth } from "@/contexts/auth.context";

// components
import { Textarea } from "../input/text-area";
import { Button } from "../input/button";
import { Checkbox } from "../input/checkbox";
import InfoMessage from "../info/info-message";
import { Label } from "../info/label";

type CommentFormProps = {
  onSubmit: () => void;
};

export function CommentForm({ onSubmit }: CommentFormProps) {
  const { session } = useAuth();
  const searchParams = useSearchParams();
  const publicationId = searchParams.get("publication-id") ?? "";
  const [showComment, setShowComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleCreateComment = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const response = await createCommentAction({
      publication_id: publicationId,
      comment: comment,
    });

    if (response.error) {
      setError(response.error.message);
    } else {
      setError("");
      setComment("");
      setIsLoading(false);
      setShowComment(false);
      onSubmit();
    }
    setIsLoading(false);
  };
  return (
    <>
      {!showComment && (
        <Button
          disabled={session ? false : true}
          onClick={() => setShowComment(!showComment)}
          variant={"outline"}
          size={"sm"}
        >
          <MessageCircle />
          Comentar
        </Button>
      )}
      {showComment && (
        <>
          <form
            onSubmit={handleCreateComment}
            className="w-full flex flex-col flex-nowrap gap-3 py-6 border-y "
          >
            {error && (
              <InfoMessage
                className="col-span-2 border p-3 rounded border-destructive"
                message={error}
                variant="error"
              />
            )}
            <div className="grid gap-2">
              <Label htmlFor="comment">Nuevo comentario*</Label>
              <Textarea
                className="w-full"
                id="description"
                maxLength={150}
                placeholder={"Escribe aquí tu comentario..."}
                onChange={(e) => setComment(e.target.value)}
                count={150 - comment.length}
                variant={error ? "error" : "default"}
                required
              />
            </div>
            <div className="text-xs inline-flex gap-3 sm:col-span-2">
              <Checkbox id="tac" name="tac" required disabled={isLoading} />
              <span>
                He leído y cumplo con las reglas establecidas en los{" "}
                <Link
                  className="link"
                  href="/tac"
                  target="_black"
                  rel="noopener"
                >
                  términos y condiciones
                </Link>{" "}
                del servicio
              </span>
            </div>
            <div className="flex flex-row flex-nowrap gap-3 self-end">
              <Button
                onClick={() => setShowComment(!showComment)}
                variant={"destructive"}
                size={"sm"}
                disabled={isLoading}
              >
                <X />
                Cancelar
              </Button>
              <Button size={"sm"} type="submit" disabled={isLoading}>
                <SendHorizonal />
                Comentar
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
