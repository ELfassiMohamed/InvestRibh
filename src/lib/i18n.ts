import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fr from "@/locales/fr.json";
import ar from "@/locales/ar.json";

import type { Project } from "@/lib/mock-data";

export const availableLanguages = [
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
] as const;

export type LanguageCode = (typeof availableLanguages)[number]["code"];

void i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    ar: { translation: ar },
  },
  lng: "fr",
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

export function getCurrentLanguage(): LanguageCode {
  return (i18n.resolvedLanguage ?? "fr") === "ar" ? "ar" : "fr";
}

export function changeLanguage(lang: LanguageCode) {
  void i18n.changeLanguage(lang);
}

interface ProjectTranslation {
  nom?: string;
  ville?: string;
  description?: string;
  pointsForts?: string[];
  pointsVigilance?: string[];
}

const getProjectOverlay = (lang: LanguageCode, id: string): ProjectTranslation => {
  const section = (i18n.getResourceBundle(lang, "translation") as {
    projectData?: Record<string, ProjectTranslation>;
  });
  return section?.projectData?.[id] ?? {};
};

const getSharedMap = (
  lang: LanguageCode,
  kind: "categories" | "typologies" | "statuses",
): Record<string, string> => {
  const section = (i18n.getResourceBundle(lang, "translation") as {
    shared?: Record<string, Record<string, string>>;
  });
  return section?.shared?.[kind] ?? {};
};

export function translateProject(project: Project): Project {
  const lang = getCurrentLanguage();
  if (lang === "fr") return project;

  const overlay = getProjectOverlay(lang, project.id);
  const categories = getSharedMap(lang, "categories");
  const typologies = getSharedMap(lang, "typologies");
  const statuses = getSharedMap(lang, "statuses");

  return {
    ...project,
    nom: overlay.nom ?? project.nom,
    ville: overlay.ville ?? project.ville,
    description: overlay.description ?? project.description,
    categorie: (categories[project.categorie] as Project["categorie"]) ?? project.categorie,
    typologie: (typologies[project.typologie] as Project["typologie"]) ?? project.typologie,
    statut: (statuses[project.statut] as Project["statut"]) ?? project.statut,
    pointsForts: overlay.pointsForts ?? project.pointsForts,
    pointsVigilance: overlay.pointsVigilance ?? project.pointsVigilance,
  };
}

export function translateProjects(projects: Project[]): Project[] {
  return projects.map(translateProject);
}

export default i18n;
