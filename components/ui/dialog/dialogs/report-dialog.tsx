"use client";

import { useState } from "react";

// Components
import Dialog from "@/components/ui/dialog/dialog";
import DialogHero from "@/components/ui/dialog/dialog-hero";
import { Button } from "@/components/ui/input/button";
import CancelButton from "@/components/ui/buttons/cancel-button";
import InfoMessage from "../../info/info-message";

// Server Functions
import createReportAction from "@/lib/domains/report/create-report";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";
import { Label } from "../../info/label";

type ReportDialogProps = {
  publicationId?: string;
  requestId?: string;
  userId?: string;
  show: boolean;
  onClose: () => void;
};

export default function ReportDialog({
  publicationId,
  requestId,
  userId,
  show,
  onClose,
}: ReportDialogProps) {
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDTO>();

  const [reason, setReason] = useState("");

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(undefined);

    const createReportActionResponse = await createReportAction({
      reason: reason,
      publication_id: publicationId,
      request_id: requestId,
      user_id: userId,
    });

    if (!createReportActionResponse.success) {
      setError(createReportActionResponse.error);
      setIsLoading(false);
      return;
    }

    setPage(page + 1);
    setIsLoading(false);
  };

  function handleClose() {
    onClose();
    setPage(0);
    setReason("");
    setError(undefined);
  }

  return (
    <Dialog
      show={show}
      page={page}
      dialogs={[
        <>
          <DialogHero
            title="Reportar"
            description="Seleccione la opción que mejor se ajuste a la razón del reporte"
          />
          <form
            onSubmit={(e) => {
              handleReport(e);
            }}
            className="grid gap-6"
          >
            <div className="flex flex-col gap-x-2 gap-y-3 items-start text-xl">
              <Label
                htmlFor="option1"
                className="font-normal flex flex-nowrap gap-2"
              >
                <input
                  type="radio"
                  id="option1"
                  name="options"
                  value="Incumplimiento de derechos de autor."
                  className="h-3 w-3 rounded-full border bg-white border-primary appearance-none checked:appearance-auto accent-primary"
                  onChange={(e) => setReason(e.target.value)}
                ></input>
                <p>Incumplimiento de derechos de autor.</p>
              </Label>

              <Label
                htmlFor="option2"
                className="font-normal flex flex-nowrap gap-2"
              >
                <input
                  type="radio"
                  id="option2"
                  name="options"
                  value="Contenido inapropiado (xenofonia, racismo, sexo...)."
                  className="h-3 w-3 rounded-full border bg-white border-primary appearance-none checked:appearance-auto accent-primary"
                  onChange={(e) => setReason(e.target.value)}
                ></input>
                <p>Contenido inapropiado (xenofonia, racismo, sexo...).</p>
              </Label>

              <Label
                htmlFor="option3"
                className="font-normal flex flex-nowrap gap-2"
              >
                <input
                  type="radio"
                  id="option3"
                  name="options"
                  value="Uso inapropiado de la plataforma."
                  className="h-3 w-3 rounded-full border bg-white border-primary appearance-none checked:appearance-auto accent-primary"
                  onChange={(e) => setReason(e.target.value)}
                ></input>
                <p>Uso inapropiado de la plataforma.</p>
              </Label>
              {error?.field && (
                <InfoMessage
                  className="col-span-2"
                  message={error.message}
                  variant={"error"}
                />
              )}
            </div>

            <div className="flex gap-3">
              <CancelButton isLoading={isLoading} onCancel={handleClose} />

              <Button type="submit" className="flex-1">
                Reportar
              </Button>
            </div>
          </form>
        </>,
        <>
          <DialogHero title="¡Listo!" description="Se ha enviado su reporte" />
          <Button onClick={handleClose}>Salir</Button>
        </>,
      ]}
    />
  );
}
