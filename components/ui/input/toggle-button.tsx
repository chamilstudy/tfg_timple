import { Button } from "./button";

type ToggleButtonProps = {
  options: string[];
  currentOption: string;
  size?: "default" | "sm";
  setCurrent: (option: string) => void;
  disabled: boolean;
};

export default function ToggleButton({
  options,
  currentOption,
  setCurrent,
  size,
  disabled,
}: ToggleButtonProps) {
  return (
    <div className="flex flex-row rounded overflow-hidden border border-border w-full shadow-sm">
      {options.map((option) => (
        <Button
          type="button"
          key={option}
          className="flex-1 basis-0 min-w-0 rounded-none border-none capitalize"
          variant={currentOption == option ? "default" : "outline"}
          onClick={() => setCurrent(option)}
          size={size}
          disabled={disabled}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
