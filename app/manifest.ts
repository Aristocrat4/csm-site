import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gala D. — Customer Success Manager",
    short_name: "Gala D.",
    description:
      "Customer Success professional blending real sales results with hands-on SaaS/CRM engineering.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f6",
    theme_color: "#f6f7f6",
    icons: [
      { src: "/icon", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
