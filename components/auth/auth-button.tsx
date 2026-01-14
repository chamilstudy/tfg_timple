import Link from "next/link";
import { Button } from "@/components/ui/input/button";
import { createClient } from "@/lib/supabase/server";
import { LogIn, UserRound } from "lucide-react";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      <Button asChild size="sm" aria-label="Navegar a perfil del usuario">
        <Link href="/profile">
          <UserRound />
          <span className="hidden sm:inline">Perfil</span>
        </Link>
      </Button>
    </div>
  ) : (
    <div className="flex gap-3">
      <Button
        asChild
        size="sm"
        variant={"default"}
        aria-label="Navegar a inicio de sesión"
      >
        <Link href="/auth/login">
          <LogIn />
          <span className="hidden sm:inline">Iniciar Sesión</span>
        </Link>
      </Button>
    </div>
  );
}
