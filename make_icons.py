import os
from PIL import Image, ImageDraw, ImageFont

def create_app_icon(size, output_path):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Scale factor based on 512 base size
    s = size / 512.0
    
    # Rounded background
    bg_radius = int(112 * s)
    draw.rounded_rectangle([0, 0, size, size], radius=bg_radius, fill=(27, 59, 95, 255))
    
    # Inner border
    b_margin = int(12 * s)
    draw.rounded_rectangle([b_margin, b_margin, size - b_margin, size - b_margin], 
                           radius=int(100 * s), outline=(255, 255, 255, 30), width=max(1, int(4 * s)))
    
    # Document paper
    doc_x1, doc_y1 = int(105 * s), int(85 * s)
    doc_x2, doc_y2 = int(395 * s), int(425 * s)
    draw.rounded_rectangle([doc_x1, doc_y1, doc_x2, doc_y2], radius=int(20 * s), fill=(255, 255, 255, 255))
    
    # Header bar
    draw.rounded_rectangle([int(130 * s), int(120 * s), int(310 * s), int(148 * s)], 
                           radius=int(6 * s), fill=(43, 114, 147, 255))
    
    # Table rows
    rows_y = [170, 200, 230, 260, 290, 320]
    for y in rows_y:
        draw.rounded_rectangle([int(130 * s), int(y * s), int(370 * s), int((y + 12) * s)], 
                               radius=int(4 * s), fill=(226, 232, 240, 255))
        draw.rounded_rectangle([int(130 * s), int(y * s), int(220 * s), int((y + 12) * s)], 
                               radius=int(4 * s), fill=(203, 213, 225, 255))
        
    # Total row
    draw.rounded_rectangle([int(130 * s), int(350 * s), int(260 * s), int(375 * s)], 
                           radius=int(6 * s), fill=(217, 225, 242, 255))
    draw.rounded_rectangle([int(275 * s), int(350 * s), int(370 * s), int(375 * s)], 
                           radius=int(6 * s), fill=(16, 124, 65, 255))

    # Badge circle bottom-right
    cx, cy = int(370 * s), int(390 * s)
    r = int(58 * s)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(16, 185, 129, 255), outline=(255, 255, 255, 255), width=max(2, int(6 * s)))
    
    # Text "Rp" inside badge
    try:
        font = ImageFont.truetype("arialbd.ttf", int(36 * s))
    except Exception:
        font = ImageFont.load_default()
        
    draw.text((cx, cy), "Rp", fill=(255, 255, 255, 255), font=font, anchor="mm")
    
    img.save(output_path, "PNG")
    print(f"Generated: {output_path} ({size}x{size})")

create_app_icon(192, "icon-192.png")
create_app_icon(512, "icon-512.png")
create_app_icon(180, "apple-touch-icon.png")
