"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";

import HeroTitle from "@/components/ui/titles/hero-title";
import { Button } from "@/components/ui/input/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { InfoMessage } from "../ui/input/info-message";

import { createClient } from "@/lib/supabase/client";
import { updatePasswordAction } from "@/lib/auth/update-password";
import {
  AuthErrorFields,
  authErrorMap,
  AuthErrorCode,
} from "@/lib/auth/auth-errors";

export function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState<AuthErrorFields>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const exchange = async () => {
      const supabase = createClient();
      await supabase.auth.exchangeCodeForSession(window.location.href);
    };

    exchange();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError({});

    if (password !== repeatPassword) {
      setError(authErrorMap[AuthErrorCode.PASSWORD_NOT_MATCH]);
      setIsLoading(false);
      return;
    }

    const result = await updatePasswordAction({ password });

    if (result.error)
      setError(authErrorMap[result.error] ?? { unknown: result.error });
    else router.push("/profile");

    setIsLoading(false);
  };

  return (
    <div className="grid gap-6 p-6 py-16 max-w-sm w-full">
      <HeroTitle
        title="Restablecer Contraseña"
        description="Introduce tu nueva contraseña"
      />

      <form onSubmit={handleUpdatePassword} className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="password">Nueva Contraseña</Label>
          <Input
            id="password"
            autoComplete="new-password"
            type="password"
            placeholder="Escribe tu Contraseña"
            variant={error["password"] ? "error" : "default"}
            icon={<LockKeyhole />}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="repeat-password">Repite Contraseña</Label>
          <Input
            id="repeat-password"
            autoComplete="new-password"
            type="password"
            placeholder="Escribe tu contraseña"
            variant={error.password ? "error" : "default"}
            icon={<LockKeyhole />}
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {error.password && (
            <InfoMessage message={error.password} variant="error" />
          )}
        </div>
        {error.unknown && (
          <InfoMessage message={error.unknown} variant="error" />
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex gap-2 items-center">
              <LoaderCircle className="animate-spin" />
              Cambiando...
            </span>
          ) : (
            "Cambiar Contraseña"
          )}
        </Button>
      </form>
    </div>
  );
}
