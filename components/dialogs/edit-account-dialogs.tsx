// Components
import EditEmailDialog from "@/components/ui/dialog/dialogs/edit-email-dialog";
import EditPasswordDialog from "@/components/ui/dialog/dialogs/edit-password-dialog";
import DeleteAccountDialog from "@/components/ui/dialog/dialogs/delete-account-dialog";
import SignOutDialog from "@/components/ui/dialog/dialogs/sign-out-dialog";

type EditAccDialogsProps = {
  email: string;
  showDialog: string;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function EditAccountDialogs({
  email,
  showDialog,
  onClose,
}: EditAccDialogsProps) {
  return (
    <>
      <EditEmailDialog
        email={email}
        show={showDialog === "email"}
        onClose={onClose}
      />

      <EditPasswordDialog show={showDialog == "password"} onClose={onClose} />

      <DeleteAccountDialog show={showDialog == "delete"} onClose={onClose} />

      <SignOutDialog show={showDialog == "signout"} onClose={onClose} />
    </>
  );
}
