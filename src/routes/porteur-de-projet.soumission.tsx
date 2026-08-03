import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, Upload, Save, Send, FileText, X } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { useCreateDraft, useSubmitForReview, useSubmissionDrafts } from "@/hooks/use-queries";

export const Route = createFileRoute("/porteur-de-projet/soumission")({
  component: SoumissionPage,
});

type Step = 1 | 2 | 3 | 4;

function SoumissionPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>(1);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastDraftId, setLastDraftId] = useState<string | null>(null);
  const [data, setData] = useState({
    titre: "",
    typologie: "Résidentiel",
    ville: "",
    adresse: "",
    budget: "",
    montantRecherche: "",
  });

  const steps = [
    { num: 1 as Step, titre: t("porteur.soumissionPage.step1Title"), description: t("porteur.soumissionPage.step1Desc") },
    { num: 2 as Step, titre: t("porteur.soumissionPage.step2Title"), description: t("porteur.soumissionPage.step2Desc") },
    { num: 3 as Step, titre: t("porteur.soumissionPage.step3Title"), description: t("porteur.soumissionPage.step3Desc") },
    { num: 4 as Step, titre: t("porteur.soumissionPage.step4Title"), description: t("porteur.soumissionPage.step4Desc") },
  ];

  const createDraft = useCreateDraft();
  const submitForReview = useSubmitForReview();
  const { data: drafts } = useSubmissionDrafts();

  const handleSaveDraft = () => {
    if (!data.titre.trim() || !data.ville.trim() || !data.budget || !data.montantRecherche) {
      setErrorMsg(t("porteur.soumissionPage.erreurChamps"));
      return;
    }
    createDraft.mutate(
      {
        nom: data.titre,
        ville: data.ville,
        typologie: data.typologie,
        budget: Number(data.budget),
        montantRecherche: Number(data.montantRecherche),
      },
      {
        onSuccess: (result) => {
          setLastDraftId(result.id);
          setSuccessMsg(t("porteur.soumissionPage.succesBrouillon"));
          setErrorMsg(null);
        },
        onError: () => {
          setErrorMsg(t("porteur.soumissionPage.erreurBrouillon"));
        },
      }
    );
  };

  const handleSubmit = () => {
    if (!lastDraftId) {
      setErrorMsg(t("porteur.soumissionPage.erreurDraftManquant"));
      return;
    }
    submitForReview.mutate(lastDraftId, {
      onSuccess: () => {
        setSuccessMsg(t("porteur.soumissionPage.succesSoumission"));
        setErrorMsg(null);
        setData({ titre: "", typologie: "Résidentiel", ville: "", adresse: "", budget: "", montantRecherche: "" });
        setLastDraftId(null);
        setStep(1);
      },
      onError: () => {
        setErrorMsg(t("porteur.soumissionPage.erreurSoumission"));
      },
    });
  };

  return (
    <>
      <PageHeader
        title={t("porteur.soumissionPage.title")}
        description={t("porteur.soumissionPage.subtitle")}
        actions={
          <>
            <button
              onClick={handleSaveDraft}
              disabled={createDraft.isPending}
              className="flex items-center gap-1.5 rounded-md border border-outline-variant px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> {createDraft.isPending ? t("porteur.soumissionPage.enregistrement") : t("porteur.soumissionPage.enregistrerBrouillon")}
            </button>
            {step === 4 && (
              <button
                onClick={handleSubmit}
                disabled={submitForReview.isPending || !lastDraftId}
                className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container disabled:opacity-50"
              >
                <Send className="h-4 w-4" /> {submitForReview.isPending ? t("porteur.soumissionPage.soumissionEnCours") : t("porteur.soumissionPage.soumettreAnalyse")}
              </button>
            )}
          </>
        }
      />

      {successMsg && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3 text-sm text-success">
          <Check className="h-4 w-4 shrink-0" />
          <span className="flex-1">{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="text-success/70 hover:text-success">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
          <X className="h-4 w-4 shrink-0" />
          <span className="flex-1">{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-error/70 hover:text-error">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {drafts && drafts.length > 0 && (
        <div className="card-elevated mb-6 p-4">
          <p className="label-sm text-on-surface-variant mb-2">{t("porteur.soumissionPage.brouillonsExistants")}</p>
          <div className="flex flex-wrap gap-2">
            {drafts.map((d: any) => (
              <button
                key={d.id}
                onClick={() => {
                  setData({ titre: d.nom, ville: d.ville, typologie: d.typologie, adresse: "", budget: String(d.budget), montantRecherche: String(d.montantRecherche) });
                  setLastDraftId(d.id);
                  setSuccessMsg(t("porteur.soumissionPage.brouillonCharge", { nom: d.nom }));
                }}
                className="rounded-md border border-outline-variant px-3 py-1.5 text-xs hover:bg-surface-container"
              >
                {d.nom} ({d.statut})
              </button>
            ))}
          </div>
        </div>
      )}

      <ol className="card-elevated mb-6 grid gap-2 p-4 sm:grid-cols-4">
        {steps.map((s) => {
          const done = s.num < step;
          const active = s.num === step;
          return (
            <li
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`cursor-pointer rounded-lg border-2 p-3 transition-colors ${
                active
                  ? "border-primary bg-primary-container/10"
                  : done
                  ? "border-success/30 bg-success/5"
                  : "border-outline-variant"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-success text-on-success"
                      : active
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : s.num}
                </div>
                <p className="text-xs font-bold text-on-surface">{t("porteur.soumissionPage.etape")} {s.num}</p>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-on-surface">{s.titre}</p>
              <p className="text-xs text-on-surface-variant">{s.description}</p>
            </li>
          );
        })}
      </ol>

      <div className="card-elevated p-6 lg:p-8">
        {step === 1 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t("porteur.soumissionPage.titreProjet")} required>
              <input
                value={data.titre}
                onChange={(e) => setData({ ...data, titre: e.target.value })}
                placeholder={t("porteur.soumissionPage.titrePlaceholder")}
                className="input"
              />
            </Field>
            <Field label={t("porteur.soumissionPage.typologieLabel")} required>
              <select
                value={data.typologie}
                onChange={(e) => setData({ ...data, typologie: e.target.value })}
                className="input"
              >
                {["Résidentiel", "Commercial & Bureaux", "Terrains & Lotissements", "Projets neufs en collecte"].map((typo) => (
                  <option key={typo}>{t(`typologies.${typo}`)}</option>
                ))}
              </select>
            </Field>
            <Field label={t("porteur.soumissionPage.ville")} required>
              <input
                value={data.ville}
                onChange={(e) => setData({ ...data, ville: e.target.value })}
                placeholder={t("porteur.soumissionPage.villePlaceholder")}
                className="input"
              />
            </Field>
            <Field label={t("porteur.soumissionPage.adresseComplete")}>
              <input
                value={data.adresse}
                onChange={(e) => setData({ ...data, adresse: e.target.value })}
                placeholder={t("porteur.soumissionPage.adressePlaceholder")}
                className="input"
              />
            </Field>
            <Field label={t("porteur.soumissionPage.budgetTotal")} required>
              <input
                type="number"
                value={data.budget}
                onChange={(e) => setData({ ...data, budget: e.target.value })}
                placeholder={t("porteur.soumissionPage.budgetPlaceholder")}
                className="input"
              />
            </Field>
            <Field label={t("porteur.soumissionPage.montantRecherche")} required>
              <input
                type="number"
                value={data.montantRecherche}
                onChange={(e) => setData({ ...data, montantRecherche: e.target.value })}
                placeholder={t("porteur.soumissionPage.montantPlaceholder")}
                className="input"
              />
            </Field>
            <Field label={t("porteur.soumissionPage.descriptionProjet")} full>
              <textarea
                rows={5}
                placeholder={t("porteur.soumissionPage.descriptionPlaceholder")}
                className="input"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Uploader titre={t("porteur.soumissionPage.upload1")} description={t("porteur.soumissionPage.upload1Desc")} />
            <Uploader titre={t("porteur.soumissionPage.upload2")} description={t("porteur.soumissionPage.upload2Desc")} />
            <Uploader titre={t("porteur.soumissionPage.upload3")} description={t("porteur.soumissionPage.upload3Desc")} />
            <Uploader titre={t("porteur.soumissionPage.upload4")} description={t("porteur.soumissionPage.upload4Desc")} />
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Uploader titre={t("porteur.soumissionPage.upload5")} description={t("porteur.soumissionPage.upload2Desc")} required />
            <Uploader titre={t("porteur.soumissionPage.upload6")} description={t("porteur.soumissionPage.upload2Desc")} required />
            <Uploader titre={t("porteur.soumissionPage.upload7")} description={t("porteur.soumissionPage.upload2Desc")} required />
            <Uploader titre={t("porteur.soumissionPage.upload8")} description={t("porteur.soumissionPage.upload2Desc")} />
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Uploader titre={t("porteur.soumissionPage.upload9")} description={t("porteur.soumissionPage.upload9Desc")} required />
            <Uploader titre={t("porteur.soumissionPage.upload10")} description={t("porteur.soumissionPage.upload10Desc")} required />
            <Uploader titre={t("porteur.soumissionPage.upload11")} description={t("porteur.soumissionPage.upload11Desc")} />
            <Uploader titre={t("porteur.soumissionPage.upload12")} description={t("porteur.soumissionPage.upload2Desc")} />
          </div>
        )}

        <div className="mt-8 flex justify-between border-t border-outline-variant/50 pt-6">
          <button
            disabled={step === 1}
            onClick={() => setStep((step - 1) as Step)}
            className="rounded-md border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container disabled:opacity-50"
          >
            {t("porteur.soumissionPage.etapePrecedente")}
          </button>
          {step < 4 && (
            <button
              onClick={() => setStep((step + 1) as Step)}
              className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container"
            >
              {t("porteur.soumissionPage.etapeSuivante")}
            </button>
          )}
        </div>
      </div>

      <style>{`.input { width: 100%; border: 1px solid var(--outline-variant); border-radius: 8px; padding: 0.625rem 0.75rem; font-size: 0.875rem; background: var(--surface-container-lowest); color: var(--on-surface); outline: none; transition: border-color 150ms; }
      .input:focus { border-color: var(--primary); }`}</style>
    </>
  );
}

function Field({ label, children, required, full }: { label: string; children: React.ReactNode; required?: boolean; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-on-surface">
        {label} {required && <span className="text-error">*</span>}
      </span>
      {children}
    </label>
  );
}

function Uploader({ titre, description, required }: { titre: string; description: string; required?: boolean }) {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="rounded-xl border-2 border-dashed border-outline-variant p-5 transition-colors hover:border-primary">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-on-surface">
            {titre} {required && <span className="text-error">*</span>}
          </p>
          <p className="text-xs text-on-surface-variant">{description}</p>
        </div>
        {file && (
          <button onClick={() => setFile(null)} className="text-on-surface-variant hover:text-error">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {file ? (
        <div className="flex items-center gap-2 rounded-md bg-success/5 p-3">
          <FileText className="h-5 w-5 text-success" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-on-surface">{file.name}</p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface-container">
              <div className="h-full bg-success" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg bg-surface-low py-6 text-on-surface-variant hover:bg-surface-container">
          <Upload className="h-6 w-6" />
          <span className="text-xs font-medium">{t("porteur.soumissionPage.glisserDeposer")}</span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
    </div>
  );
}
