import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/about-us",
    "/case-study",
    "/products",
    "/products/offlinetts",
    "/products/offlinetts/privacy-policy",
    "/products/offlinetts/support",
    "/products/visyn/privacy-policy",
    "/products/visyn/terms",
    "/products/visyn/support",
    "/products/visyn/data-deletion",
    "/contact-us",
  ];
  return routes.map((route) => ({
    url: `https://teampsmpv.com${route}`,
    lastModified: new Date("2026-08-06"),
    changeFrequency: route.includes("privacy-policy") ? "yearly" : "monthly",
    priority:
      route === "" ? 1 : ["/services", "/case-study", "/contact-us"].includes(route) ? 0.9 : 0.8,
  }));
}
