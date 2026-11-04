import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  const filePath = join(process.cwd(), "docs_ANALYSIS_FINDINGS.md");
  const content = readFileSync(filePath, "utf8");
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="doctor-review-content-inventory.md"',
    },
  });
}
