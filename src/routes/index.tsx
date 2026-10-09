import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/pages/LandingPage.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "S.O.S Jurídico — Servicio Jurídico Oportuno y Seguro" },
      {
        name: "description",
        content:
          "Asesoría jurídica oportuna, segura y a tu alcance. Rápido, accesible y sin enredos. Consulta inicial completamente gratis.",
      },
      { property: "og:title", content: "S.O.S Jurídico — Servicio Jurídico Oportuno y Seguro" },
      {
        property: "og:description",
        content:
          "Asesoría jurídica oportuna, segura y a tu alcance. Rápido, accesible y sin enredos. Consulta inicial completamente gratis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});
