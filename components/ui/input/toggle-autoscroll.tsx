import { useEffect, useRef, useState } from "react";
import { Label } from "../info/label";
import { Button } from "./button";
import { Car, Pause, Rabbit, Snail, X } from "lucide-react";

const speedMap = [
  0, // muy lento (px por frame)
  0.5, // lento
  1, // medio
  2, // rápido
];

type ToggleAutoScrollProps = {
  disabled?: boolean;
};

export default function ToggleAutoscroll({ disabled }: ToggleAutoScrollProps) {
  const [speed, setSpeed] = useState(0); // 0 = pausado
  const animationRef = useRef<number | null>(null);

  // función de scroll
  const scrollStep = () => {
    if (speed > 0) {
      window.scrollBy(0, speedMap[speed]);
      animationRef.current = requestAnimationFrame(scrollStep);
    }
  };

  // start/pause autoscroll cuando cambia la velocidad
  useEffect(() => {
    if (speed > 0) {
      animationRef.current = requestAnimationFrame(scrollStep);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [speed]);
  return (
    <div className="z-10 sticky top-6 self-end">
      <Label>Autodesplazamiento</Label>
      <div className="flex flex-row flex-nowrap w-min text-sm shadow">
        <Button
          variant={speed == 0 ? "default" : "outline"}
          className="flex-1 rounded-r-none w-full border-primary"
          onClick={() => setSpeed(0)}
          disabled={disabled}
        >
          <X />
        </Button>
        <Button
          variant={speed == 1 ? "default" : "outline"}
          className="flex-1 rounded-none border-l-0 w-full border-primary"
          onClick={() => setSpeed(1)}
          disabled={disabled}
        >
          <Snail />
        </Button>
        <Button
          variant={speed == 2 ? "default" : "outline"}
          className="flex-1 rounded-none border-l-0 w-full border-primary"
          onClick={() => setSpeed(2)}
          disabled={disabled}
        >
          <Rabbit />
        </Button>
        <Button
          variant={speed == 3 ? "default" : "outline"}
          className="flex-1 rounded-l-none border-l-0 w-full border-primary"
          onClick={() => setSpeed(3)}
          disabled={disabled}
        >
          <Car />
        </Button>
      </div>
    </div>
  );
}
