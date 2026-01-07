import { Button } from "../input/button";

type CancelButtonProps = {
  isLoading: boolean;
  onCancel: () => void;
};

export default function CancelButton(props: CancelButtonProps) {
  return (
    <Button
      type="button"
      variant="destructive"
      disabled={props.isLoading}
      onClick={() => {
        !props.isLoading && props.onCancel();
      }}
    >
      Cancelar
    </Button>
  );
}
