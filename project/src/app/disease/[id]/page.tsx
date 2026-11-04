import { notFound } from "next/navigation";
import { getDisease } from "@/lib/content/data";
import DiseaseView from "@/components/disease-view";
import Shell from "@/components/shell";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { id: "dermatitis" },
    { id: "dermatophytosis" },
    { id: "psoriasis" },
    { id: "urticaria" },
    { id: "vitiligo" },
  ];
}

export default async function DiseasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disease = getDisease(id);
  if (!disease) notFound();
  return (
    <Shell>
      <DiseaseView disease={disease} />
    </Shell>
  );
}
