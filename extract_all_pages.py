import pdfplumber, json, os, re

PDF_PATH = "/home/user/uploads/STG_Dermatological_Disorders_Ayurveda-1.pdf"
OUT_DIR = "/home/user/extracted_pages"
os.makedirs(OUT_DIR, exist_ok=True)

results = []
with pdfplumber.open(PDF_PATH) as pdf:
    for i, page in enumerate(pdf.pages):
        text = page.extract_text() or ""
        # find printed page number - look for standalone number patterns in footer/header
        printed = None
        # Try to find page number patterns
        for line in text.splitlines():
            s = line.strip()
            # printed pages often appear as standalone number or with text
            if re.fullmatch(r'\d{1,3}', s):
                printed = int(s); break
        results.append({
            "pdf_page_index": i,
            "printed_page": printed,
            "text": text
        })
        with open(f"{OUT_DIR}/page_{i:03d}.txt", "w", encoding="utf-8") as f:
            f.write(text)

with open(f"{OUT_DIR}/index.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(results)} pages to {OUT_DIR}")
# show page number mapping summary
for r in results:
    print(f"pdf_idx={r['pdf_page_index']:3d} printed={str(r['printed_page']).rjust(3)}")
