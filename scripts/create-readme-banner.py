"""Build the README header around a real Mastered screenshot.

Usage: python scripts/create-readme-banner.py PATH_TO_RAW_MASTERED_PNG
Requires Pillow. The input matches the capture setup in docs/readme-images.md.
"""

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("capture", type=Path)
    args = parser.parse_args()
    source = Image.open(args.capture).convert("RGB")
    if source.size != (1442, 901):
        raise ValueError(f"Expected 1442x901 capture, received {source.size}")

    image = Image.new("RGB", (1600, 600), "#100E16")
    draw = ImageDraw.Draw(image)
    fonts = Path("C:/Windows/Fonts")
    regular = lambda size: ImageFont.truetype(str(fonts / "segoeui.ttf"), size)
    semibold = lambda size: ImageFont.truetype(str(fonts / "seguisb.ttf"), size)

    # Group the logo and eyebrow into one lockup above the project name.
    logo = Image.open(ROOT / "images" / "icon.png").convert("RGBA")
    logo.thumbnail((80, 80), Image.Resampling.LANCZOS)
    image.paste(logo, (60, 34), logo)
    for index, color in enumerate(["#82B1FF", "#A78BFA", "#DCE0E5"]):
        draw.line((158 + index * 35, 92, 182 + index * 35, 92), fill=color, width=3)
    draw.text((157, 57), "COLOR THEMES FOR YOUR EDITOR", font=semibold(15), fill="#9295AD")
    draw.text((60, 118), "ULTRA", font=semibold(84), fill="#DCE0E5")
    draw.text((60, 207), "INSTINCT", font=semibold(84), fill="#DCE0E5")
    draw.text((66, 333), "Sensory-first.", font=semibold(27), fill="#A78BFA")
    draw.text((66, 376), "Less noise, clearer code.", font=regular(27), fill="#B3AFC2")
    draw.text((66, 520), "SIGN  /  MASTERED  /  MASTERED LIGHT", font=semibold(15), fill="#9295AD")

    # The excerpt remains at native resolution and retains its actual colors.
    draw.rectangle((655, 179, 1536, 508), fill="#141118", outline="#353044", width=1)
    draw.text((679, 191), "MASTERED", font=semibold(14), fill="#A78BFA")
    draw.text((1510, 191), "focus.ts", anchor="ra", font=regular(14), fill="#9295AD")
    draw.line((656, 227, 1535, 227), fill="#353044", width=1)
    image.paste(source.crop((240, 270, 1120, 540)), (656, 228))
    draw.text((656, 530), "Actual VS Code capture", font=regular(14), fill="#9295AD")

    output = ROOT / "images" / "ultra-instinct-readme-banner.png"
    image.save(output, optimize=True)
    print(f"{output.name}: {image.width}x{image.height}, {output.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
