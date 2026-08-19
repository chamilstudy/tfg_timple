import { useState } from "react";
import { createPortal } from "react-dom";
import ToggleAutoscroll from "../input/toggle-autoscroll";
import ChordDiagram from "./chord-diagram";
import { ArrowDownToDot, Minus, MoveDown, MoveUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PublicationBodySkeleton() {
  return (
    <div className="flex flex-col gap-8 relative h-full w-full">
      {<ToggleAutoscroll disabled />}

      {/* scroll container */}
      <div className="flex-col overflow-x-scroll w-full h-full">
        <div className="w-full flex flex-col gap-3">
          <div className="loading-text w-full  h-[1em]"></div>
          <div className="loading-text w-full  h-[1em]"></div>
          <div className="loading-text w-full  h-[1em]"></div>
          <div className="loading-text w-full  h-[1em]"></div>
          <div className="loading-text w-full  h-[1em]"></div>
          <div className="loading-text w-full  h-[1em]"></div>
          <div className="loading-text w-full  h-[1em]"></div>
          <div className="loading-text w-full  h-[1em]"></div>
          <div className="loading-text w-full  h-[1em]"></div>
          <div className="loading-text w-96  h-[1em]"></div>
        </div>
      </div>
    </div>
  );
}
