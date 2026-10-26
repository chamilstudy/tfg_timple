// Next
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

// DTOs
import PublicationDTO from "@/lib/dto/publication/publication.dto";
import ReportDialog from "../dialog/dialogs/report-dialog";
import DeletePublicationDialog from "../dialog/dialogs/delete-publication-dialog";
import ContextMenu from "../input/context-menu";
import {
  ArrowRight,
  Flag,
  MessageCircle,
  Pencil,
  ThumbsUp,
  Trash,
  User,
} from "lucide-react";

// Contexts
import { useAuth } from "@/contexts/auth.context";

type PublicationCardProps = {
  publicationData: PublicationDTO;
  onChange: () => Promise<void>;
};

export default function PublicationCard({
  publicationData,
  onChange,
}: PublicationCardProps) {
  const router = useRouter();
  const { session, loading } = useAuth();

  // Hooks
  const [showDialog, setShowDialog] = useState("");
  const [currentPublicationId, setCurrentPublicationId] = useState("");

  return (
    <>
      <ReportDialog
        publicationId={currentPublicationId}
        show={showDialog === "report"}
        onClose={() => {
          setShowDialog("");
        }}
      />

      <DeletePublicationDialog
        publication_id={currentPublicationId}
        show={showDialog == "delete"}
        onClose={() => setShowDialog("")}
        onSave={onChange}
      />

      <div
        aria-label={`${publicationData.song_name} de ${publicationData.author} publicado por ${publicationData.user_name}`}
        className="flex flex-col flex-nowrap rounded border border-border w-full p-5 bg-surface gap-2 outline-none focus-visible:ring-ring focus-visible:ring-1 cursor-pointer  hover:border-primary  hover:shadow transition-all ease-in-out min-w-fit"
        tabIndex={0}
        onClick={() => {
          router.push(
            `/publication?publication-id=${publicationData.publication_id}`,
          );
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target === e.currentTarget) {
            router.push(
              `/publication?publication-id=${publicationData.publication_id}`,
            );
          }
        }}
      >
        <div className="flex flex-row flex-nowrap justify-between">
          <div className="flex flex-col flex-nowrap gap-2">
            <div>
              <h2 className="normal-case text-black">
                {publicationData.song_name}
              </h2>
              <p className="text-xs">
                Por{" "}
                <span className="text-primary">{publicationData.author}</span>
              </p>
            </div>
            <p className="text-xs flex flex-nowrap gap-2">
              <span>{publicationData.album}</span>
              <span>·</span>
              <span>{publicationData.genres.join(", ")}</span>
            </p>
          </div>
          {
            <ContextMenu
              actionGroups={[
                {
                  actions: [
                    {
                      label: "Ir a la publicación",
                      icon: <ArrowRight className="h-[1rem]" />,
                      href: `/publication?publication-id=${publicationData.publication_id}`,
                    },
                    {
                      label: "Ir a perfil del usuario",
                      icon: <User className="h-[1rem]" />,
                      href: `/profile?user_name=${publicationData.user_name}`,
                    },
                  ],
                },

                ...(session
                  ? [
                      {
                        actions:
                          publicationData.user_id === session.user.id
                            ? [
                                {
                                  label: "Editar",
                                  icon: <Pencil className="h-[1rem]" />,
                                  href: `/edit-publication?publication-id=${publicationData.publication_id}`,
                                },
                                {
                                  label: "Eliminar",
                                  icon: <Trash className="h-[1rem]" />,
                                  onClick: () => {
                                    setCurrentPublicationId(
                                      publicationData.publication_id,
                                    );
                                    setShowDialog("delete");
                                  },
                                },
                              ]
                            : [
                                {
                                  label: "Reportar",
                                  icon: <Flag className="h-[1rem]" />,
                                  onClick: () => {
                                    setCurrentPublicationId(
                                      publicationData.publication_id,
                                    );
                                    setShowDialog("report");
                                  },
                                },
                              ],
                      },
                    ]
                  : []),
              ]}
            />
          }
        </div>
        <div className="flex flex-row flex-nowrap justify-between">
          <div className="flex flex-row flex-nowtap gap-3 items-center">
            <div className="flex flex-row flex-nowrap items-center gap-1 text-xs">
              <ThumbsUp size="1em" />
              <span>{publicationData.likes}</span>
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-1 text-xs">
              <MessageCircle size="1em" />
              <span>{publicationData.comments}</span>
            </div>
          </div>
          <p className="text-xs justify-between">
            <span>
              Publicado por{" "}
              <Link
                className="link"
                href={`/profile?user_name=${publicationData.user_name}`}
                onClick={(e) => e.stopPropagation()}
              >
                @{publicationData.user_name}
              </Link>{" "}
              {publicationData.created_at}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
