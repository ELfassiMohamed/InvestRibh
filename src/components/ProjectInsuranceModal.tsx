import { useTranslation } from "react-i18next";
import { type ReactNode } from "react";
import { CheckCircle2, Info, Shield } from "lucide-react";

import type { InsuranceProduct } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectInsuranceModalProps {
  projectNom: string;
  assurance: InsuranceProduct;
  children: ReactNode;
}

function formatPrime(p: InsuranceProduct["primeAnnuelle"]) {
  const value =
    p.type === "pourcentage" ? `${p.valeur} %` : `${p.valeur.toLocaleString("fr-FR")} MAD`;
  return `${value} · ${p.base}`;
}

function formatFranchise(f: InsuranceProduct["franchise"]) {
  const value =
    f.type === "pourcentage" ? `${f.valeur} %` : `${f.valeur.toLocaleString("fr-FR")} MAD`;
  return f.unite ? `${value} ${f.unite}` : value;
}

export function ProjectInsuranceModal({
  projectNom,
  assurance,
  children,
}: ProjectInsuranceModalProps) {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg border-outline-variant bg-surface-lowest text-on-surface">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-on-surface">
            <Shield className="h-5 w-5 text-primary" />
            {t("projectDetail.insuranceModalTitle")}
          </DialogTitle>
          <DialogDescription className="text-on-surface-variant">
            {t("projectDetail.insuranceModalSub")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-on-surface">
              {assurance.nom} · {projectNom}
            </h3>
            <p className="mt-1 text-sm text-on-surface-variant">{assurance.description}</p>
          </div>

          <div className="space-y-1">
            <p className="label-sm text-on-surface-variant">{t("assurance.risqueCouvert")}</p>
            <p className="text-xs text-on-surface">{assurance.risqueCouvert}</p>
          </div>

          <div className="space-y-1.5">
            <p className="label-sm text-on-surface-variant">{t("assurance.criteresStricts")}</p>
            <ul className="space-y-1">
              {assurance.criteresStricts.map((c) => (
                <li key={c.id} className="flex items-start gap-2 text-xs text-on-surface">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                  <span>{c.libelle}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-outline-variant pt-3">
            <div>
              <p className="label-sm text-on-surface-variant">{t("assurance.primeAnnuelle")}</p>
              <p className="mt-0.5 text-xs font-medium text-on-surface">
                {formatPrime(assurance.primeAnnuelle)}
              </p>
            </div>
            <div>
              <p className="label-sm text-on-surface-variant">{t("assurance.franchise")}</p>
              <p className="mt-0.5 text-xs font-medium text-on-surface">
                {formatFranchise(assurance.franchise)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Info className="h-3.5 w-3.5 shrink-0 text-on-surface-variant" />
            <p className="text-xs text-on-surface-variant">
              {t("assurance.partenaire")} :{" "}
              <span className="font-medium text-on-surface">{assurance.partenaire}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
