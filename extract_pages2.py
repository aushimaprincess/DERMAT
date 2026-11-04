import pdfplumber, json, os, re

PDF_PATH = "/home/user/uploads/STG_Dermatological_Disorders_Ayurveda-1.pdf"
OUT_DIR = "/home/user/extracted_pages"
os.makedirs(OUT_DIR, exist_ok=True)

roman_map = {'i':1,'ii':2,'iii':3,'iv':4,'v':5,'vi':6,'vii':7,'viii':8,'ix':9,'x':10,
             'xi':11,'xii':12,'xiii':13,'xiv':14,'xv':15,'xvi':16,'xvii':17,'xviii':18,
             'xix':19,'xx':20,'xxi':21,'xxii':22,'xxiii':23,'xxiv':24,'xxv':25,'xxvi':26}

def detect_printed(text):
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    # Check first and last few lines for page number
    candidates = lines[:3] + lines[-3:]
    for c in candidates:
        # Roman numeral standalone
        m = re.fullmatch(r'(?i)(x{0,3})(ix|iv|v?i{0,3})', c)
        if m and len(c) <= 4:
            return ('roman', c.lower())
        # Arabic standalone (1-3 digits)
        m = re.fullmatch(r'(\d{1,3})', c)
        if m:
            return ('arabic', int(m.group(1)))
        # Arabic at end like "Disorders 31"
        m = re.search(r'Dermatological Disorders\s+(\d{1,3})$', c)
        if m:
            return ('arabic', int(m.group(1)))
        # Arabic like "xxv Standard..." 
        m = re.match(r'(?i)(x{0,3})(ix|iv|v?i{0,3})\s', c)
        if m:
            return ('roman', c.split()[0].lower())
    return (None, None)

results = []
with pdfplumber.open(PDF_PATH) as pdf:
    for i, page in enumerate(pdf.pages):
        text = page.extract_text() or ""
        kind, val = detect_printed(text)
        if kind == 'roman':
            printed = roman_map.get(val)
        else:
            printed = val
        results.append({
            "pdf_page_index": i,
            "printed_page": printed,
            "printed_kind": kind,
            "text": text
        })
        with open(f"{OUT_DIR}/page_{i:03d}.txt", "w", encoding="utf-8") as f:
            f.write(text)

with open(f"{OUT_DIR}/index.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(results)} pages")
for r in results:
    if r['printed_page'] is not None:
        print(f"pdf_idx={r['pdf_page_index']:3d} printed={str(r['printed_page']).rjust(3)} ({r['printed_kind']})")
