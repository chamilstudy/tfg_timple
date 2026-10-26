"use client";

import HeroTitle from "../ui/layout/hero-title";

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
