"use client";

import fetchPublicationListAction from "@/lib/domains/publication/fetch-publication-list";
import HeroTitle from "../ui/layout/hero-title";

import { useEffect, useState } from "react";
import PublicationListDTO from "@/lib/dto/publication/publication-list.dto";

import PublicationListToolBar from "../ui/publication-list/publication-list-tool-bar";
import CreateButton from "../ui/buttons/create-button";
import PublicationList from "../ui/publication-list/publication-list";

export default function PublicationListMain() {
  return (
    <>
      <HeroTitle
        title="¡Busca canciones!"
        description="Podrás encontrar una gran variedad de canciones publicadas por nuestros usuarios"
        action={<CreateButton />}
      />

      <PublicationList showFinds showPageNumber showToolBar />
    </>
  );
}
