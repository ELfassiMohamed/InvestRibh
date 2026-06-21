import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { VerificationReglementairePage } from "@/components/VerificationReglementaire";

export const Route = createFileRoute("/investisseur/verification-reglementaire")({
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
