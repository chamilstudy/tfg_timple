import { EditEmailDialog } from "@/components/settings/edit-account/dialogs/edit-email-dialog";
import { EditPasswordDialog } from "@/components/settings/edit-account/dialogs/edit-password-dialog";
import { DeleteAccountDialog } from "@/components/settings/edit-account/dialogs/delete-account-dialog";
import { SignOutDialog } from "@/components/settings/edit-account/dialogs/sign-out-dialog";

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
