// Components
import DeletePublicationDialog from "../ui/dialog/dialogs/delete-publication-dialog";
import DeleteSongRequestDialog from "../ui/dialog/dialogs/delete-song-request-dialog";

type PrivateProfileDialogsProps = {
  id: string;
  showDialog: string;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function PrivateProfileDialogs({
  id,
  showDialog,
  onClose,
  onSave,
}: PrivateProfileDialogsProps) {
  return (
    <>
      <DeletePublicationDialog
        publication_id={id}
        show={showDialog === "delete-publication"}
        onClose={onClose}
        onSave={onSave}
      />
      <DeleteSongRequestDialog
        request_id={id}
        show={showDialog === "delete-request"}
        onClose={onClose}
        onSave={onSave}
      />
    </>
  );
}
