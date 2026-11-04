/**
 * Content data model for the Ayurvedic Clinical Reference Website.
 * All clinical content records are traceable to the source PDF.
 *
 * Source reference rules:
 * - printedPage: page number as printed in the document footer (may restart per chapter)
 * - pdfPageIndex: 0-based index of the page in the PDF file (authoritative, never restarts)
 * These are stored separately because they may differ.
 */

export type VerificationStatus = "pending" | "verified" | "needsReview";

export type RouteType = "internal" | "external" | "other";

export type SourceReference = {
  chapter: string;
  section: string;
  printedPage?: number;
  pdfPageIndex: number;
};

export type DiseaseSection = {
  id: string;
  title: string;
  content: string; // display text (may be Hindi or English depending on locale)
  originalText?: string; // original source wording, preserved separately
  source: SourceReference[];
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
};

export type Medicine = {
  id: string;
  name: string;
  originalName?: string; // Sanskrit / Ayurvedic name as in source
  synonyms?: string[]; // verified synonyms present in source only
  dosageForm?: string;
  route: RouteType;
  diseases: string[]; // disease ids
  treatmentLevels?: string[];
  indication?: string;
  dose?: string;
  frequency?: string;
  administrationTime?: string;
  duration?: string;
  anupana?: string;
  instructions?: string;
  originalText: string; // original source wording
  source: SourceReference[];
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
};

export type TreatmentLevel = {
  id: string;
  name: string;
  indications?: string;
  clinicalContext?: string;
  internalMedicines: string[]; // medicine ids
  externalMedicines: string[]; // medicine ids
  shodhana?: string[];
  shamana?: string[];
  otherProcedures?: string[];
  dose?: string;
  frequency?: string;
  administrationTime?: string;
  duration?: string;
  anupana?: string;
  additionalInstructions?: string;
  followUp?: string;
  referralOrEscalation?: string;
  source: SourceReference[];
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
};

export type DiseaseContent = {
  id: string;
  name: string;
  ayurvedicName?: string;
  devanagari?: string;
  icd10?: string;
  icd11?: string;
  icd11Tm2?: string;
  namcCode?: string;
  description: string; // short source-derived description
  sections: DiseaseSection[];
  treatmentLevels: TreatmentLevel[];
  medicines: string[]; // medicine ids
  glossaryTerms: string[]; // glossary term ids
  pathwayId?: string;
  sourceChapter: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
};

export type GlossaryTerm = {
  id: string;
  term: string; // Sanskrit term (transliterated)
  devanagari?: string;
  transliteration?: string;
  englishMeaning: string;
  hindiMeaning?: string;
  sourceMeaning?: string; // meaning as given in source, distinguished from added explanation
  associatedDisease?: string;
  sourceSection: string;
  printedPage?: number;
  pdfPageIndex: number;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
};

export type PathwayStep = {
  id: string;
  condition: string; // original clinical condition wording
  branch?: string; // decision branch label
  nextStep?: string[]; // ids of next steps
  treatmentOrReferral?: string;
  sourceChapter: string;
  sourceSection: string;
  printedPage?: number;
  pdfPageIndex: number;
};

export type ClinicalPathway = {
  id: string;
  title: string;
  diseaseId: string;
  description: string;
  steps: PathwayStep[];
  sourceChapter: string;
  sourcePageReference: string;
  textAlternative: string; // faithful text-based representation
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
};

export type PathyaApathya = {
  id: string;
  diseaseId: string;
  pathya: string[]; // Do's
  apathya: string[]; // Don'ts
  viharaApathya?: string[];
  source: SourceReference[];
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
};

export type ReferralCriteria = {
  id: string;
  diseaseId: string;
  level: string; // "1" | "2" | "3"
  criteria: string[];
  source: SourceReference[];
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
};

export type SearchResult = {
  id: string;
  title: string;
  excerpt: string;
  category: "disease" | "medicine" | "glossary" | "section";
  chapter: string;
  sourcePage: string;
  url: string;
};

export type Language = "en" | "hi";
