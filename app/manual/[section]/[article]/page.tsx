import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import HeroTitle from "@/components/ui/layout/hero-title";
import ManualSideNav from "@/components/manual/manual-side-nav";

import { manualData } from "@/lib/actions/utils/manual-data.util";
import Section from "@/components/ui/layout/section";

export var metadata: Metadata = {
  title: "Manual del Usuario - Timple Tabs",
  description: "Manual del usuario de Timple Tabs.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Manual del Usuario - Timple Tabs",
    description: "Manual del usuario de Timple Tabs.",
    type: "website",
    siteName: "Timple Tabs",
  },
};

type ArticleProps = {
  section: string;
  article: string;
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<ArticleProps>;
}) {
  function findArticle(sectionSlug: string, articleSlug: string) {
    const sectionData = manualData.find((s) => s.slug === sectionSlug);
    const articleData = sectionData?.articles.find(
      (a) => a.slug === articleSlug,
    );
    return { sectionData, articleData };
  }

  const { section, article } = await params;

  const { sectionData, articleData } = findArticle(section, article);

  if (!articleData || !sectionData) {
    return <div>Artículo no encontrado</div>;
  }

  metadata = {
    title: `${sectionData.title}: ${articleData.title} - Timple Tabs`,
    description: `${sectionData.title}, ${articleData.title.toLowerCase}.`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${sectionData.title}: ${articleData.title} - Timple Tabs`,
      description: `${sectionData.title}, ${articleData.title.toLowerCase}.`,
      type: "website",
      siteName: "Timple Tabs",
    },
  };

  return (
    <>
      <div className="flex flex-col min-h-dvh w-full">
        <Header />
        <div className="flex flex-col w-full justify-start sm:justify-center sm:flex-row flex-1">
          <ManualSideNav currentArticle={articleData.slug} />

          <Section className="py-16 gap-6 flex flex-col">
            <HeroTitle
              title={articleData.title}
              description={articleData.description}
            />
            <div className="flex flex-col gap-6 w-full">
              {articleData.children}
            </div>
          </Section>

          <div className="max-w-xs w-full hidden xl:inline"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
