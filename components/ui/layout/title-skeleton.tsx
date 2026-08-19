export default function TitleSkeleton() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="loading-text w-52 text-5xl h-[1em]"></div>
      <div className="loading-text w-full h-[1em]"></div>
      <div className="loading-text w-full h-[1em]"></div>
      <div className="loading-text w-96 h-[1em]"></div>
      <div className="flex flex-row flex-nowrap gap-3">
        <div className="loading-text w-1/2 h-[1em]"></div>
        <div className="loading-text w-1/2 h-[1em]"></div>
      </div>
    </div>
  );
}
