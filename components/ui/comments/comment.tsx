// dtos
import CommentDTO from "@/lib/dto/publication/comment.dto";

// icons
import { Flag, Trash, User } from "lucide-react";

// next
import Link from "next/link";
import { useState } from "react";

// contexts
import { useAuth } from "@/contexts/auth.context";

// components
import ContextMenu from "../input/context-menu";
import DeleteCommentDialog from "../dialog/dialogs/delete-comment-dialog";
import ReportDialog from "../dialog/dialogs/report-dialog";

type CommentProps = {
  commentData: CommentDTO;
  onChange: () => void;
};

export default function Comment({ commentData, onChange }: CommentProps) {
  const { session } = useAuth();

  const [currentCommentId, setCurrentCommentId] = useState("");
  const [showDialog, setShowDialog] = useState("");

  return (
    <>
      <DeleteCommentDialog
        onSave={async () => onChange()}
        commentId={currentCommentId}
        show={"delete" == showDialog}
        onClose={() => setShowDialog("")}
      />
      <ReportDialog
        show={"report" == showDialog}
        onClose={() => {
          setShowDialog("");
          setCurrentCommentId("");
        }}
        commentId={currentCommentId}
      />
      <div className="flex flex-row flex-nowrap bg-surface rounded p-5 ">
        <div className="w-full flex flex-col flex-nowrap gap-1">
          <p className="text-xs">
            <Link
              href={`profile?user-name?${commentData.user_name}`}
              className="link"
            >
              @{commentData.user_name}
            </Link>
            <span> {commentData.created_at}</span>
          </p>

          <p>{commentData.comment}</p>
        </div>

        {
          <ContextMenu
            actionGroups={[
              {
                actions: [
                  {
                    label: "Ir a perfil del usuario",
                    icon: <User className="h-[1rem]" />,
                    href: `/profile?user_name=${commentData.user_name}`,
                  },
                ],
              },

              ...(session
                ? [
                    {
                      actions:
                        commentData.user_id === session.user.id
                          ? [
                              {
                                label: "Eliminar",
                                icon: <Trash className="h-[1rem]" />,
                                onClick: () => {
                                  setCurrentCommentId(commentData.comment_id);
                                  setShowDialog("delete");
                                },
                              },
                            ]
                          : [
                              {
                                label: "Reportar",
                                icon: <Flag className="h-[1rem]" />,
                                onClick: () => {
                                  setCurrentCommentId(commentData.comment_id);
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
    </>
  );
}
