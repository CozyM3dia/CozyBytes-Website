"""Remake ALL 27 blog images using Leonardo Phoenix 1.0 (latest model)."""
import os, sys, time, requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("LEONARDO_API_KEY")
MODEL_ID = "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3"  # Phoenix 1.0 — latest Leonardo model
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "blog")

IMAGES = [
    # POST 1: Bongkar Estimasi Biaya Website Profesional 2026
    {
        "file": "bongkar-estimasi-biaya-website-profesional-2026-panduan-lengkap-untuk-umkm-indonesia.jpg",
        "prompt": "digital illustration, Indonesian small business owner sitting at desk with laptop and calculator reviewing website development cost breakdown document, papers with price estimates and website mockups on desk, modern office setting, warm lighting, professional concept art, detailed, clean composition"
    },
    {
        "file": "bongkar-estimasi-biaya-website-profesional-2026-panduan-lengkap-untuk-umkm-indonesia-1.jpg",
        "prompt": "digital illustration, infographic showing website cost components as distinct icons: globe icon labeled Domain, server rack labeled Hosting, monitor with color palette labeled Design, code brackets labeled Development, document labeled Content, connected by lines, flat design style, clean professional colors"
    },
    {
        "file": "bongkar-estimasi-biaya-website-profesional-2026-panduan-lengkap-untuk-umkm-indonesia-2.jpg",
        "prompt": "digital illustration, side by side comparison of two website types on screens: simple company profile website on left versus full e-commerce website with shopping cart on right, price tags visible on each, clean modern style, professional quality"
    },

    # POST 2: UMKM Meroket 2026 - Strategi Digital Marketing
    {
        "file": "umkm-meroket-2026-strategi-digital-marketing-jitu-untuk-daya-saing-maksimal.jpg",
        "prompt": "digital illustration, Indonesian small business owner in modest shop using smartphone and laptop simultaneously showing social media analytics dashboard and upward trending graphs, small product boxes in background, warm aspirational mood, modern professional style"
    },
    {
        "file": "umkm-meroket-2026-strategi-digital-marketing-jitu-untuk-daya-saing-maksimal-1.jpg",
        "prompt": "digital illustration, before and after split screen transformation: left side small isolated shop with no customers, right side same shop now connected to digital networks with social media icons, website traffic arrows, online orders flowing in, more customers, professional concept art"
    },
    {
        "file": "umkm-meroket-2026-strategi-digital-marketing-jitu-untuk-daya-saing-maksimal-2.jpg",
        "prompt": "digital illustration, digital marketing ecosystem diagram with small business icon at center, surrounding interconnected modules showing SEO magnifying glass, social media platform logos, content marketing blog icon, email marketing envelope, paid ads megaphone, connecting lines, clean flat design"
    },

    # POST 3: Landing Page Cuan
    {
        "file": "landing-page-cuan-strategi-jitu-umkm-tarik-pelanggan-banjir-orderan.jpg",
        "prompt": "digital illustration, laptop screen showing high-converting landing page design with bold headline, hero product image, prominent orange CTA button, customer testimonials, clean layout, conversion arrows pointing to happy customer icons, professional quality"
    },
    {
        "file": "landing-page-cuan-strategi-jitu-umkm-tarik-pelanggan-banjir-orderan-1.jpg",
        "prompt": "digital illustration, smartphone and tablet side by side showing analytics dashboards with upward trending line charts and bar graphs representing landing page conversion rates increasing over time, green upward arrows, clean modern data visualization"
    },
    {
        "file": "landing-page-cuan-strategi-jitu-umkm-tarik-pelanggan-banjir-orderan-2.jpg",
        "prompt": "digital illustration, clean annotated landing page wireframe layout with labeled sections: Headline at top, Hero Image area, prominent CTA Button, Testimonials section, Contact Form at bottom, blueprint style with annotation labels pointing to each element, professional"
    },

    # POST 4: Panduan Memilih Jasa Pembuatan Website
    {
        "file": "panduan-memilih-jasa-pembuatan-website-terpercaya-2026.jpg",
        "prompt": "digital illustration, Indonesian business owner sitting at desk comparing multiple website vendor portfolios on laptop screen showing split view of different website designs being evaluated, notepad with checklist beside laptop, professional office setting warm lighting"
    },
    {
        "file": "panduan-memilih-jasa-pembuatan-website-terpercaya-2026-1.jpg",
        "prompt": "digital illustration, tablet screen showing digital vendor evaluation checklist with items Portfolio checked, Client Reviews checked, Technology Stack unchecked, Post-launch Support unchecked, each item with small icon, clean modern UI design"
    },
    {
        "file": "panduan-memilih-jasa-pembuatan-website-terpercaya-2026-2.jpg",
        "prompt": "digital illustration, professional handshake between business owner and web developer with signed contract document, website mockup on screen, and project timeline visible in background, symbolizing trustworthy vendor-client relationship, warm professional mood"
    },

    # POST 5: Cara Meningkatkan Kecepatan Website
    {
        "file": "cara-meningkatkan-kecepatan-website-agar-tidak-ditinggal-pengunjung.jpg",
        "prompt": "digital illustration, laptop screen showing website speed test tool similar to Google PageSpeed Insights with large speedometer gauge, needle moving from red slow zone to green fast zone, performance metrics displayed below, clean modern dashboard design"
    },
    {
        "file": "cara-meningkatkan-kecepatan-website-agar-tidak-ditinggal-pengunjung-1.jpg",
        "prompt": "digital illustration, side by side comparison on two phone screens: left phone shows slow loading website with spinning loader and frustrated face emoji, right phone shows same website loaded instantly with happy face emoji and checkmark, clean split-screen composition"
    },
    {
        "file": "cara-meningkatkan-kecepatan-website-agar-tidak-ditinggal-pengunjung-2.jpg",
        "prompt": "digital illustration, CDN content delivery network diagram showing central server with glowing data packet lines connecting to multiple edge server nodes spread across world map, fast data transfer visualization, clean modern technical illustration, blue and green color scheme"
    },

    # POST 6: Pentingnya Desain UI/UX
    {
        "file": "pentingnya-desain-ui-ux-untuk-website-bisnis.jpg",
        "prompt": "digital illustration, UI UX designer working at desk drawing wireframes on large whiteboard with sticky notes showing user flow diagrams, laptop on desk showing finished website design, creative studio atmosphere warm lighting, professional concept art"
    },
    {
        "file": "pentingnya-desain-ui-ux-untuk-website-bisnis-1.jpg",
        "prompt": "digital illustration, side by side comparison of two product page designs: left shows cluttered confusing layout with inconsistent fonts and hidden buttons, right shows clean well-organized layout with clear visual hierarchy prominent CTA button and good whitespace, strong visual contrast"
    },
    {
        "file": "pentingnya-desain-ui-ux-untuk-website-bisnis-2.jpg",
        "prompt": "digital illustration, smartphone showing beautifully designed mobile-responsive website with smooth navigation clear typography and floating action button, phone surrounded by small icons representing fast loading, intuitive navigation, accessibility, user satisfaction, clean modern style"
    },

    # POST 7: Website vs Media Sosial
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis.jpg",
        "prompt": "digital illustration, Indonesian small business owner at modern desk with laptop screen split in half showing professional business website on left side and social media feeds with notifications on right side, warm office lighting, plants in background, coffee cup on desk"
    },
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis-1.jpg",
        "prompt": "digital illustration, infographic comparing website vs social media for business, left side website icon connected to SEO credibility brand control icons, right side social media logos Instagram TikTok Facebook connected to engagement reach community icons, clean flat design"
    },
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis-2.jpg",
        "prompt": "digital illustration, digital marketing funnel diagram with social media platform logos at top feeding visitors into narrowing funnel, bottom leads to professional business website with checkout page, arrows flowing downward, clean modern design"
    },

    # POST 8: Tren Desain Website 2026
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis.jpg",
        "prompt": "digital illustration, modern laptop displaying cutting-edge website with dark mode theme featuring 3D floating product elements, micro-interaction animation effects, AI chatbot widget in corner, futuristic clean web design, professional quality"
    },
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis-1.jpg",
        "prompt": "digital illustration, dark mode website on laptop screen demonstrating micro-interactions: buttons with hover glow effects, scroll-triggered animations with motion lines, loading skeleton animation, AI chatbot conversation bubble in corner, modern web design showcase"
    },
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis-2.jpg",
        "prompt": "digital illustration, e-commerce website on laptop with 3D interactive product viewer showing stylish sneaker floating and rotating in 3D space with swipe gesture indicators, clean website interface with product details price and add-to-cart button, professional quality"
    },

    # POST 9: Panduan SEO Dasar
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis.jpg",
        "prompt": "digital illustration, Indonesian business owner at desk looking at laptop showing Google search results with their business website highlighted as top result, modern co-working space warm lighting plants coffee cup, professional aspirational mood"
    },
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis-1.jpg",
        "prompt": "digital illustration, laptop screen displaying keyword research tool interface similar to Google Keyword Planner, search bar with Indonesian keyword typed, clean table listing related keywords with search volume numbers and competition indicators, sticky notes and notebook beside laptop on wooden desk"
    },
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis-2.jpg",
        "prompt": "digital illustration, laptop screen showing Google Search Console performance dashboard with upward trending line graph of clicks and impressions over time, data table below showing queries clicks impressions position columns, clean desk with mouse and small succulent plant"
    },
]

def generate_image(prompt, filename, attempt=0):
    """Generate image via Leonardo Phoenix 1.0."""
    print(f"  Generating: {filename}")

    resp = requests.post(
        "https://cloud.leonardo.ai/api/rest/v1/generations",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={
            "prompt": prompt,
            "modelId": MODEL_ID,
            "width": 1472,
            "height": 832,
            "num_images": 1,
            "presetStyle": "DYNAMIC",
            "alchemy": True,
            "highResolution": True,
        },
    )

    if resp.status_code == 429:
        if attempt < 3:
            wait = 30 * (attempt + 1)
            print(f"    Rate limited, waiting {wait}s...")
            time.sleep(wait)
            return generate_image(prompt, filename, attempt + 1)
        print(f"    Max retries")
        return False

    if resp.status_code != 200:
        print(f"    API error {resp.status_code}: {resp.text[:200]}")
        return False

    gen_id = resp.json()["sdGenerationJob"]["generationId"]

    for attempt in range(40):
        time.sleep(12)
        poll = requests.get(
            f"https://cloud.leonardo.ai/api/rest/v1/generations/{gen_id}",
            headers={"Authorization": f"Bearer {API_KEY}"},
        )
        if poll.status_code != 200:
            continue

        data = poll.json().get("generations_by_pk", {})
        status = data.get("status")

        if status == "COMPLETE":
            images = data.get("generated_images", [])
            if images:
                img_url = images[0]["url"]
                img_data = requests.get(img_url).content
                filepath = os.path.join(OUTPUT_DIR, filename)
                with open(filepath, "wb") as f:
                    f.write(img_data)
                size_kb = len(img_data) / 1024
                print(f"    Saved: {filename} ({size_kb:.0f}KB)")
                return True
            print(f"    No images in response")
            return False
        elif status == "FAILED":
            print(f"    Generation failed")
            return False
        else:
            print(f"    {status} ({attempt+1}/40)...")

    print(f"    Timeout")
    return False


if __name__ == "__main__":
    if not API_KEY:
        print("ERROR: LEONARDO_API_KEY not set in .env")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Model: Leonardo Phoenix 1.0")
    print(f"Total: {len(IMAGES)} images")
    print(f"Resolution: 1472x832\n")

    success = 0
    failed = []
    for i, img in enumerate(IMAGES, 1):
        print(f"\n[{i}/{len(IMAGES)}]")
        if generate_image(img["prompt"], img["file"]):
            success += 1
        else:
            failed.append(img["file"])
        if i < len(IMAGES):
            time.sleep(4)

    print(f"\n{'='*60}")
    print(f"Done: {success}/{len(IMAGES)} images")
    if failed:
        print(f"Failed:")
        for f in failed:
            print(f"  - {f}")
