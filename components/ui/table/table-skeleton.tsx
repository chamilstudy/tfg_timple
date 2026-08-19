type TableSkeletonProps = {
  rows?: number; // cuántas filas ficticias mostrar
  columns?: number; // cuántas columnas ficticias mostrar
};

export default function TableSkeleton({
  rows = 5,
  columns = 3,
}: TableSkeletonProps) {
  return (
    <div className="grid grid-cols-5 w-full gap-3">
      {Array.from({ length: columns }).map((_, colIndex) => (
        <div key={`col-${colIndex}`} className="loading-text" />
      ))}

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="loading-text col-span-5" />
      ))}
    </div>
  );
}
