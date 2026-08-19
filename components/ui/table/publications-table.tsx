"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRightFromSquare,
  Flag,
  MoreHorizontal,
  User,
} from "lucide-react";

// Components
import TableToolbar from "./table-toolbar";
import TableLayout from "./table-layout";
import TableRowActions from "./table-row-actions";
import ReportDialog from "../dialog/dialogs/report-dialog";

// DTOs
import PublicationDTO from "@/lib/dto/publication/publication.dto";
import Section from "../layout/section";
import SectionTitle from "../layout/section-title";

type PublicationsTableProps = {
  rawPublications: Array<PublicationDTO>;
  isLoading?: boolean;
};

export default function PublicationsTable({
  rawPublications,
  isLoading = false,
}: PublicationsTableProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);
  const [showDialog, setShowDialog] = useState("");
  const [currentPublicationId, setCurrentPublicationId] = useState("");

  const filterOptions = [
    "Por nombre",
    "Por autor",
    "Por más antiguo",
    "Por más reciente",
  ];

  // Filtrado y ordenamiento
  const filteredPublications = rawPublications
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
        const value = entry[key as keyof PublicationDTO];
        return typeof value === "string" && value.toLowerCase().includes(lower);
      });
    });

  return (
    <>
      <ReportDialog
        publicationId={currentPublicationId}
        show={showDialog === "report"}
        onClose={() => {
          setShowDialog("");
        }}
      />
      <Section className="flex flex-col flex-nowrap gap-3 py-16">
        {/* Header */}
        <SectionTitle
          title="Publicaciones"
          description="Canciones publicadas"
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
          headers={["Nombre", "Autor", "Album", "Publicado", ""]}
          isLoading={isLoading}
          emptyMessage="Aún no hay publicaciones"
        >
          {filteredPublications.map((publication) => (
            <tr key={publication.publication_id} className="odd:bg-card">
              <td className="px-3 py-2 max-w-0.5 truncate">
                <Link
                  href={`/publication/${publication.publication_id}`}
                  className="link pressed"
                >
                  {publication.song_name}
                </Link>
              </td>
              <td className="px-3 py-2 max-w-0.5 truncate">
                {publication.author}
              </td>
              <td className="px-3 py-2 max-w-0.5 truncate ">
                {publication.album}
              </td>
              <td className="px-3 py-2 max-w-0.5 truncate">
                {publication.created_at}
              </td>

              {/* Acciones */}
              <td className="px-3 py-2 flex justify-end">
                <TableRowActions
                  menuIcon={<MoreHorizontal strokeWidth={1} fill="black" />}
                  actionGroups={[
                    {
                      actions: [
                        {
                          label: "Ir a la publicación",
                          icon: <ArrowUpRightFromSquare className="h-[1rem]" />,
                          href: `/publication/${publication.publication_id}`,
                        },
                      ],
                    },
                    {
                      actions: [
                        {
                          label: "Reportar",
                          icon: <Flag className="h-[1rem]" />,
                          onClick: () => {
                            setCurrentPublicationId(publication.publication_id);
                            setShowDialog("report");
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
    </>
  );
}
