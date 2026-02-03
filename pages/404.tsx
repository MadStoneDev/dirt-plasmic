import {
  PlasmicComponent,
  PlasmicRootProvider,
  ComponentRenderData,
} from "@plasmicapp/loader-nextjs";
import { GetStaticProps } from "next";
import { PLASMIC } from "@/plasmic-init";

export const getStaticProps: GetStaticProps = async () => {
  const plasmicData = await PLASMIC.maybeFetchComponentData("/404");

  return {
    props: { plasmicData: plasmicData || null },
  };
};

interface PageProps {
  plasmicData: ComponentRenderData | null;
}

export default function NotFoundPage({ plasmicData }: PageProps) {
  // If there's a 404 page in Plasmic, render it
  if (plasmicData) {
    return (
      <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
        <PlasmicComponent component={plasmicData.entryCompMetas[0].displayName} />
      </PlasmicRootProvider>
    );
  }

  // Fallback if no 404 page exists in Plasmic
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>404</h1>
      <p style={{ marginTop: "1rem", fontSize: "1.125rem", color: "#666" }}>
        Page not found
      </p>
      <a
        href="/"
        style={{
          marginTop: "2rem",
          color: "#2563eb",
          textDecoration: "underline"
        }}
      >
        Go back home
      </a>
    </div>
  );
}
