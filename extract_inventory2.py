import pdfplumber

PDF_PATH = "/home/user/uploads/STG_Dermatological_Disorders_Ayurveda-1.pdf"

with pdfplumber.open(PDF_PATH) as pdf:
    pages = pdf.pages
    for i in range(116, len(pages)):
        text = pages[i].extract_text() or ""
        lines = [l for l in text.splitlines() if l.strip()]
        preview = " | ".join(lines[:3])[:170] if lines else "(empty)"
        print(f"PDF page index {i} | preview: {preview}")
