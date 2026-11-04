import {
  loadDisease,
  loadAllDiseases,
  loadMedicines,
  loadGlossary,
} from "@/lib/content";
import type { DiseaseContent } from "@/lib/content/types";

export function getDisease(slug: string): DiseaseContent | undefined {
  return loadDisease(slug);
}

export function getAllDiseases(): DiseaseContent[] {
  return loadAllDiseases();
}

export function getMedicines() {
  return (loadMedicines() as any).medicines;
}

export async function getGlossary() {
  return loadGlossary();
}

export const DISEASE_META = [
  {
    id: "dermatitis",
    name: "Dermatitis",
    ayurvedicName: "Vicharchika",
    icd10: "L30.9",
    description:
      "Inflammatory skin condition characterized by itchy, dry, swollen skin with redness and rashes. Correlated with Vicharchika (Kshudra Kustha).",
  },
  {
    id: "dermatophytosis",
    name: "Dermatophytosis",
    ayurvedicName: "Dadru Kushtha",
    icd10: "B35.x",
    description:
      "Fungal infection of skin, hair and nails caused by dermatophytes. Correlated with Dadru (Kustha).",
  },
  {
    id: "psoriasis",
    name: "Psoriasis",
    ayurvedicName:
      "Kitibha Kushtha / Sidhma Kushtha / Eka Kushtha",
    icd10: "L40.9",
    description:
      "Chronic immune-mediated inflammatory skin disease with well-demarcated erythematous plaques with silvery scales.",
  },
  {
    id: "urticaria",
    name: "Urticaria",
    ayurvedicName: "Sheetapitta / Udarda",
    icd10: "L50.9",
    description:
      "Transient, raised, pruritic wheals surrounded by erythema. Correlated with Sheetapitta and Udarda.",
  },
  {
    id: "vitiligo",
    name: "Vitiligo",
    ayurvedicName: "Shvitra / Kilasa",
    icd10: "L80",
    description:
      "Acquired depigmenting disorder due to selective loss of melanocytes. Correlated with Shvitra.",
  },
] as const;
