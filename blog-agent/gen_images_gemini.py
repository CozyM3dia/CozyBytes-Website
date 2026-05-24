"""Generate blog images using Gemini 2.5 Flash Image (Nano Banana) — FREE tier."""
import os, sys, time, base64, requests, json
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL = "gemini-2.5-flash-preview-image-generation"
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "blog")

# All blog images — 3 new posts x 3 images each
IMAGES = [
    # === Blog 1: Website vs Media Sosial ===
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis.jpg",
        "prompt": "Create a professional digital illustration showing an Indonesian small business owner sitting at a modern desk. Their laptop screen is split in half - the left side shows a sleek professional business website, and the right side shows social media feeds with notifications from Instagram and TikTok. Warm office lighting, plants in the background, coffee cup on desk. Clean modern style, 16:9 aspect ratio, high quality."
    },
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis-1.jpg",
        "prompt": "Create a professional infographic-style digital illustration comparing websites vs social media for business. Left side shows a website icon connected by lines to icons representing SEO, credibility, and brand control. Right side shows social media logos (Instagram, TikTok, Facebook) connected to icons representing engagement, reach, and community. Clean flat design, modern colors, professional look. 16:9 aspect ratio."
    },
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis-2.jpg",
        "prompt": "Create a professional digital illustration of a digital marketing funnel diagram. At the top, social media platform logos (Instagram, TikTok, Facebook) are shown feeding visitors into the funnel. As the funnel narrows downward, it leads to a professional business website showing a product page with a checkout button. Arrows flow from social media through the funnel to the website. Clean modern design, professional concept art. 16:9 aspect ratio."
    },

    # === Blog 2: Tren Desain Website 2026 ===
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis.jpg",
        "prompt": "Create a professional digital illustration of a modern laptop displaying a cutting-edge website design with dark mode theme. The website features 3D product elements floating above the page, subtle micro-interaction animations visible as motion blur effects, and an AI chatbot widget in the bottom-right corner. Futuristic but clean web design, professional quality. 16:9 aspect ratio."
    },
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis-1.jpg",
        "prompt": "Create a professional digital illustration showing a modern dark mode website on a laptop screen. The website demonstrates micro-interactions: buttons with hover glow effects, scroll-triggered fade-in animations shown with motion lines, and a loading skeleton animation. An AI chatbot bubble is visible in the corner with a conversation. Modern web design showcase, clean composition. 16:9 aspect ratio."
    },
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis-2.jpg",
        "prompt": "Create a professional digital illustration of an e-commerce website displayed on a laptop, featuring a 3D product viewer. A stylish sneaker shoe is shown floating and rotating in 3D space on the webpage, with swipe gesture indicators around it. The website interface is clean and modern with product details, price, and an add-to-cart button visible. Professional concept art quality. 16:9 aspect ratio."
    },

    # === Blog 3: Panduan SEO Dasar ===
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis.jpg",
        "prompt": "Create a professional digital illustration of an Indonesian business owner sitting at a desk, looking at their laptop which shows Google search results. Their business website appears highlighted as the top search result. The scene is set in a modern co-working space with warm lighting, plants, and a coffee cup on the desk. The mood is professional and aspirational. 16:9 aspect ratio."
    },
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis-1.jpg",
        "prompt": "Create a professional digital illustration showing a laptop screen displaying a keyword research tool interface (similar to Google Keyword Planner). The screen shows a search bar with a keyword typed in Indonesian, and below it a clean table listing related keywords with search volume numbers and competition level indicators. Sticky notes and a notebook are visible beside the laptop on a wooden desk. Top-down angled view, natural office lighting. 16:9 aspect ratio."
    },
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis-2.jpg",
        "prompt": "Create a professional digital illustration of a laptop screen showing a Google Search Console dashboard. The screen displays a performance line graph with clicks and impressions trending upward over time, and a data table below showing search queries, clicks, impressions, and average position columns. Clean desk setup with a wireless mouse and a small potted succulent plant beside the laptop. Professional and detailed. 16:9 aspect ratio."
    },
]

def generate_image(prompt, filename, attempt=0):
    """Generate image via Gemini 2.5 Flash Image API."""
    print(f"  Generating: {filename}")

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE", "TEXT"],
        },
    }

    try:
        resp = requests.post(
            ENDPOINT,
            params={"key": API_KEY},
            headers={"Content-Type": "application/json"},
            json=payload,
            timeout=120,
        )

        if resp.status_code == 429:
            if attempt < 3:
                wait = 30 * (attempt + 1)
                print(f"    Rate limited, waiting {wait}s...")
                time.sleep(wait)
                return generate_image(prompt, filename, attempt + 1)
            print(f"    Max retries reached")
            return False

        if resp.status_code != 200:
            print(f"    API error {resp.status_code}: {resp.text[:300]}")
            return False

        data = resp.json()
        candidates = data.get("candidates", [])
        if not candidates:
            print(f"    No candidates in response")
            return False

        parts = candidates[0].get("content", {}).get("parts", [])

        for part in parts:
            if "inlineData" in part:
                img_b64 = part["inlineData"]["data"]
                mime = part["inlineData"].get("mimeType", "image/png")
                img_bytes = base64.b64decode(img_b64)

                # Determine extension
                ext = "jpg"
                if "png" in mime:
                    ext = "png"
                elif "webp" in mime:
                    ext = "webp"

                # Save as the target filename (always .jpg for consistency)
                filepath = os.path.join(OUTPUT_DIR, filename)
                with open(filepath, "wb") as f:
                    f.write(img_bytes)

                size_kb = len(img_bytes) / 1024
                print(f"    Saved: {filename} ({size_kb:.0f}KB, {mime})")
                return True

        # No image in response
        text_parts = [p.get("text", "") for p in parts if "text" in p]
        if text_parts:
            print(f"    Got text instead of image: {text_parts[0][:200]}")
        else:
            print(f"    No image data in response")
        return False

    except Exception as e:
        print(f"    Error: {e}")
        return False

if __name__ == "__main__":
    if not API_KEY:
        print("ERROR: GOOGLE_API_KEY not set in .env")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Model: {MODEL}")
    print(f"Generating {len(IMAGES)} images...\n")

    success = 0
    for i, img in enumerate(IMAGES, 1):
        print(f"\n[{i}/{len(IMAGES)}]")
        if generate_image(img["prompt"], img["file"]):
            success += 1

        # Rate limit: 10 req/min on free tier, so 6s delay
        if i < len(IMAGES):
            time.sleep(8)

    print(f"\n{'='*50}")
    print(f"Done: {success}/{len(IMAGES)} images generated")
    print(f"Output: {OUTPUT_DIR}")
