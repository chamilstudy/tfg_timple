// next
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

// DTOs
import SongRequestDTO from "@/lib/dto/song-request/song-request.dto";

// icons
import { Feather, Flag, Trash, User } from "lucide-react";

// contexts
import { useAuth } from "@/contexts/auth.context";

// components
import ReportDialog from "../dialog/dialogs/report-dialog";
import DeleteSongRequestDialog from "../dialog/dialogs/delete-song-request-dialog";
import ContextMenu from "../input/context-menu";

type SongRequestCardProps = {
  songRequestListData: SongRequestDTO;
  onChange: () => Promise<void>;
};

export default function SongRequestCard({
  songRequestListData,
  onChange,
}: SongRequestCardProps) {
  const router = useRouter();
  const { session, loading } = useAuth();

  // Hooks
  const [showDialog, setShowDialog] = useState("");
  const [currentSongRequestId, setCurrentSongRequestId] = useState("");

  return (
    <>
      <ReportDialog
        requestId={currentSongRequestId}
        show={showDialog === "report"}
        onClose={() => {
          setShowDialog("");
        }}
      />
      <DeleteSongRequestDialog
        request_id={currentSongRequestId}
        show={showDialog === "delete-song-request"}
        onClose={() => {
          setShowDialog("");
        }}
        onSave={onChange}
      />
      <div
        aria-label={`${songRequestListData.song_name} de ${songRequestListData.author} solicitado por ${songRequestListData.requester_user_name}`}
        className="flex flex-col flex-nowrap rounded border border-border w-full p-5 bg-surface gap-2 outline-none focus-visible:ring-ring focus-visible:ring-1 cursor-pointer  hover:border-primary  hover:shadow transition-all ease-in-out min-w-fit"
        tabIndex={0}
        onClick={() => {
          router.push(
            `/resolve-song-request?request-id=${songRequestListData.request_id}`,
          );
        }}
      >
        <div className="flex flex-row flex-nowrap justify-between">
          <div className="flex flex-col flex-nowrap gap-2">
            <div>
              <h2 className="normal-case text-black">
                {songRequestListData.song_name}
              </h2>
              <p className="text-xs">
                Por{" "}
                <span className="text-primary">
                  {songRequestListData.author}
                </span>
              </p>
            </div>
            <p className="text-xs flex flex-nowrap gap-2">
              <span>{songRequestListData.album}</span>
              <span>·</span>
              <span>{songRequestListData.genres.join(", ")}</span>
            </p>
          </div>
          {
            <ContextMenu
              actionGroups={[
                {
                  actions: [
                    {
                      label: "Ir a perfil del usuario",
                      icon: <User className="h-[1rem]" />,
                      href: `/profile?user_name=${songRequestListData.requester_user_name}`,
                    },
                  ],
                },
                ...(session
                  ? [
                      {
                        actions: [
                          {
                            label: "Resolver",
                            icon: <Feather className="h-[1rem]" />,
                            href: `/resolve-song-request?request-id=${songRequestListData.request_id}`,
                          },
                          songRequestListData.requester_id === session.user.id
                            ? {
                                label: "Eliminar",
                                icon: <Trash className="h-[1rem]" />,
                                onClick: () => {
                                  setCurrentSongRequestId(
                                    songRequestListData.request_id,
                                  );
                                  setShowDialog("delete-song-request");
                                },
                              }
                            : {
                                label: "Reportar",
                                icon: <Flag className="h-[1rem]" />,
                                onClick: () => {
                                  setCurrentSongRequestId(
                                    songRequestListData.request_id,
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

        <p className="text-xs self-end">
          Publicado
          {songRequestListData.requester_user_name ? (
            <>
              <span> por </span>
              <Link
                className="link"
                href={`/profile?user_name=${songRequestListData.requester_user_name}`}
                onClick={(e) => e.stopPropagation()}
              >
                @{songRequestListData.requester_user_name}
              </Link>{" "}
            </>
          ) : (
            " "
          )}
          {songRequestListData.created_at}
        </p>
      </div>
    </>
  );
}
