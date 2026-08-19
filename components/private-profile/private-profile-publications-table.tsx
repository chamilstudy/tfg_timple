import PublicationDTO from "@/lib/dto/publication/publication.dto";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRightFromSquare,
  Edit,
  Trash,
  MoreHorizontal,
} from "lucide-react";
import TableToolbar from "../ui/table/table-toolbar";
import TableLayout from "../ui/table/table-layout";
import TableRowActions from "../ui/table/table-row-actions";

import CreateButton from "../ui/buttons/create-button";
import SectionTitle from "../ui/layout/section-title";
import Section from "../ui/layout/section";

type PublicationsTableProps = {
  publicationsRaw: Array<PublicationDTO>;
  onDelete: (publication_id: string) => void;
  setShowDialog: (showDialog: string) => void;
  isLoading: boolean;
};

export default function PrivateProfilePublicationsTable({
  publicationsRaw,
  onDelete,
  isLoading,
  setShowDialog,
}: PublicationsTableProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);

  // Función para filtrar y ordenar (derivada de publicationsRaw)
  const filteredPublications = publicationsRaw
    .slice() // copia para no mutar
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
    <Section className="p-6 py-16 gap-3 flex flex-col flex-nowrap">
      {/* Header */}

      <SectionTitle
        title="Publicaciones"
        description="Canciones publicadas "
        action={<CreateButton />}
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
        emptyMessage="Aún no hay publicaciones"
      >
        {filteredPublications.map((publication) => (
          <tr key={publication.publication_id} className="odd:bg-card">
            <td className="font-bold text-primary px-3 py-2 max-w-1 truncate">
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
            <td className="px-3 py-2 max-w-0.5 truncate">
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
                      {
                        label: "Editar",
                        icon: <Edit className="h-[1rem]" />,
                        href: `/edit-publication/${publication.publication_id}`,
                      },
                    ],
                  },
                  {
                    actions: [
                      {
                        label: "Eliminar",
                        icon: <Trash className="h-[1rem]" />,
                        onClick: () => {
                          setShowDialog("delete-publication");
                          onDelete(publication.publication_id);
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
