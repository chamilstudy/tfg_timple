import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import LogoNegative from "@/public/images/logo_negative.svg";
import { EnvVarWarning } from "../auth/env-var-warning";
import { AuthButton } from "../auth/auth-button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import { hasEnvVars } from "@/lib/utils";

const headerVariants = cva("w-full flex justify-center  h-min p-6", {
  variants: {
    variant: {
      default: "bg-background border-b border-b-card",
      negative: "bg-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type HeaderProps = {
  className?: string;
  variant?: VariantProps<typeof headerVariants>["variant"];
};

export function Header({ className, variant }: HeaderProps) {
  return (
    <header className={cn(headerVariants({ variant }), className)}>
      <div className="w-full max-w-5xl flex justify-between items-center">
        <div className="flex flex-row flex-nowrap text-sm items-center gap-6">
          {variant == "negative" ? (
            <Link href={"/"}>
              <Image
                src={LogoNegative}
                alt="Logo Timple Tabs"
                height={80}
                width={80}
              />
            </Link>
          ) : (
            <Link href={"/"}>
              <Image src={Logo} alt="Logo Timple Tabs" height={80} width={80} />
            </Link>
          )}
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </header>
  );
}
