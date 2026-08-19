// Components
import ReportDialog from "@/components/ui/dialog/dialogs/report-dialog";
import DeletePublicationDialog from "@/components/ui/dialog/dialogs/delete-publication-dialog";

type PublicationDialogsProps = {
  publication_id: string;
  showDialog: string;
  onClose: () => void;
  redirectTo: string;
};

export default function PublicationDialogs({
  publication_id,
  showDialog,
  onClose,
  redirectTo,
}: PublicationDialogsProps) {
  return (
    <>
      <ReportDialog
        publicationId={publication_id}
        show={showDialog === "report"}
        onClose={onClose}
      />

      <DeletePublicationDialog
        publication_id={publication_id}
        show={showDialog == "delete"}
        onClose={onClose}
        onSave={async () => {}}
        redirectTo={redirectTo}
      />
    </>
  );
}
