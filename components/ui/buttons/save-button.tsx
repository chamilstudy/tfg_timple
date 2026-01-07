import { Button } from "../input/button";
import { LoaderCircle } from "lucide-react";

type SaveButtonProps = {
  isLoading: boolean;
};

export default function SaveButton(props: SaveButtonProps) {
  return (
    <Button type="submit" className="flex-1" disabled={props.isLoading}>
      {props.isLoading ? (
        <span className="flex gap-2 items-center">
          <LoaderCircle className="animate-spin" />
          Guardando...
        </span>
      ) : (
        "Guardar"
      )}
    </Button>
  );
}
