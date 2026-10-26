export default function CommentListSkeleton() {
  return (
    <div className="flex flex-col flex-nowrap gap-2 w-full">
      {Array.from({ length: 3 }).map((_, colIndex) => (
        <div key={`col-${colIndex}`} className="loading-text h-32" />
      ))}
      <div className="flex flex-row flex-nowrap items-center justify-center gap-2">
        {Array.from({ length: 5 }).map((_, colIndex) => (
          <div key={`col-${colIndex}`} className="loading-text h-8 w-8" />
        ))}
      </div>
    </div>
  );
}
