import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ocean MGPS Sales & Multi Services",
    short_name: "Ocean MGPS",
    description:
      "Certified Medical Gas Pipeline Systems, hospital equipment, modular OTs, and LPG copper gas piping across India.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A1628",
    theme_color: "#0D47A1",
    icons: [
      {
        src: "/images/projects/mgps-installation.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/projects/mgps-installation.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
