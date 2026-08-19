import { Button } from "@/components/ui/input/button";

export default function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={"outline"}
          disabled
          aria-label="Navegar a inicio de sesión"
        >
          Iniciar Sesión
        </Button>
        <Button
          size="sm"
          variant={"default"}
          disabled
          aria-label="Navegar a registro"
        >
          Registro
        </Button>
      </div>
    </div>
  );
}
