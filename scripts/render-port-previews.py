"""Compare real VS Code excerpts with illustrative Windows Terminal palettes.

Run after generating ports: python scripts/render-port-previews.py
Requires Pillow and the existing README editor captures.
"""

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PALETTE = json.loads((ROOT / 'palettes/ultra-instinct.json').read_text(encoding='utf-8'))
FONT_ROOT = Path('C:/Windows/Fonts')


def font(size, mono=False, bold=False):
    face = 'consola.ttf' if mono else 'seguisb.ttf' if bold else 'segoeui.ttf'
    return ImageFont.truetype(str(FONT_ROOT / face), size)


def main():
    for key, variant in PALETTE['variants'].items():
        ui = variant['ui']
        ansi = variant['ansi']
        light = variant['appearance'] == 'light'
        background = '#EEF0F6' if light else '#100E16'
        border = '#D8D0E4' if light else '#353044'
        image = Image.new('RGB', (1600, 650), background)
        draw = ImageDraw.Draw(image)
        draw.text((40, 26), 'ULTRA INSTINCT / ' + key.upper(), font=font(15, bold=True), fill=ui['secondaryText'])
        draw.text((38, 53), 'One palette. Two workspaces.', font=font(36, bold=True), fill=ui['editorForeground'])
        draw.text((40, 119), 'VS CODE / ACTUAL CAPTURE', font=font(14, bold=True), fill=ui['secondaryText'])
        draw.text((830, 119), 'WINDOWS TERMINAL / ILLUSTRATIVE SCHEME PREVIEW', font=font(14, bold=True), fill=ui['secondaryText'])

        draw.rectangle((39, 153, 782, 565), fill=ui['editorBackground'], outline=border)
        editor = Image.open(ROOT / 'images' / f'ultra-instinct-{key}-preview.png').convert('RGB')
        # Keep native code pixels; select the same complete function in every variant.
        image.paste(editor.crop((91, 420, 796, 650)), (58, 190))
        draw.text((58, 518), 'focus.ts / same theme source', font=font(16, mono=True), fill=ui['secondaryText'])

        draw.rectangle((829, 153, 1561, 565), fill=ui['terminalBackground'], outline=border)
        draw.text((853, 174), 'PS > .\\preview.ps1', font=font(21, mono=True), fill=ui['terminalForeground'])
        draw.text((853, 219), 'Normal ANSI', font=font(17, mono=True), fill=ui['secondaryText'])
        normal = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']
        for row, colors in enumerate([normal, ['bright' + name.capitalize() for name in normal]]):
            y = 252 + row * 93
            if row:
                draw.text((853, y - 34), 'Bright ANSI', font=font(17, mono=True), fill=ui['secondaryText'])
            for index, role in enumerate(colors):
                x = 853 + index * 85
                draw.rectangle((x, y, x + 66, y + 26), fill=ansi[role], outline=border)
                draw.text((x, y + 31), str((30 if row == 0 else 90) + index), font=font(14, mono=True), fill=ui['secondaryText'])
        for x, label, role in [(853, 'Success', 'green'), (1030, 'Warning', 'yellow'), (1207, 'Error', 'red')]:
            draw.text((x, 423), label, font=font(21, mono=True), fill=ansi[role])
        draw.text((853, 465), 'src/focus.ts  /  one thing at a time', font=font(20, mono=True), fill=ui['terminalForeground'])
        draw.text((853, 512), 'PS >', font=font(21, mono=True), fill=ui['terminalForeground'])
        draw.rectangle((923, 516, 926, 538), fill=ui['terminalCursor'])
        draw.rectangle((1033, 510, 1394, 540), fill=ui['terminalSelectionBackground'])
        draw.text((1043, 512), 'Selection / visible focus', font=font(20, mono=True), fill=ui['terminalForeground'])

        draw.text((40, 601), 'Terminal panel illustrates exported colors. Run preview.ps1 in Windows Terminal to review native rendering.', font=font(16), fill=ui['secondaryText'])
        destination = ROOT / 'ports/windows-terminal/previews' / f'{key}.png'
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, optimize=True)
        print(destination.relative_to(ROOT))


if __name__ == '__main__':
    main()
