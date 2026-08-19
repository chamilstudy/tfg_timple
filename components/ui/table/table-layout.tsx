import React from "react";

// Components
import TableSkeleton from "./table-skeleton";

type TableLayoutProps = {
  headers: string[]; // títulos de columnas
  children: React.ReactNode; // filas de la tabla (<tr>)
  isLoading?: boolean; // muestra skeleton si true
  emptyMessage?: string; // mensaje cuando no hay datos
};

export default function TableLayout({
  headers,
  children,
  isLoading = false,
  emptyMessage = "No hay datos",
}: TableLayoutProps) {
  return (
    <>
      {isLoading ? (
        <TableSkeleton rows={3} columns={headers.length} />
      ) : React.Children.count(children) > 0 ? (
        <table className="text-left sm:text-xs table-fixed text-nowrap text-[0.5em] w-full">
          <thead>
            <tr>
              {headers.map((title, index) => (
                <th key={index} className="px-3 py-2">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-left border-y">{children}</tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center p-6 border rounded w-full">
          {emptyMessage}
        </div>
      )}
    </>
  );
}
