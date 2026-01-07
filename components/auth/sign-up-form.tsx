"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, LockKeyhole, UserRound, LoaderCircle } from "lucide-react";

import { Checkbox } from "@/components/ui/input/checkbox";
import { Button } from "@/components/ui/input/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import HeroTitle from "@/components/ui/titles/hero-title";
import { InfoMessage } from "@/components/ui/input/info-message";

import { signUpAction } from "@/lib/auth/signup";
import {
  AuthErrorFields,
  AuthErrorCode,
  authErrorMap,
} from "@/lib/auth/auth-errors";

export function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<AuthErrorFields>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError({});

    if (password !== repeatPassword) {
      setError(authErrorMap[AuthErrorCode.PASSWORD_NOT_MATCH]);
      setIsLoading(false);
      return;
    }

    const result = await signUpAction({ userName, email, password });

    if ("error" in result)
      setError(authErrorMap[result.error] ?? { unknown: result.error });
    else router.push("/auth/sign-up-success");

    setIsLoading(false);
  };

  return (
    <div className="grid max-w-sm w-full gap-6 p-6 py-16">
      <HeroTitle
        title="Registrarse"
        description="Completa los siguientes campos para crear una cuenta"
      />

      <form onSubmit={handleSignUp} className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Nombre*</Label>
          <Input
            count={10 - userName.length}
            maxLength={10}
            id="username"
            type="text"
            icon={<UserRound />}
            autoComplete="username"
            value={userName}
            placeholder="Escribe tu nombre"
            onChange={(v) => setUserName(v.target.value)}
            variant={error.userName ? "error" : "default"}
            required
          />
          {error.userName && (
            <InfoMessage message={error.userName} variant="error" />
          )}
        </div>

        <div className="grid gap-2">
          <Label className="text-xs font-bold" htmlFor="email">
            Correo*
          </Label>
          <Input
            id="email"
            type="email"
            icon={<Mail />}
            autoComplete="email"
            value={email}
            placeholder="Escribe tu correo"
            onChange={(e) => setEmail(e.target.value)}
            variant={error.email ? "error" : "default"}
            required
          />
          {error.email && <InfoMessage message={error.email} variant="error" />}
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label className="text-xs font-bold" htmlFor="password">
              Contraseña*
            </Label>
          </div>

          <Input
            id="password"
            type="password"
            icon={<LockKeyhole strokeWidth={2} />}
            autoComplete="new-password"
            value={password}
            placeholder="Escribe tu contraseña"
            onChange={(e) => setPassword(e.target.value)}
            variant={error.password ? "error" : "default"}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label className="text-xs font-bold" htmlFor="repeat-password">
              Repite tu contraseña*
            </Label>
          </div>
          <Input
            id="repeat-password"
            type="password"
            icon={<LockKeyhole />}
            autoComplete="new-password"
            value={repeatPassword}
            placeholder="Repite tu contraseña"
            onChange={(e) => setRepeatPassword(e.target.value)}
            variant={error.password ? "error" : "default"}
            required
          />
          {error.password && (
            <InfoMessage message={error["password"]} variant="error" />
          )}
        </div>

        <div className="text-xs inline-flex gap-3">
          <Checkbox id="tac" name="tac" required />
          <span>
            He leído y acepto los{" "}
            <Link className="link" href="/tac" target="_black" rel="noopener">
              terminos y condiciones
            </Link>{" "}
            del servicio
          </span>
        </div>

        <div className="grid gap-3">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex gap-2 items-center">
                <LoaderCircle className="animate-spin" />
                Creando...
              </span>
            ) : (
              "Registrarse"
            )}
          </Button>

          <p className="text-center text-sm">¿ya tienes cuenta?</p>

          <Link href="/auth/login">
            <Button variant="outline" className="w-full">
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
