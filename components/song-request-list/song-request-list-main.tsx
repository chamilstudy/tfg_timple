"use client";

// Components
import HeroTitle from "../ui/layout/hero-title";

// DTOs
import RequestButton from "../ui/buttons/request-button";
import SongRequestList from "../ui/publication-list/song-request-list";

export default function SongRequestListMain() {
  return (
    <>
      <HeroTitle
        title="Solicitudes"
        description="Aquí encontrarás las canciones solicitadas por nuestros usuarios"
        action={<RequestButton />}
      />

      <SongRequestList showToolBar showFinds showPageNumber />
    </>
  );
}
