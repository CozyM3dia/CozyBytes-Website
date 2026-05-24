"""Generate Leonardo AI images for 3 new blog posts."""
import os, sys, time, requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("LEONARDO_API_KEY")
MODEL_ID = "aa77f04e-3eec-4034-9c07-d0f619684628"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "blog")

IMAGES = [
    # Blog 1: Website vs Media Sosial
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis.jpg",
        "prompt": "digital illustration of an Indonesian small business owner at a desk, laptop screen split in half showing a professional website on one side and social media feeds with notifications on the other side, modern office setting, warm lighting, realistic concept art, professional, detailed, clean composition"
    },
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis-1.jpg",
        "prompt": "digital illustration of a comparison infographic diagram, left side showing website icon connected to SEO, credibility and brand control icons, right side showing social media logos connected to engagement, reach and community icons, clean modern design, professional, detailed, flat design style"
    },
    {
        "file": "website-vs-media-sosial-mana-yang-lebih-penting-untuk-bisnis-2.jpg",
        "prompt": "digital illustration of a digital marketing funnel, top section showing social media logos Instagram TikTok Facebook feeding visitors down through the funnel, bottom section showing a professional website with checkout page, arrows flowing downward, modern clean style, professional concept art"
    },
    # Blog 2: Tren Desain Website 2026
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis.jpg",
        "prompt": "digital illustration of a modern laptop screen displaying a sleek website with dark mode theme, 3D product elements floating above the page, and an AI chatbot widget in the corner, futuristic web design, professional, detailed, clean composition, high quality concept art"
    },
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis-1.jpg",
        "prompt": "digital illustration of a laptop showing a modern dark mode website with subtle micro-interactions, hover effects on buttons, scroll-triggered animations visualized as motion lines, AI chatbot conversation bubble in corner, modern web design showcase, professional detailed"
    },
    {
        "file": "tren-desain-website-2026-yang-wajib-diketahui-pemilik-bisnis-2.jpg",
        "prompt": "digital illustration of an e-commerce website with interactive 3D product viewer, a sneaker shoe floating and rotating in 3D space on the webpage, user can see swipe gesture indicators, modern clean web interface, professional concept art, detailed, high quality"
    },
    # Blog 3: Panduan SEO Dasar
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis.jpg",
        "prompt": "digital illustration of an Indonesian small business owner sitting at a desk looking at laptop showing Google search results with their business website at top result, modern co-working space, warm lighting, coffee cup on desk, professional realistic concept art, detailed"
    },
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis-1.jpg",
        "prompt": "digital illustration of a laptop screen displaying keyword research tool interface similar to Google Keyword Planner, search bar with Indonesian keyword typed, list of related keywords with search volume numbers in clean table, sticky notes and notebook beside laptop on wooden desk, top-down angle"
    },
    {
        "file": "panduan-seo-dasar-untuk-website-bisnis-2.jpg",
        "prompt": "digital illustration of a laptop screen showing Google Search Console performance dashboard, line graph of clicks and impressions trending upward, data table with queries clicks impressions columns, clean desk with mouse and small plant, professional realistic concept art"
    },
]

def generate_image(prompt, filename):
    """Generate image via Leonardo AI."""
    print(f"  🎨 Generating: {filename}")

    # Create generation
    resp = requests.post(
        "https://cloud.leonardo.ai/api/rest/v1/generations",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={
            "prompt": prompt,
            "modelId": MODEL_ID,
            "width": 1360,
            "height": 768,
            "num_images": 1,
            "presetStyle": "CINEMATIC",
            "alchemy": True,
        },
    )

    if resp.status_code != 200:
        print(f"  ❌ API error {resp.status_code}: {resp.text[:200]}")
        return False

    gen_id = resp.json()["sdGenerationJob"]["generationId"]
    print(f"    ID: {gen_id}")

    # Poll for completion
    for attempt in range(30):
        time.sleep(10)
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
                print(f"    ✅ Saved: {filename} ({size_kb:.0f}KB)")
                return True
            else:
                print(f"    ❌ No images in response")
                return False
        elif status == "FAILED":
            print(f"    ❌ Generation failed")
            return False
        else:
            print(f"    ⏳ Status: {status} (attempt {attempt+1}/30)")

    print(f"    ❌ Timeout")
    return False

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Generating {len(IMAGES)} images...\n")

    success = 0
    for i, img in enumerate(IMAGES, 1):
        print(f"\n[{i}/{len(IMAGES)}]")
        if generate_image(img["prompt"], img["file"]):
            success += 1
        # Small delay between requests
        if i < len(IMAGES):
            time.sleep(3)

    print(f"\n{'='*50}")
    print(f"✅ {success}/{len(IMAGES)} images generated")
    print(f"📁 Output: {OUTPUT_DIR}")
