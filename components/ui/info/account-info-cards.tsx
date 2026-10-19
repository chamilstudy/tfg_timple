import {
  ArrowRightToLine,
  BookOpenText,
  Feather,
  LogIn,
  MessageCircleQuestion,
  Plus,
  ScrollText,
  User,
  UserPlus,
} from "lucide-react";
import InfoCard from "./info-card";
import { useRouter } from "next/navigation";
import { Button } from "../input/button";
import { useAuth } from "@/contexts/auth.context";
import RequestButton from "../buttons/request-button";
import CreateButton from "../buttons/create-button";

export default function AccountInfoCards() {
  const router = useRouter();
  const session = useAuth();
  return session.session?.user ? (
    <>
      <InfoCard
        title="Crear"
        body="Puedes crear tu propia publicación, tu danos la letra y los acordes, nosotros haremos el resto"
        icon={<Plus />}
        actionComponent={<CreateButton className="w-min self-end" />}
      />
      <InfoCard
        title="Resolver"
        body="¿Quieres colaborar pero no sabes cómo? Resuelve las solicitudes de nuestros usuarios"
        icon={<Feather />}
        actionComponent={
          <Button
            size="sm"
            variant={"outline"}
            className="w-min self-end"
            onClick={() => {
              router.push("/manual");
            }}
          >
            <Feather />
            <span>Ver Solicitudes</span>
          </Button>
        }
      />
      <InfoCard
        title="Solicitar"
        body="¿La canción que buscas no se encuentra en nuestra web? Solicita a la comunidad que la añada"
        icon={<ScrollText />}
        actionComponent={<RequestButton className="w-min self-end" />}
      />
    </>
  ) : (
    <>
      <InfoCard
        title="¡Inicia sesión!"
        body="¿No estás conectado? Inicia sesión para disfrutar de todas las ventajas"
        icon={<LogIn />}
        actionComponent={
          <Button
            size="sm"
            className="w-min self-end"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            <LogIn />
            <span>Iniciar Sesión</span>
          </Button>
        }
      />
      <InfoCard
        title="¿Aún no estas registrado?"
        body="Registrate para acceder a todas las funcionalidades"
        icon={<UserPlus />}
        actionComponent={
          <Button
            size="sm"
            className="w-min self-end"
            onClick={() => {
              router.push("/manual");
            }}
          >
            <UserPlus />
            <span>Registrarse</span>
          </Button>
        }
      />
    </>
  );
}
