"""Regenerate ALL blog images using Gemini 2.5 Flash Image (Nano Banana) — FREE tier.
27 images total: 9 posts x 3 images each (1 hero + 2 inline).
"""
import os, sys, base64, time, requests, json
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL = "gemini-2.5-flash-preview-image-generation"
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "blog")

IMAGES = [
    # ============================================================
    # POST 1: Bongkar Estimasi Biaya Website Profesional 2026
    # ============================================================
    {
        "file": "bongkar-estimasi-biaya-website-profesional-2026-panduan-lengkap-untuk-umkm-indonesia.jpg",
        "prompt": "Create a professional digital illustration of an Indonesian small business owner sitting at a desk with a laptop and calculator, reviewing a website development cost breakdown document. Papers with price estimates and website mockups are spread on the desk. Modern office setting with warm lighting. Professional, clean composition."
    },
    {
        "file": "bongkar-estimasi-biaya-website-profesional-2026-panduan-lengkap-untuk-umkm-indonesia-1.jpg",
        "prompt": "Create a professional infographic-style digital illustration showing website cost components as distinct visual icons arranged neatly: a globe icon labeled 'Domain', a server rack icon labeled 'Hosting', a monitor with color palette labeled 'Design', code brackets labeled 'Development', and a document with images labeled 'Content'. Clean flat design style with connecting lines between components. Professional colors."
    },
    {
        "file": "bongkar-estimasi-biaya-website-profesional-2026-panduan-lengkap-untuk-umkm-indonesia-2.jpg",
        "prompt": "Create a professional digital illustration showing a side-by-side comparison of two website types on screens: a simple company profile website on the left (clean, minimal) and a full e-commerce website with shopping cart on the right (complex, product grid). Price tags visible on each. Clean modern style, professional quality."
    },

    # ============================================================
    # POST 2: UMKM Meroket 2026 - Strategi Digital Marketing
    # ============================================================
    {
        "file": "umkm-meroket-2026-strategi-digital-marketing-jitu-untuk-daya-saing-maksimal.jpg",
        "prompt": "Create a professional digital illustration of an Indonesian small business owner in a modest shop, using a smartphone and laptop simultaneously. The screen shows social media analytics and a website dashboard with upward-trending graphs. Small product boxes are visible in the background. Warm, aspirational mood. Modern style."
    },
    {
        "file": "umkm-meroket-2026-strategi-digital-marketing-jitu-untuk-daya-saing-maksimal-1.jpg",
        "prompt": "Create a professional digital illustration showing a before-and-after transformation: on the left, a small isolated shop with no customers and a 'quiet' feel. On the right, the same shop now connected to digital networks - social media icons, website traffic arrows, and online orders flowing in, with more customers. Split-screen composition."
    },
    {
        "file": "umkm-meroket-2026-strategi-digital-marketing-jitu-untuk-daya-saing-maksimal-2.jpg",
        "prompt": "Create a professional digital illustration showing a digital marketing ecosystem diagram. In the center is a small business icon. Around it, interconnected modules show: SEO (magnifying glass on search), Social Media (platform icons), Content Marketing (blog/video icons), Email Marketing (envelope), and Paid Ads (megaphone). Lines connect everything. Clean flat design."
    },

    # ============================================================
    # POST 3: Landing Page Cuan - Strategi UMKM
    # ============================================================
    {
        "file": "landing-page-cuan-strategi-jitu-umkm-tarik-pelanggan-banjir-orderan.jpg",
        "prompt": "Create a professional digital illustration of a laptop screen showing a high-converting landing page design. The landing page has a bold headline, a hero image of a product, a prominent orange CTA button saying 'Order Now', customer testimonials, and a clean layout. Conversion arrows point from the page to happy customer icons. Professional quality."
    },
    {
        "file": "landing-page-cuan-strategi-jitu-umkm-tarik-pelanggan-banjir-orderan-1.jpg",
        "prompt": "Create a professional digital illustration of a smartphone and tablet side by side, both showing analytics dashboards. The screens display upward-trending line charts and bar graphs representing landing page conversion rates increasing over time. Green upward arrows emphasize growth. Clean, modern data visualization style."
    },
    {
        "file": "landing-page-cuan-strategi-jitu-umkm-tarik-pelanggan-banjir-orderan-2.jpg",
        "prompt": "Create a professional digital illustration showing a clean, annotated landing page wireframe layout. Clearly labeled sections include: 'Headline' at the top, 'Hero Image' area, a prominent 'CTA Button', 'Social Proof/Testimonials' section, and 'Contact Form' at the bottom. Clean blueprint/wireframe style with annotation labels pointing to each element."
    },

    # ============================================================
    # POST 4: Panduan Memilih Jasa Pembuatan Website
    # ============================================================
    {
        "file": "panduan-memilih-jasa-pembuatan-website-terpercaya-2026.jpg",
        "prompt": "Create a professional digital illustration of an Indonesian business owner sitting at a desk, comparing multiple website vendor portfolios on their laptop screen. The screen shows a split view of different website designs being evaluated. A notepad with a checklist is visible beside the laptop. Professional office setting with warm lighting."
    },
    {
        "file": "panduan-memilih-jasa-pembuatan-website-terpercaya-2026-1.jpg",
        "prompt": "Create a professional digital illustration of a tablet screen showing a digital evaluation checklist for choosing a website vendor. Visible checklist items include: Portfolio (checked), Client Reviews (checked), Technology Stack (unchecked), Post-launch Support (unchecked). Each item has a small icon next to it. Clean, modern UI design."
    },
    {
        "file": "panduan-memilih-jasa-pembuatan-website-terpercaya-2026-2.jpg",
        "prompt": "Create a professional digital illustration showing a handshake between a business owner and a web developer, with a signed contract document, a website mockup on a screen, and a timeline/gantt chart visible in the background. Symbolizing a professional vendor-client relationship. Warm, trustworthy mood."
    },

    # ============================================================
    # POST 5: Cara Meningkatkan Kecepatan Website
    # ============================================================
    {
        "file": "cara-meningkatkan-kecepatan-website-agar-tidak-ditinggal-pengunjung.jpg",
        "prompt": "Create a professional digital illustration of a laptop screen showing a website speed test tool (like PageSpeed Insights) with a speedometer/gauge. The gauge shows the needle moving from red (slow) to green (fast). Performance metrics are displayed below the gauge. Clean, modern dashboard design."
    },
    {
        "file": "cara-meningkatkan-kecepatan-website-agar-tidak-ditinggal-pengunjung-1.jpg",
        "prompt": "Create a professional digital illustration showing a side-by-side before-and-after comparison on two phone screens. Left phone shows a slow-loading website with a spinning loader and frustrated user face emoji. Right phone shows the same website loaded instantly with a happy face emoji and a checkmark. Clean split-screen composition."
    },
    {
        "file": "cara-meningkatkan-kecepatan-website-agar-tidak-ditinggal-pengunjung-2.jpg",
        "prompt": "Create a professional digital illustration of a server room or cloud infrastructure with CDN nodes spread across a world map. Data packets travel along glowing lines from a central server to multiple CDN edge locations around the globe. Clean, modern technical illustration style with blue and green tones."
    },

    # ============================================================
    # POST 6: Pentingnya Desain UI/UX untuk Website Bisnis
    # ============================================================
    {
        "file": "pentingnya-desain-ui-ux-untuk-website-bisnis.jpg",
        "prompt": "Create a professional digital illustration of a UI/UX designer working at a desk, drawing wireframes on a large whiteboard. Sticky notes with user flow diagrams are pinned around the wireframe. A laptop showing a finished website design is on the desk. Creative studio atmosphere with warm lighting."
    },
    {
        "file": "pentingnya-desain-ui-ux-untuk-website-bisnis-1.jpg",
        "prompt": "Create a professional digital illustration showing a side-by-side comparison of two product page designs. Left side shows a cluttered, confusing layout with inconsistent fonts, cramped spacing, and hidden buttons. Right side shows a clean, well-organized layout with clear hierarchy, prominent CTA button, and good whitespace. Clear visual contrast."
    },
    {
        "file": "pentingnya-desain-ui-ux-untuk-website-bisnis-2.jpg",
        "prompt": "Create a professional digital illustration of a smartphone showing a beautifully designed mobile-responsive website with smooth navigation, clear typography, and a floating action button. The phone is surrounded by small icons representing good UX: fast loading, intuitive navigation, accessibility, and user satisfaction. Clean modern style."
    },

    # ============================================================
    # POST 7: Website vs Media Sosial
    # ============================================================
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis.jpg",
        "prompt": "Create a professional digital illustration showing an Indonesian small business owner sitting at a modern desk. Their laptop screen is split in half - the left side shows a sleek professional business website, and the right side shows social media feeds with notifications from Instagram and TikTok. Warm office lighting, plants in the background, coffee cup on desk."
    },
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis-1.jpg",
        "prompt": "Create a professional infographic-style digital illustration comparing websites vs social media for business. Left side shows a website icon connected by lines to icons representing SEO, credibility, and brand control. Right side shows social media logos (Instagram, TikTok, Facebook) connected to icons representing engagement, reach, and community. Clean flat design."
    },
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis-2.jpg",
        "prompt": "Create a professional digital illustration of a digital marketing funnel diagram. At the top, social media platform logos (Instagram, TikTok, Facebook) feed visitors into the funnel. As it narrows downward, it leads to a professional business website showing a product page with checkout button. Arrows flow from social media through funnel to website. Clean modern design."
    },

    # ============================================================
    # POST 8: Tren Desain Website 2026
    # ============================================================
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis.jpg",
        "prompt": "Create a professional digital illustration of a modern laptop displaying a cutting-edge website with dark mode theme. The website features 3D product elements floating above the page, subtle micro-interaction animations visible as motion effects, and an AI chatbot widget in the bottom-right corner. Futuristic but clean web design."
    },
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis-1.jpg",
        "prompt": "Create a professional digital illustration showing a modern dark mode website on a laptop screen demonstrating micro-interactions: buttons with hover glow effects, scroll-triggered fade-in animations shown with motion lines, and a loading skeleton animation. An AI chatbot conversation bubble is visible in the corner. Modern web design showcase."
    },
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis-2.jpg",
        "prompt": "Create a professional digital illustration of an e-commerce website on a laptop with a 3D product viewer. A stylish sneaker shoe is shown floating and rotating in 3D space on the webpage, with swipe gesture indicators. The website interface is clean with product details, price, and add-to-cart button visible. Professional quality."
    },

    # ============================================================
    # POST 9: Panduan SEO Dasar
    # ============================================================
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis.jpg",
        "prompt": "Create a professional digital illustration of an Indonesian business owner at a desk, looking at their laptop showing Google search results. Their business website appears highlighted as the top result. Modern co-working space with warm lighting, plants, coffee cup on desk. Aspirational mood."
    },
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis-1.jpg",
        "prompt": "Create a professional digital illustration of a laptop screen displaying a keyword research tool interface similar to Google Keyword Planner. The screen shows a search bar with a keyword typed in, and a clean table listing related keywords with search volume numbers and competition level indicators. Sticky notes and notebook beside laptop on wooden desk."
    },
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis-2.jpg",
        "prompt": "Create a professional digital illustration of a laptop screen showing a Google Search Console performance dashboard. The screen displays an upward-trending line graph of clicks and impressions over time, with a data table below showing queries, clicks, impressions, and position columns. Clean desk with mouse and small succulent plant."
    },
]

def generate_image(prompt, filename, attempt=0):
    """Generate one image via Gemini API."""
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
            if attempt < 5:
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
            print(f"    No candidates")
            # Check for safety block
            if "promptFeedback" in data:
                print(f"    Feedback: {data['promptFeedback']}")
            return False

        parts = candidates[0].get("content", {}).get("parts", [])

        for part in parts:
            if "inlineData" in part:
                img_b64 = part["inlineData"]["data"]
                mime = part["inlineData"].get("mimeType", "image/png")
                img_bytes = base64.b64decode(img_b64)
                filepath = os.path.join(OUTPUT_DIR, filename)
                with open(filepath, "wb") as f:
                    f.write(img_bytes)
                size_kb = len(img_bytes) / 1024
                print(f"    Saved: {filename} ({size_kb:.0f}KB, {mime})")
                return True

        text_parts = [p.get("text", "") for p in parts if "text" in p]
        if text_parts:
            print(f"    Text instead of image: {text_parts[0][:200]}")
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
    print(f"Total images: {len(IMAGES)}")
    print(f"Free tier: 500/day, 10/min")
    print(f"Estimated time: ~{len(IMAGES) * 10 // 60} min\n")

    success = 0
    failed = []
    for i, img in enumerate(IMAGES, 1):
        print(f"\n[{i}/{len(IMAGES)}]")
        if generate_image(img["prompt"], img["file"]):
            success += 1
        else:
            failed.append(img["file"])

        # 10 req/min limit on free tier → 8s between requests
        if i < len(IMAGES):
            time.sleep(8)

    print(f"\n{'='*60}")
    print(f"Done: {success}/{len(IMAGES)} images generated")
    if failed:
        print(f"Failed ({len(failed)}):")
        for f in failed:
            print(f"  - {f}")
    print(f"Output: {OUTPUT_DIR}")
