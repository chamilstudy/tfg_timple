"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, LoaderCircle } from "lucide-react";

// Components
import { Button } from "@/components/ui/input/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/info/label";
import HeroTitle from "@/components/ui/layout/hero-title";
import InfoMessage from "@/components/ui/info/info-message";

// Server Functions
import requestPasswordAction from "@/lib/domains/auth/request-password";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<ErrorDTO>();
  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);

    const redirectTo = `${window.location.origin}/auth/update-password`;

    const requestPasswordResponse = await requestPasswordAction({
      email,
      redirectTo,
    });

    if (!requestPasswordResponse.success)
      setError(requestPasswordResponse.error);

    setSuccess(requestPasswordResponse.success);
    setIsLoading(false);
  };

  return (
    <div className="grid max-w-sm w-full gap-6 p-6 py-16">
      {success ? (
        <>
          <HeroTitle
            title="Revisa tu Correo"
            description="Recibiras un correo con las instrucciones para recuperar tu contraseña"
          />

          <Link href="/auth/login">
            <Button className="w-full">Continuar</Button>
          </Link>
        </>
      ) : (
        <>
          <HeroTitle
            title="Recuperar Contraseña"
            description="Introduce tu correo para solicitar la recuperación de contraseña"
          />

          <form onSubmit={handleForgotPassword} className="grid gap-6">
            <div className="grid gap-2">
              <Label className="text-xs font-bold" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Escribe tu correo"
                required
                icon={<Mail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error?.field == "email" && (
                <InfoMessage message={error.message} variant={"error"} />
              )}
            </div>

            <div className="grid gap-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex gap-2 items-center">
                    <LoaderCircle className="animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  "Recuperar Contraseña"
                )}
              </Button>

              <p className="text-center text-sm">¿no tienes cuenta?</p>

              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
