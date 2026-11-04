import pypdf, pdfplumber, re, json, os

PDF_PATH = "/home/user/uploads/STG_Dermatological_Disorders_Ayurveda-1.pdf"

reader = pypdf.PdfReader(PDF_PATH)
total_pages = len(reader.pages)
print(f"TOTAL PDF PAGES: {total_pages}")
print("=" * 80)

# Extract text per page using pdfplumber (better for tables)
all_pages = []
with pdfplumber.open(PDF_PATH) as pdf:
    for i, page in enumerate(pdf.pages):
        text = page.extract_text() or ""
        all_pages.append(text)

# Print first 120 chars of each page to detect headings/chapters
for i, text in enumerate(all_pages):
    lines = [l for l in text.splitlines() if l.strip()]
    preview = " | ".join(lines[:3])[:160] if lines else "(empty)"
    print(f"PDF page index {i} (0-based) | printed_page ~{i+1}: {preview}")

