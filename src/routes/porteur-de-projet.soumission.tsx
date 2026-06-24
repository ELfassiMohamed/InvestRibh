import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Upload, Save, Send, FileText, X } from "lucide-react";
import { PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/porteur-de-projet/soumission")({
  component: SoumissionPage,
});

type Step = 1 | 2 | 3 | 4;

const steps: { num: Step; titre: string; description: string }[] = [
  { num: 1, titre: "Informations générales", description: "Identité du projet et budget" },
  { num: 2, titre: "Documents techniques", description: "Plans, permis, études" },
  { num: 3, titre: "Documents juridiques", description: "Titre, statuts SPV, autorisations" },
  { num: 4, titre: "Données financières", description: "Business plan, échéancier" },
];

function SoumissionPage() {
  const [step, setStep] = useState<Step>(1);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [data, setData] = useState({
    titre: "",
    typologie: "Résidentiel",
    ville: "",
    adresse: "",
    budget: "",
    montantRecherche: "",
  });

  return (
    <>
      <PageHeader
        title="Soumettre un projet"
        description="Constituez votre dossier étape par étape. Vous pouvez enregistrer en brouillon à tout moment."
        actions={
          <>
            <button
              onClick={() => setSuccessMsg("Brouillon enregistré avec succès.")}
              className="flex items-center gap-1.5 rounded-md border border-outline-variant px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container"
            >
              <Save className="h-4 w-4" /> Enregistrer en brouillon
            </button>
            {step === 4 && (
              <button
                onClick={() => setSuccessMsg("Projet soumis à l'analyse IA avec succès.")}
                className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container"
              >
                <Send className="h-4 w-4" /> Soumettre à l'analyse IA
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

      {/* Stepper */}
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
                <p className="text-xs font-bold text-on-surface">Étape {s.num}</p>
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
            <Field label="Titre du projet" required>
              <input
                value={data.titre}
                onChange={(e) => setData({ ...data, titre: e.target.value })}
                placeholder="Ex. Résidence Anfa Park"
                className="input"
              />
            </Field>
            <Field label="Typologie" required>
              <select
                value={data.typologie}
                onChange={(e) => setData({ ...data, typologie: e.target.value })}
                className="input"
              >
                {["Résidentiel", "Commercial & Bureaux", "Terrains & Lotissements", "Projets neufs en collecte"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Ville" required>
              <input
                value={data.ville}
                onChange={(e) => setData({ ...data, ville: e.target.value })}
                placeholder="Casablanca, Rabat, Marrakech…"
                className="input"
              />
            </Field>
            <Field label="Adresse complète">
              <input
                value={data.adresse}
                onChange={(e) => setData({ ...data, adresse: e.target.value })}
                placeholder="Quartier, rue, n°"
                className="input"
              />
            </Field>
            <Field label="Budget total (MAD)" required>
              <input
                type="number"
                value={data.budget}
                onChange={(e) => setData({ ...data, budget: e.target.value })}
                placeholder="50 000 000"
                className="input"
              />
            </Field>
            <Field label="Montant recherché (MAD)" required>
              <input
                type="number"
                value={data.montantRecherche}
                onChange={(e) => setData({ ...data, montantRecherche: e.target.value })}
                placeholder="30 000 000"
                className="input"
              />
            </Field>
            <Field label="Description du projet" full>
              <textarea
                rows={5}
                placeholder="Décrivez votre opération : programme, marché cible, calendrier, partenaires…"
                className="input"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Uploader titre="Plans architecturaux" description="DWG, PDF — max 50 Mo" />
            <Uploader titre="Permis de construire" description="PDF" />
            <Uploader titre="Étude de sol" description="PDF — datée < 24 mois" />
            <Uploader titre="Étude d'impact environnemental" description="PDF (si applicable)" />
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Uploader titre="Titre foncier purgé" description="PDF" required />
            <Uploader titre="Statuts de la SPV" description="PDF" required />
            <Uploader titre="Autorisation de lotir / construire" description="PDF" required />
            <Uploader titre="Quitus fiscal" description="PDF" />
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Uploader titre="Business plan détaillé" description="PDF, Excel" required />
            <Uploader titre="Budget prévisionnel" description="Excel" required />
            <Uploader titre="Échéancier de construction" description="PDF, MS Project" />
            <Uploader titre="Garanties et assurances" description="PDF" />
          </div>
        )}

        <div className="mt-8 flex justify-between border-t border-outline-variant/50 pt-6">
          <button
            disabled={step === 1}
            onClick={() => setStep((step - 1) as Step)}
            className="rounded-md border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container disabled:opacity-50"
          >
            Étape précédente
          </button>
          {step < 4 && (
            <button
              onClick={() => setStep((step + 1) as Step)}
              className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container"
            >
              Étape suivante
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
          <span className="text-xs font-medium">Glisser-déposer ou cliquer</span>
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
