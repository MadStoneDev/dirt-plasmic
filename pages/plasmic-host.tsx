import * as React from "react";
import { PlasmicCanvasHost } from "@plasmicapp/host";

// Register all custom components
import "../components/plasmic-components";

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}
