export const createPageUrl = (pageName) => {
  const routes = {
    Home: "/",
    Evenements: "/evenements",
    Contact: "/contact",
    About: "/about",
    Ministries: "/ministries",
    Donate: "/donate",
    Don: "/don",
    Messages: "/messages",
    Galerie: "/galerie",
    Admin: "/admin",
    PolitiqueConfidentialite: "/politique-confidentialite",
  };
  return routes[pageName] || "/";
};
