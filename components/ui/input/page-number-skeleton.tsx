export default function PageNumberSkeleton() {
  return (
    <div className="flex flex-row flex-nowrap gap-2 w-min self-center">
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="loading-text row-span-10 aspect-square h-8"
        />
      ))}
    </div>
  );
}
