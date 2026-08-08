import { Building2, CalendarClock, Hammer, Repeat, type LucideIcon } from "lucide-react";
import { getSlugForMode, type ExploitationMode, type Project } from "./mock-data";

/** A project whose `modes` list contains the given mode, or a legacy project with no modes. */
export function projectHasMode(project: Project, mode: ExploitationMode): boolean {
  return !project.modes || project.modes.length === 0 || project.modes.includes(mode);
}

export interface ModeMeta {
  mode: ExploitationMode;
  slug: string;
  labelKey: string;
  descriptionKey: string;
  icon: LucideIcon;
}

export const modeMeta: ModeMeta[] = [
  {
    mode: "Location longue durée",
    slug: getSlugForMode("Location longue durée"),
    labelKey: "modes.locationLongueDuree.label",
    descriptionKey: "modes.locationLongueDuree.description",
    icon: Building2,
  },
  {
    mode: "Location courte durée",
    slug: getSlugForMode("Location courte durée"),
    labelKey: "modes.locationCourteDuree.label",
    descriptionKey: "modes.locationCourteDuree.description",
    icon: CalendarClock,
  },
  {
    mode: "Revente",
    slug: getSlugForMode("Revente"),
    labelKey: "modes.revente.label",
    descriptionKey: "modes.revente.description",
    icon: Repeat,
  },
  {
    mode: "Promotion immobilière (chantier)",
    slug: getSlugForMode("Promotion immobilière (chantier)"),
    labelKey: "modes.promotionImmobiliere.label",
    descriptionKey: "modes.promotionImmobiliere.description",
    icon: Hammer,
  },
];

export function getModeMeta(mode: ExploitationMode): ModeMeta | undefined {
  return modeMeta.find((m) => m.mode === mode);
}

export function getModeMetaBySlug(slug: string): ModeMeta | undefined {
  return modeMeta.find((m) => m.slug === slug);
}
