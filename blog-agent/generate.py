"""
Cozybytes Blog Writer — Multi-Agent System
============================================
4 agents (Planner → Writer → Editor → Illustrator) using Gemini 2.5 Flash + Serper + Leonardo AI.

Usage:
    python generate.py "topik blog kamu"
    python generate.py "topik blog" --no-image
    python generate.py --auto                    # auto-pick SEO topic
    python generate.py --auto --no-image
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
from datetime import datetime

import requests
from dotenv import load_dotenv

# ─── Config ──────────────────────────────────────────────────────────────────

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
SERPER_API_KEY = os.getenv("SERPER_API_KEY", "")
LEONARDO_API_KEY = os.getenv("LEONARDO_API_KEY", "")

GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "blog")
PUBLIC_BLOG_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "blog")

CATEGORY_COLORS = {
    "SEO": "cyan", "Marketing": "cyan", "Tips": "cyan",
    "Desain": "gold", "UI/UX": "gold",
    "Teknologi": "violet", "Development": "violet",
    "Bisnis": "emerald", "UMKM": "emerald",
}


# ─── Utilities ────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    return re.sub(r"-+", "-", text).strip("-")


def estimate_read_time(content: str) -> str:
    return f"{max(1, round(len(content.split()) / 200))} menit"


def call_gemini(prompt: str, system_instruction: str = "", retries: int = 4) -> str:
    """Call Gemini 2.5 Flash API with retry logic."""
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.85,
            "maxOutputTokens": 8192,
        },
    }
    if system_instruction:
        payload["systemInstruction"] = {"parts": [{"text": system_instruction}]}

    for attempt in range(retries):
        try:
            resp = requests.post(
                GEMINI_URL,
                params={"key": GOOGLE_API_KEY},
                json=payload,
                timeout=120,
            )
        except requests.exceptions.Timeout:
            print(f"  ⏳ Timeout, retrying ({attempt + 1}/{retries})...")
            continue

        if resp.status_code == 429:
            wait = 20 * (attempt + 1)
            print(f"  ⏳ Rate limited, waiting {wait}s ({attempt + 1}/{retries})...")
            time.sleep(wait)
            continue
        if resp.status_code >= 500:
            print(f"  ⏳ Server error {resp.status_code}, retrying...")
            time.sleep(10)
            continue

        resp.raise_for_status()
        data = resp.json()
        try:
            return data["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError):
            print(f"  ⚠ Unexpected response: {json.dumps(data, indent=2)[:500]}")
            return ""

    print("  ❌ Max retries reached")
    return ""


def search_web(query: str, num_results: int = 5) -> str:
    """Search web via Serper API."""
    if not SERPER_API_KEY:
        return "(Web search unavailable)"

    try:
        resp = requests.post(
            "https://google.serper.dev/search",
            json={"q": query, "num": num_results, "gl": "id", "hl": "id"},
            headers={"X-API-KEY": SERPER_API_KEY},
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        return f"(Search error: {e})"

    results = []
    for item in data.get("organic", [])[:num_results]:
        results.append(f"- {item.get('title', '')}: {item.get('snippet', '')} ({item.get('link', '')})")

    return "\n".join(results) if results else "(No results)"


# ─── Leonardo AI Image Generation ────────────────────────────────────────────

def generate_leonardo_image(prompt: str, filename: str, width: int = 1024, height: int = 512) -> str | None:
    """Generate image via Leonardo AI. Returns public path or None."""
    if not LEONARDO_API_KEY:
        return None

    headers = {
        "Authorization": f"Bearer {LEONARDO_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        resp = requests.post(
            "https://cloud.leonardo.ai/api/rest/v1/generations",
            json={
                "height": height, "width": width, "prompt": prompt,
                "num_images": 1,
                "modelId": "aa77f04e-3eec-4034-9c07-d0f619684628",
                "presetStyle": "CINEMATIC",
            },
            headers=headers, timeout=30,
        )
        resp.raise_for_status()
        gen_id = resp.json()["sdGenerationJob"]["generationId"]
        cost = resp.json()["sdGenerationJob"].get("cost", {}).get("amount", "?")
        print(f"    🎨 Started (${cost}): {filename}")
    except Exception as e:
        print(f"    ⚠ Leonardo error: {e}")
        return None

    # Poll for completion
    for _ in range(30):
        time.sleep(5)
        try:
            r = requests.get(
                f"https://cloud.leonardo.ai/api/rest/v1/generations/{gen_id}",
                headers={"Authorization": f"Bearer {LEONARDO_API_KEY}"}, timeout=30,
            )
            data = r.json()
            if data["generations_by_pk"]["status"] == "COMPLETE":
                img_url = data["generations_by_pk"]["generated_images"][0]["url"]
                break
        except Exception:
            pass
    else:
        print(f"    ⚠ Timeout: {filename}")
        return None

    # Download
    os.makedirs(PUBLIC_BLOG_DIR, exist_ok=True)
    img_path = os.path.join(PUBLIC_BLOG_DIR, filename)
    img_resp = requests.get(img_url, timeout=60)
    with open(img_path, "wb") as f:
        f.write(img_resp.content)

    print(f"    ✅ Saved: {filename} ({len(img_resp.content) // 1024}KB)")
    return f"/blog/{filename}"


# ─── Agent 0: SEO TOPIC FINDER ───────────────────────────────────────────────

def find_seo_topic() -> str:
    """Auto-find best SEO topic for Cozybytes website."""
    print("\n🎯 Agent 0: SEO TOPIC FINDER...")

    # Search what people look for
    search1 = search_web("jasa pembuatan website 2025 tren")
    search2 = search_web("tips digital marketing UMKM Indonesia")
    search3 = search_web("biaya pembuatan website bisnis kecil")

    # Check existing posts to avoid duplicates
    existing = []
    if os.path.exists(OUTPUT_DIR):
        for f in os.listdir(OUTPUT_DIR):
            if f.endswith(".md"):
                existing.append(f.replace(".md", "").replace("-", " "))

    prompt = f"""Kamu SEO strategist untuk Cozybytes Media (agensi web development & digital marketing Indonesia).

LAYANAN COZYBYTES:
- Pembuatan website (landing page, company profile, e-commerce)
- Digital marketing
- SEO optimization
- UI/UX design

RISET KEYWORD TERKINI:
{search1}

{search2}

{search3}

ARTIKEL YANG SUDAH ADA (jangan duplikat):
{', '.join(existing) if existing else '(belum ada)'}

TUGAS:
Pilih 1 topik blog yang PALING EFEKTIF untuk boost SEO website Cozybytes. Kriteria:
1. High search volume di Indonesia
2. Relevan dengan layanan Cozybytes
3. Bisa menarik calon klien (bukan cuma pembaca)
4. Belum ada di daftar artikel yang sudah ada

Format output (SATU BARIS SAJA):
TOPIK: [topik yang dipilih]"""

    result = call_gemini(prompt, "Kamu SEO strategist. Output satu baris saja: TOPIK: [topik]")

    # Extract topic
    match = re.search(r"TOPIK:\s*(.+)", result)
    topic = match.group(1).strip().strip('"').strip("'") if match else result.strip()

    print(f"  ✅ Selected: {topic}")
    return topic


# ─── Agent 1: PLANNER ─────────────────────────────────────────────────────────

def run_planner(topic: str) -> str:
    """Research topic and create content plan with illustration suggestions."""
    print("\n🔍 Agent 1: PLANNER — Researching & planning...")

    search_results = search_web(f"{topic} Indonesia 2025")
    search_trends = search_web(f"{topic} tips tren terbaru")

    prompt = f"""Kamu Content Planner untuk Cozybytes Media (agensi web development & digital marketing Indonesia).

TOPIK: {topic}

HASIL RISET WEB:
{search_results}

TREN TERBARU:
{search_trends}

TUGAS:
Buat content plan lengkap. Output format:

JUDUL: [judul menarik Bahasa Indonesia, tanpa tanda kutip]
KATEGORI: [pilih SATU: SEO / Marketing / Desain / Teknologi / Bisnis / Tips]
TARGET AUDIENCE: [deskripsi singkat]

OUTLINE:
1. [Heading section 1] — [poin utama]
2. [Heading section 2] — [poin utama]
3. [Heading section 3] — [poin utama]
4. [Heading section 4] — [poin utama]
5. [Kesimpulan + CTA]

SEO KEYWORDS: [5-8 keywords bahasa Indonesia]

ILUSTRASI YANG DIBUTUHKAN:
- HERO: [deskripsi gambar hero utama, abstract/konseptual]
- SECTION_1: [deskripsi ilustrasi untuk section 1, harus relevan dengan konten]
- SECTION_2: [deskripsi ilustrasi untuk section 2]

Deskripsi ilustrasi harus dalam BAHASA INGGRIS dan cocok untuk AI image generation (abstract, modern, tech aesthetic).

DATA & FAKTA:
- [fakta/statistik dari riset]
- [fakta/statistik dari riset]
- [fakta/statistik dari riset]"""

    system = (
        "Kamu content strategist berpengalaman. Target: pemilik UMKM Indonesia. "
        "Buat plan actionable + sertakan kebutuhan ilustrasi. Bahasa Indonesia."
    )

    result = call_gemini(prompt, system)
    print(f"  ✅ Plan ready ({len(result)} chars)")
    return result


# ─── Agent 2: WRITER ──────────────────────────────────────────────────────────

def run_writer(topic: str, plan: str) -> str:
    """Write blog post based on planner output."""
    print("\n✍️  Agent 2: WRITER — Writing article...")

    prompt = f"""Kamu penulis konten profesional untuk Cozybytes Media.

TOPIK: {topic}

CONTENT PLAN:
{plan}

TUGAS:
Tulis artikel blog lengkap. ATURAN:
1. Bahasa Indonesia NATURAL, conversational, seperti teman yang paham teknologi
2. JANGAN gunakan emdash (—), ganti koma/titik
3. JANGAN bahasa AI/terjemahan
4. Hook menarik di intro (pertanyaan retorikal / fakta mengejutkan)
5. Heading ## yang engaging untuk tiap section
6. Contoh nyata untuk bisnis Indonesia
7. Panjang: 1000-1500 kata
8. CTA halus ke Cozybytes Media di akhir
9. Format: pure markdown
10. Mulai dengan # [Judul]

PENTING — INLINE IMAGES:
Di antara section-section, sisipkan placeholder gambar dengan format:
![deskripsi singkat]({{{{IMG_SECTION_N}}}})

Contoh:
## Kenapa Website Penting?

Paragraf pertama...

![Ilustrasi website sebagai toko digital 24 jam]({{{{IMG_SECTION_1}}}})

Paragraf berikutnya...

Sisipkan 2-3 placeholder gambar di posisi yang natural dalam artikel.

CONTOH GAYA BENAR:
"Pernah cari nama bisnis kamu di Google tapi yang muncul malah kompetitor?"
"Website itu ibarat toko yang buka 24 jam."

GAYA SALAH:
"Dalam era digital yang semakin berkembang, penting bagi..."
"Berdasarkan analisis komprehensif, dapat disimpulkan..."

Tulis sekarang:"""

    system = (
        "Penulis blog profesional. Gaya: hangat, conversational, informatif. "
        "Target: pemilik UMKM Indonesia. Bahasa Indonesia natural. "
        "JANGAN pakai emdash. Sisipkan placeholder gambar {{{{IMG_SECTION_N}}}}."
    )

    result = call_gemini(prompt, system)
    print(f"  ✅ Draft ready ({len(result)} chars, ~{len(result.split())} words)")
    return result


# ─── Agent 3: EDITOR ──────────────────────────────────────────────────────────

def run_editor(topic: str, draft: str) -> str:
    """Polish and finalize the blog post."""
    print("\n📝 Agent 3: EDITOR — Polishing...")

    prompt = f"""Kamu editor profesional untuk Cozybytes Media.

DRAFT:
{draft}

CHECKLIST:
1. Bahasa Indonesia natural, bukan terjemahan/AI
2. Hapus SEMUA emdash (—) → ganti koma/titik
3. Heading structure logis: # judul, ## section, ### sub
4. Setiap section 2-3 paragraf engaging
5. Hook menarik di intro
6. CTA halus di akhir mengarah ke Cozybytes Media
7. Tone: hangat, teman yang paham teknologi
8. Hapus frasa AI: "di era digital ini", "secara komprehensif", "penting untuk dicatat"
9. Ganti dengan natural: "Nah,", "Simpelnya,", "Yang sering terjadi,"
10. PERTAHANKAN semua placeholder {{{{IMG_SECTION_N}}}} di posisinya — jangan hapus!

OUTPUT:
- Pure markdown tanpa code fence
- Mulai dengan # [Judul]
- Pertahankan placeholder gambar

Tulis final:"""

    system = (
        "Editor konten profesional. Poles agar natural & engaging. "
        "Output pure markdown. Bahasa Indonesia. Pertahankan placeholder gambar."
    )

    result = call_gemini(prompt, system)
    print(f"  ✅ Final version ready ({len(result)} chars)")
    return result


# ─── Agent 4: ILLUSTRATOR ────────────────────────────────────────────────────

def run_illustrator(content: str, plan: str, slug: str, category: str, skip_image: bool = False) -> tuple[str, str | None]:
    """Generate illustrations and replace placeholders in content."""
    print("\n🖼️  Agent 4: ILLUSTRATOR — Generating images...")

    if skip_image or not LEONARDO_API_KEY:
        # Remove all image placeholders
        content = re.sub(r"!\[.*?\]\(\{+IMG_SECTION_\d+\}+\)\n?", "", content)
        print("  ⚠ Skipping images")
        return content, None

    color_map = {
        "cyan": "teal and cyan", "gold": "amber and gold",
        "violet": "purple and violet", "emerald": "emerald and green",
    }
    color = CATEGORY_COLORS.get(category, "cyan")
    accent = color_map.get(color, "teal and cyan")

    # Extract illustration descriptions from plan
    illust_matches = re.findall(r"(?:HERO|SECTION_\d+):\s*(.+)", plan)

    # Find image placeholders in content
    placeholders = re.findall(r"\{+IMG_SECTION_(\d+)\}+", content)
    unique_sections = sorted(set(placeholders), key=int)

    # Generate hero image
    hero_prompt = (
        f"minimalist abstract concept art, {illust_matches[0] if illust_matches else f'blog about {slug.replace('-', ' ')}'}, "
        f"{accent} accent glow on dark background, modern tech aesthetic, cinematic, clean"
    )
    hero_path = generate_leonardo_image(hero_prompt, f"{slug}.jpg")

    # Generate section images (max 2 to save Leonardo credits)
    for i, sec_num in enumerate(unique_sections[:2]):
        desc_idx = i + 1  # +1 because index 0 is HERO
        if desc_idx < len(illust_matches):
            img_prompt = illust_matches[desc_idx]
        else:
            # Extract alt text from markdown
            pattern = r"!\[(.+?)\]\(" + r"\{+" + f"IMG_SECTION_{sec_num}" + r"\}+" + r"\)"
            alt_match = re.search(pattern, content)
            img_prompt = alt_match.group(1) if alt_match else f"illustration for section {sec_num}"

        img_prompt = (
            f"minimalist illustration, {img_prompt}, "
            f"{accent} accent on dark background, modern flat design, clean composition"
        )
        filename = f"{slug}-{sec_num}.jpg"
        img_path = generate_leonardo_image(img_prompt, filename, width=1024, height=576)

        if img_path:
            # Replace all variations of the placeholder
            placeholder_pattern = r"\{+" + f"IMG_SECTION_{sec_num}" + r"\}+"
            content = re.sub(placeholder_pattern, img_path, content)
        else:
            # Remove broken placeholder line
            remove_pattern = r"!\[.*?\]\(\{+" + f"IMG_SECTION_{sec_num}" + r"\}+\)\n?"
            content = re.sub(remove_pattern, "", content)

    # Clean remaining unreplaced placeholders
    content = re.sub(r"!\[.*?\]\(\{+IMG_SECTION_\d+\}+\)\n?", "", content)

    generated = sum(1 for s in unique_sections[:2] if f"{slug}-{s}.jpg" in content)
    print(f"  ✅ Generated: 1 hero + {generated} inline illustrations")

    return content, hero_path


# ─── Post-Processing ─────────────────────────────────────────────────────────

def clean_markdown(content: str) -> str:
    content = re.sub(r"^```(?:markdown)?\s*\n", "", content, flags=re.MULTILINE)
    content = re.sub(r"\n```\s*$", "", content, flags=re.MULTILINE)
    content = content.replace(" — ", ", ").replace("—", ", ")
    content = re.sub(r"\n{4,}", "\n\n\n", content)
    return content.strip()


def extract_metadata(plan: str, content: str) -> dict:
    title_match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    title = title_match.group(1).strip().strip("*").strip() if title_match else ""

    cat_match = re.search(r"KATEGORI:\s*(\w+)", plan)
    category = cat_match.group(1).strip() if cat_match else "Tips"
    if category not in CATEGORY_COLORS:
        category = "Tips"

    return {"title": title, "category": category}


def save_post(content: str, metadata: dict, image_path: str | None = None) -> str:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    content = clean_markdown(content)

    title = metadata.get("title", "Untitled")
    content = re.sub(r"^#\s+.+\n*", "", content, count=1, flags=re.MULTILINE)

    excerpt = ""
    for line in content.split("\n"):
        line = line.strip()
        if line and not line.startswith(("#", "-", "*", ">", "!")):
            excerpt = line[:160].replace('"', "'")
            if len(line) > 160:
                excerpt += "..."
            break

    slug = slugify(title)
    read_time = estimate_read_time(content)

    fm_lines = [
        "---",
        f'title: "{title}"',
        f'excerpt: "{excerpt}"',
        f'date: "{datetime.now().strftime("%Y-%m-%d")}"',
        f'category: "{metadata.get("category", "Tips")}"',
        f'readTime: "{read_time}"',
        f'author: "Cozybytes Media"',
    ]
    if image_path:
        fm_lines.append(f'image: "{image_path}"')
    fm_lines.append("---")

    full = "\n".join(fm_lines) + "\n\n" + content + "\n"
    path = os.path.join(OUTPUT_DIR, f"{slug}.md")

    with open(path, "w", encoding="utf-8") as f:
        f.write(full)

    return path


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print("\n📝 Cozybytes Blog Writer — Multi-Agent System (Gemini 2.5 Flash)")
        print("=" * 60)
        print("Usage:")
        print('  python generate.py "topik blog"              # specific topic')
        print('  python generate.py "topik" --no-image        # skip images')
        print('  python generate.py --auto                    # AI picks SEO topic')
        print('  python generate.py --auto --no-image         # auto topic, no images')
        sys.exit(1)

    skip_image = "--no-image" in sys.argv
    auto_mode = "--auto" in sys.argv

    if auto_mode:
        topic = find_seo_topic()
    else:
        topic = sys.argv[1]

    print(f"\n🚀 Cozybytes Blog Writer (Gemini 2.5 Flash)")
    print(f"   Topic: {topic}")
    print(f"   Images: {'skip' if skip_image else 'Leonardo AI (hero + inline)'}")
    print("=" * 60)

    # --- Agent Pipeline ---
    plan = run_planner(topic)

    # Delay between calls to avoid rate limit
    time.sleep(3)
    draft = run_writer(topic, plan)

    time.sleep(3)
    final = run_editor(topic, draft)

    # --- Extract metadata ---
    metadata = extract_metadata(plan, final)
    print(f"\n📋 Title: {metadata['title']}")
    print(f"   Category: {metadata['category']}")

    # --- Agent 4: Generate & inject illustrations ---
    slug = slugify(metadata.get("title", topic))
    final, hero_path = run_illustrator(final, plan, slug, metadata["category"], skip_image)

    # --- Save ---
    file_path = save_post(final, metadata, hero_path)
    print(f"\n{'=' * 60}")
    print(f"✅ Blog post saved: {file_path}")
    print(f"   Preview: npm run dev → /blog")
    print(f"🎉 Done!\n")


if __name__ == "__main__":
    main()
