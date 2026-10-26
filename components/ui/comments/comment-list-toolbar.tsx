import Select from "../input/select";
import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../input/button";
import { LucideFilterX } from "lucide-react";

type CommentListToolBar = {
  isLoading: boolean;
  scrollTo: string;
};

export default function CommentListToolBar({
  isLoading,
  scrollTo,
}: CommentListToolBar) {
  const searchParams = useSearchParams();
  const setParams = new URLSearchParams(searchParams.toString());
  const sort = searchParams.get("sort");

  const router = useRouter();
  const pathname = usePathname();

  // order
  const orderOptions = ["newest", "oldest"];
  const orderNames = ["Más reciente", "Más antiguo"];

  // hooks
  const [orderValue, setOrderValue] = useState<number>(0);

  const handleOrderChange = (selection: number) => {
    setParams.set("page", "1");

    const value = orderOptions[selection];

    if (value) {
      setParams.set("sort", value);
    } else {
      setParams.delete("sort");
    }

    setOrderValue(selection);

    router.push(
      `${pathname}${setParams.toString() ? `?${setParams.toString()}` : ""}${scrollTo ? `#${scrollTo}` : ""}`,
    );
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex w-full md:flex-row flex-nowrap gap-3 flex-col items-end md:items-center justify-end">
        <div>
          <Select
            ariaLabel="Selecionar orden"
            size={"sm"}
            disabled={isLoading}
            placeholder={"Ordenar"}
            options={orderNames}
            selection={orderValue}
            onSelect={handleOrderChange}
          />
        </div>
      </div>
    </div>
  );
}
