import { InvestigationForm } from "@/components/investigations/InvestigationForm";

export default async function EditInvestigationPage({ params }) {
  return (
    <>
      <InvestigationForm title="Editar investigación" params={params} />
    </>
  );
}
