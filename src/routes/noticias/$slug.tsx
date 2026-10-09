import { createFileRoute } from "@tanstack/react-router";
import DetailPage from "@/pages/DetailPage.jsx";

export const Route = createFileRoute("/noticias/$slug")({
  head: () => ({
    meta: [
      { title: "Noticias Jurídicas — S.O.S Jurídico" },
      {
        name: "description",
        content:
          "Actualidad jurídica: lo que necesitas saber para protegerte. Noticias y análisis del equipo de S.O.S Jurídico.",
      },
      { property: "og:title", content: "Noticias Jurídicas — S.O.S Jurídico" },
      {
        property: "og:description",
        content:
          "Actualidad jurídica: lo que necesitas saber para protegerte. Noticias y análisis del equipo de S.O.S Jurídico.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: function NoticiasDetail() {
    return <DetailPage section="noticias" />;
  },
});
