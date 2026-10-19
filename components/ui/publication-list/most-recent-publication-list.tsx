import fetchPublicationListAction from "@/lib/domains/publication/fetch-publication-list";
import { useEffect, useState } from "react";

import PublicationListDTO from "@/lib/dto/publication/publication-list.dto";

import Link from "next/link";
import PublicationList from "./publication-list";

export default function MostRecentPublicationList() {
  return (
    <>
      <div className="w-full flex flex-col flex-nowrap gap-2">
        <h3>Publicaciones recientes</h3>
        <PublicationList maxPublications={5} />
        <Link
          href="/publication-list"
          className="link pressed w-min p-1 text-nowrap text-sm self-end"
        >
          ver más...
        </Link>
      </div>
    </>
  );
}
