import PublicationDTO from "./publication.dto";

export default interface PublicationListDTO {
  publication_list: Array<PublicationDTO>;
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}
