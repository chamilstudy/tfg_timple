import PublicationListDTO from "@/lib/dto/publication/publication-list.dto";

import toPublicationDTO from "./publication.mapper";

export default function toPublicationListDTO(row: any): PublicationListDTO {
  return {
    publication_list: row.publication_list.map(toPublicationDTO),
    page: row.page,
    page_size: row.page_size,
    total: row.total,
    total_pages: row.total_pages,
  };
}
