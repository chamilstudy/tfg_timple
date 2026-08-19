"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Feather, Flag, MoreHorizontal, Plus, User } from "lucide-react";

// Components
import TableToolbar from "./table-toolbar";
import TableLayout from "./table-layout";
import TableRowActions from "./table-row-actions";
import ReportDialog from "../dialog/dialogs/report-dialog";

// DTOs
import { SongRequestsDTO } from "@/lib/dto/song-request/song-requests.dto";
import SectionTitle from "../layout/section-title";
import Section from "../layout/section";
import { useAuth } from "@/contexts/auth.context";

type SongRequestsListProps = {
  rawSongRequests: SongRequestsDTO;
  isLoading?: boolean;
  showRequester?: boolean;
};

export default function SongRequestsTable({
  rawSongRequests,
  isLoading = false,
  showRequester = true,
}: SongRequestsListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);
  const [showDialog, setShowDialog] = useState("");
  const [currentRequestId, setCurrentRequestId] = useState("");

  const filterOptions = [
    "Por nombre",
    "Por autor",
    "Por más antiguo",
    "Por mas reciente",
  ];

  // Filtrado y ordenamiento
  const filteredRequests = rawSongRequests
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
      return ["song_name", "author", "requester_user_name"].some((key) => {
        const value = entry[key as keyof typeof entry];
        return typeof value === "string" && value.toLowerCase().includes(lower);
      });
    });

  useEffect(() => {}, [showDialog]);

  const { session, loading } = useAuth();

  return (
    <>
      <ReportDialog
        requestId={currentRequestId}
        show={showDialog === "report"}
        onClose={() => {
          setShowDialog("");
        }}
      />
      <Section className="flex flex-col flex-nowrap gap-3 py-16">
        {/* Header */}
        <SectionTitle
          title="Solicitudes"
          description="Canciones solicitadas y sin resolver"
        />

        {/* Toolbar */}
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          filterValue={filter}
          onFilterChange={setFilter}
          filterOptions={filterOptions}
          searchPlaceholder="Buscar canción o autor"
          disabled={isLoading}
        />

        {/* Tabla */}
        <TableLayout
          headers={["Nombre", "Autor", "Solicitante", "Publicado", ""]}
          isLoading={isLoading}
          emptyMessage="Aún no hay solicitudes"
        >
          {filteredRequests.map((request) => (
            <tr key={request.request_id} className="odd:bg-card">
              <td className="px-3 py-2 max-w-1 truncate">
                {request.song_name}
              </td>
              <td className="px-3 py-2 max-w-0.5 truncate">{request.author}</td>
              {showRequester ? (
                <td className="px-3 py-2 max-w-0.5 truncate font-bold text-primary ">
                  <Link
                    href={`/user/${request.requester_user_name}`}
                    className="link pressed"
                  >
                    @{request.requester_user_name}
                  </Link>
                </td>
              ) : (
                <td className="px-3 py-2 truncate">{request.album}</td>
              )}
              <td className="px-3 py-2 max-w-0.5 truncate">
                {request.created_at}
              </td>

              {/* Acciones agrupadas */}
              <td className="px-3 py-2  flex justify-end">
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

                        {
                          label: "Ir al perfil",
                          icon: <User className="h-[1rem]" />,
                          href: `/user/${request.requester_user_name}`,
                        },
                      ],
                    },

                    ...(session?.user.id !== request.requester_id
                      ? [
                          {
                            actions: [
                              {
                                label: "Reportar",
                                icon: <Flag className="h-[1rem]" />,
                                onClick: () => {
                                  setCurrentRequestId(request.request_id);
                                  setShowDialog("report");
                                },
                              },
                            ],
                          },
                        ]
                      : []),
                  ]}
                />
              </td>
            </tr>
          ))}
        </TableLayout>
      </Section>
    </>
  );
}
