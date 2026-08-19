"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, LockKeyhole, LoaderCircle } from "lucide-react";

// Components
import HeroTitle from "../ui/layout/hero-title";
import { Button } from "@/components/ui/input/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/info/label";
import InfoMessage from "@/components/ui/info/info-message";

// Server Functions
import login from "@/lib/domains/auth/login";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<ErrorDTO>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);

    setIsLoading(false);

    const loginResponse = await login({ email, password });

    if (!loginResponse.success) setError(loginResponse.error);
    else router.push("/profile");

    setIsLoading(false);
  };

  return (
    <div className="grid max-w-sm w-full gap-6 py-16 p-6">
      <HeroTitle
        title="Iniciar Sesión"
        description="Introduce tus datos para iniciar sesión"
      />

      <form onSubmit={handleLogin} className="flex flex-col gap-6 ">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            icon={<Mail />}
            variant={error ? "error" : "default"}
            placeholder="Escribe tu correo"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>

          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            icon={<LockKeyhole />}
            variant={error ? "error" : "default"}
            placeholder="Escribe tu contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error?.field && (
            <InfoMessage message={error.message} variant={"error"} />
          )}

          <Link href="/auth/forgot-password" className="link text-sm text-end">
            Olvidé mi contraseña
          </Link>
        </div>

        <div className="grid gap-3">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex gap-2 items-center">
                <LoaderCircle className="animate-spin" />
                Iniciando...
              </span>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <span className="text-center text-sm">¿no tienes cuenta?</span>

          <Link href="/auth/sign-up">
            <Button variant="outline" className="w-full">
              Registrarse
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
