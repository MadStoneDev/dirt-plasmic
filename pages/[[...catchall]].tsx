import {
  PlasmicComponent,
  PlasmicRootProvider,
  ComponentRenderData,
} from "@plasmicapp/loader-nextjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { PLASMIC } from "@/plasmic-init";

export const getStaticPaths: GetStaticPaths = async () => {
  const pageModules = await PLASMIC.fetchPages();
  return {
    paths: pageModules.map((mod) => ({
      params: {
        catchall: mod.path === "/" ? [] : mod.path.substring(1).split("/"),
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { catchall } = context.params ?? {};
  const plasmicPath =
    typeof catchall === "string"
      ? catchall
      : Array.isArray(catchall)
      ? `/${catchall.join("/")}`
      : "/";

  const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);

  if (!plasmicData) {
    return { notFound: true };
  }

  return {
    props: { plasmicData },
    revalidate: 60,
  };
};

interface PageProps {
  plasmicData: ComponentRenderData;
}

export default function PlasmicLoaderPage({ plasmicData }: PageProps) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      <PlasmicComponent component={plasmicData.entryCompMetas[0].displayName} />
    </PlasmicRootProvider>
  );
}
