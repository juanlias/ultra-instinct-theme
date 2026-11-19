"""Frame matching native VS Code captures without recoloring or scaling code.

Usage: python scripts/frame-readme-images.py PATH_TO_RAW_CAPTURES
Requires Pillow. Expected files: sign.png, mastered.png, light.png (1442x901).
"""

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
VARIANTS = {
    "sign": ("Sign", "#0D1017", "#82B1FF", "#DCE0E5", "#9295AD"),
    "mastered": ("Mastered", "#141118", "#A78BFA", "#DCE0E5", "#9295AD"),
    "light": ("Mastered Light", "#EEF0F6", "#7E22CE", "#334155", "#58667A"),
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("captures", type=Path)
    args = parser.parse_args()
    fonts = Path("C:/Windows/Fonts")
    regular = fonts / "segoeui.ttf"
    semibold = fonts / "seguisb.ttf"
    for key, (name, background, accent, text, muted) in VARIANTS.items():
        source = Image.open(args.captures / f"{key}.png").convert("RGB")
        if source.size != (1442, 901):
            raise ValueError(f"{key}: expected 1442x901 capture, received {source.size}")
        # Keep the real tab and code; remove title-bar controls, pointer,
        # sidebar, status bar, and excess empty space. Code pixels stay intact.
        editor = source.crop((211, 30, 1340, 878))
        image = Image.new("RGB", (1240, 1030), background)
        draw = ImageDraw.Draw(image)
        draw.text((55, 24), "ULTRA INSTINCT", font=ImageFont.truetype(semibold, 14), fill=muted)
        draw.text((53, 45), name, font=ImageFont.truetype(semibold, 38), fill=text)
        draw.text((1184, 43), "VS CODE / TYPESCRIPT", anchor="ra", font=ImageFont.truetype(regular, 13), fill=muted)
        draw.line((55, 106, 98, 106), fill=accent, width=3)
        image.paste(editor, (55, 126))
        draw.rectangle((54, 125, 1184, 974), outline="#D8D0E4" if key == "light" else "#353044", width=1)
        draw.text((55, 996), "Sensory-first. Less noise, clearer code.", font=ImageFont.truetype(regular, 14), fill=muted)
        output = ROOT / "images" / f"ultra-instinct-{key}-preview.png"
        image.save(output, optimize=True)
        print(f"{output.name}: {image.width}x{image.height}, {output.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
