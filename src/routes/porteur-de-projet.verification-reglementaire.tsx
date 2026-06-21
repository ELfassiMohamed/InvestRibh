import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { VerificationReglementairePage } from "@/components/VerificationReglementaire";

export const Route = createFileRoute("/porteur-de-projet/verification-reglementaire")({
  component: VRPage,
});

function VRPage() {
  return (
    <>
      <PageHeader title="" />
      <VerificationReglementairePage />
    </>
  );
}
