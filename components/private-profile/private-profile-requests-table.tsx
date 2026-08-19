import SongRequestDTO from "@/lib/dto/song-request/song-request.dto";
import { useState } from "react";
import { Feather, Trash, MoreHorizontal } from "lucide-react";
import TableToolbar from "../ui/table/table-toolbar";
import TableLayout from "../ui/table/table-layout";
import TableRowActions from "../ui/table/table-row-actions";
import RequestButton from "../ui/buttons/request-button";

import SectionTitle from "../ui/layout/section-title";
import Section from "../ui/layout/section";

type RequestsTableProps = {
  requestsRaw: Array<SongRequestDTO>;
  onDelete: React.Dispatch<React.SetStateAction<string>>;
  setShowDialog: (showDialog: string) => void;
  isLoading: boolean;
};

export default function PrivateProfileRequestsTable({
  requestsRaw,
  onDelete,
  setShowDialog,
  isLoading,
}: RequestsTableProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);

  // Filtrado y ordenamiento
  const filteredRequests = requestsRaw
    .slice()
    .sort((a, b) => {
      switch (filter) {
        case 0:
          return a.song_name.localeCompare(b.song_name);
        case 1:
          return a.author.localeCompare(b.author);
        case 2:
          return (
            new Date(a.created_at_raw).getTime() -
            new Date(b.created_at_raw).getTime()
          );
        default:
          return (
            new Date(b.created_at_raw).getTime() -
            new Date(a.created_at_raw).getTime()
          );
      }
    })
    .filter((entry) => {
      const lower = search.toLowerCase();
      return ["song_name", "author", "album"].some((key) => {
        const value = entry[key as keyof SongRequestDTO];
        return typeof value === "string" && value.toLowerCase().includes(lower);
      });
    });

  return (
    <Section className="p-6 py-16 gap-3 flex flex-col flex-nowrap">
      {/* Header */}
      <SectionTitle
        title="Solicitudes"
        description="Canciones solicitadas y sin resolver"
        action={<RequestButton />}
      />

      {/* Toolbar */}
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={[
          "Por nombre",
          "Por autor",
          "Por más antiguo",
          "Por más reciente",
        ]}
        searchPlaceholder="Buscar canción o autor"
        disabled={isLoading}
      />

      {/* Tabla */}
      <TableLayout
        headers={["Nombre", "Autor", "Album", "Publicado", ""]}
        isLoading={isLoading}
        emptyMessage="Aún no hay solicitudes"
      >
        {filteredRequests.map((request) => (
          <tr key={request.request_id} className="odd:bg-card">
            <td className="font-bold px-3 py-2 max-w-1 truncate">
              {request.song_name}
            </td>
            <td className="px-3 py-2 max-w-0.5 truncate">{request.author}</td>
            <td className="px-3 py-2 max-w-0.5 truncate">{request.album}</td>
            <td className="px-3 py-2 max-w-0.5 truncate">
              {request.created_at}
            </td>

            {/* Acciones agrupadas */}
            <td className="px-3 py-2 flex justify-end">
              <TableRowActions
                menuIcon={<MoreHorizontal strokeWidth={1} fill="black" />}
                actionGroups={[
                  {
                    actions: [
                      {
                        label: "Resolver",
                        icon: <Feather className="h-[1rem]" />,
                        href: `/resolve-song-request/${request.request_id}`,
                      },
                    ],
                  },
                  {
                    actions: [
                      {
                        label: "Eliminar",
                        icon: <Trash className="h-[1rem]" />,
                        onClick: () => {
                          setShowDialog("delete-request");
                          onDelete(request.request_id);
                        },
                      },
                    ],
                  },
                ]}
              />
            </td>
          </tr>
        ))}
      </TableLayout>
    </Section>
  );
}
