import dermatitis from "@/content/diseases/dermatitis.json";
import dermatophytosis from "@/content/diseases/dermatophytosis.json";
import psoriasis from "@/content/diseases/psoriasis.json";
import urticaria from "@/content/diseases/urticaria.json";
import vitiligo from "@/content/diseases/vitiligo.json";
import medicines from "@/content/medicines/index.json";
import glossaryFile from "@/content/glossary/index.json";
import type { DiseaseContent, GlossaryTerm } from "@/lib/content/types";

const DISEASES: Record<string, DiseaseContent> = {
  dermatitis: dermatitis as unknown as DiseaseContent,
  dermatophytosis: dermatophytosis as unknown as DiseaseContent,
  psoriasis: psoriasis as unknown as DiseaseContent,
  urticaria: urticaria as unknown as DiseaseContent,
  vitiligo: vitiligo as unknown as DiseaseContent,
};

export function loadDisease(slug: string): DiseaseContent | undefined {
  return DISEASES[slug];
}

export function loadAllDiseases(): DiseaseContent[] {
  return Object.values(DISEASES);
}

export function loadMedicines() {
  return medicines;
}

export function loadGlossary(): GlossaryTerm[] {
  return (glossaryFile as unknown as { glossary: GlossaryTerm[] }).glossary;
}
