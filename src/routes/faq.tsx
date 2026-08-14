import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import FaqSection from "@/components/ui/habit-faq-scroller";
import { faqCategories } from "@/lib/faq-immobilier.data";

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

  const rows = faqCategories.map((category, i) => ({
    id: category.id,
    speed: `${40 + i * 12}s`,
    direction: (i % 2 === 0 ? "left" : "right") as "left" | "right",
    faqItems: category.items.map((item) => ({
      id: item.id,
      question: item.question,
      answer: cleanFaqText(item.answer),
    })),
  }));

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-20 text-on-surface">
      <FaqSection
        data={{
          mainTitle: t("faq.title"),
          mainSubtitle: t("faq.subtitle"),
          rows,
        }}
      />
    </div>
  );
}

function cleanFaqText(text: string): string {
  return text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/`/g, "");
}
