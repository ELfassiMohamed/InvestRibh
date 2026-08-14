import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Search, User } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqCategories } from "@/lib/faq-immobilier.data";
import logoImage from "@/assets/place2invest_logo.png";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ Immobilier – Place2Invest" },
      {
        name: "description",
        content:
          "Toutes les réponses sur l'investissement immobilier participatif avec Place2Invest : fonctionnement, rendement, sécurité, eKYC, conformité, risques, garanties et gestion du compte.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const q = query.trim().toLocaleLowerCase();

  const filtered = useMemo(() => {
    if (!q) return faqCategories;
    return faqCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLocaleLowerCase().includes(q) ||
            item.answer.toLocaleLowerCase().includes(q),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [q]);

  const resultsCount = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="border-b border-outline-variant bg-surface-lowest">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Place2Invest" className="h-9 rounded-lg object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.home")}
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
            >
              <User className="h-4 w-4" />
              {t("common.login")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[920px] px-4 py-12 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="label-sm text-primary">{t("faq.badge")}</p>
          <h1 className="headline-lg mt-2 text-on-surface">{t("faq.title")}</h1>
          <p className="mt-3 text-on-surface-variant">{t("faq.subtitle")}</p>
        </div>

        {/* Recherche */}
        <div className="relative mb-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("faq.searchPlaceholder")}
            aria-label={t("faq.searchPlaceholder")}
            className="w-full rounded-full border border-outline-variant bg-surface-lowest py-3 pl-12 pr-4 text-sm text-on-surface shadow-elevated outline-none transition-colors placeholder:text-on-surface-variant focus:border-primary"
          />
        </div>

        {/* Navigation par catégorie */}
        <div className="mb-10 flex flex-wrap gap-2">
          {filtered.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            >
              {category.title}
            </a>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="card-elevated p-12 text-center text-on-surface-variant">
            {t("faq.searchEmpty")}
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-on-surface-variant">
              {t("faq.questions", { count: resultsCount })}
            </p>

            {filtered.map((category) => (
              <section key={category.id} id={category.id} className="mb-10 scroll-mt-8">
                <h2 className="headline-md mb-4 text-on-surface">{category.title}</h2>
                <Accordion
                  type="multiple"
                  className="card-elevated rounded-2xl bg-surface-lowest px-5 py-1"
                >
                  {category.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border-outline-variant last:border-b-0"
                    >
                      <AccordionTrigger className="py-4 text-base font-medium text-on-surface">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-on-surface-variant">
                        <div className="space-y-2">{renderFaqText(item.answer)}</div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-inverse-surface text-inverse-on-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center text-xs opacity-60 sm:px-10">
          © {new Date().getFullYear()} Place2Invest. {t("common.footer")}
        </div>
      </footer>
    </div>
  );
}

function renderFaqText(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  text.split(/\*\*(.+?)\*\*/g).forEach((part, i) => {
    if (i % 2 === 1) {
      out.push(
        <strong key={`b-${i}`} className="font-semibold text-on-surface">
          {part}
        </strong>,
      );
    } else {
      part.split(/\*(.+?)\*/g).forEach((seg, j) => {
        if (j % 2 === 1) {
          out.push(<em key={`i-${i}-${j}`}>{seg}</em>);
        } else if (seg) {
          out.push(<Fragment key={`t-${i}-${j}`}>{seg}</Fragment>);
        }
      });
    }
  });
  return out;
}
