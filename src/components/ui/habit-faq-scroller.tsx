import { useState, type CSSProperties, type ReactNode } from "react";
import { ZoomIn } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface FaqCardItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FaqCard
 * Reusable card for a single FAQ item. Clicking the card opens it zoomed in.
 */
export function FaqCard({
  question,
  answer,
  onSelect,
}: {
  question: string;
  answer: string;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative flex w-96 flex-shrink-0 cursor-pointer flex-col items-start gap-4 rounded-2xl border border-outline-variant bg-surface-lowest p-6 text-left shadow-elevated transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <ZoomIn
        className="absolute right-4 top-4 h-4 w-4 text-on-surface-variant"
        aria-hidden="true"
      />
      <h3 className="pr-8 text-xl font-bold text-on-surface">{question}</h3>
      <p className="text-base leading-relaxed text-on-surface-variant">{answer}</p>
    </button>
  );
}

interface HorizontalScrollerProps {
  children: ReactNode;
  speed?: string;
  direction?: "left" | "right";
  paused?: boolean;
}

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 * Set `paused` to stop the animation (e.g. while a card is zoomed in).
 */
export function HorizontalScroller({
  children,
  speed = "40s",
  direction = "left",
  paused = false,
}: HorizontalScrollerProps) {
  const animationClass =
    direction === "right" ? "animate-scroll-horizontal-reverse" : "animate-scroll-horizontal";

  // Inline style to set the scroll duration and pause state.
  const style = {
    "--scroll-duration": speed,
    animationPlayState: paused ? "paused" : undefined,
  } as CSSProperties;

  return (
    <div className="scroller-mask group relative w-full overflow-hidden">
      <div className={`flex ${animationClass}`} style={style}>
        <div className="flex flex-shrink-0 items-stretch justify-center gap-8 px-4">{children}</div>
        {/* duplicate for seamless loop */}
        <div
          className="flex flex-shrink-0 items-stretch justify-center gap-8 px-4"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export interface FaqRow {
  id: string;
  speed?: string;
  direction?: "left" | "right";
  faqItems: FaqCardItem[];
}

export interface FaqSectionData {
  mainTitle: string;
  mainSubtitle: string;
  rows: FaqRow[];
}

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 * Clicking a card pauses its row and zooms the card in a dialog.
 */
export function FaqSection({ data }: { data: FaqSectionData }) {
  const [active, setActive] = useState<{ rowId: string; item: FaqCardItem } | null>(null);

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 p-10">
      <div className="z-10 flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2
          className="text-5xl font-bold leading-tight text-on-surface"
          style={{ opacity: 0, animation: "fadeInUp 0.7s ease-out 0.2s forwards" }}
        >
          {data.mainTitle}
        </h2>
        <p
          className="text-lg text-on-surface-variant"
          style={{ opacity: 0, animation: "fadeInUp 0.7s ease-out 0.4s forwards" }}
        >
          {data.mainSubtitle}
        </p>
      </div>

      <div className="z-10 flex w-full flex-col gap-8">
        {data.rows.map((row) => (
          <HorizontalScroller
            key={row.id}
            speed={row.speed}
            direction={row.direction}
            paused={active?.rowId === row.id}
          >
            {row.faqItems.map((item) => (
              <FaqCard
                key={item.id}
                question={item.question}
                answer={item.answer}
                onSelect={() => setActive({ rowId: row.id, item })}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => (open ? undefined : setActive(null))}>
        <DialogContent className="max-w-2xl rounded-2xl border-outline-variant bg-surface-lowest p-6 text-on-surface sm:p-8">
          <DialogTitle className="pr-8 text-2xl font-bold text-on-surface">
            {active?.item.question}
          </DialogTitle>
          <p className="text-base leading-relaxed text-on-surface-variant">{active?.item.answer}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FaqSection;
