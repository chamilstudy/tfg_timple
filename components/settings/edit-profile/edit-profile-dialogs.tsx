// Components
import EditUserNameDialog from "@/components/ui/dialog/dialogs/edit-username-dialog";
import EditUserDescriptionDialog from "@/components/ui/dialog/dialogs/edit-userdescription-dialog";

type EditAccDialogsProps = {
  userName: string;
  description: string;
  showDialog: string;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function EditProfileDialogs({
  userName,
  description,
  showDialog,
  onClose,
  onSave,
}: EditAccDialogsProps) {
  return (
    <>
      <EditUserNameDialog
        userName={userName}
        show={showDialog === "name"}
        onClose={onClose}
        onSave={onSave}
      />

      <EditUserDescriptionDialog
        description={description}
        show={showDialog === "description"}
        onClose={onClose}
        onSave={onSave}
      />
    </>
  );
}
