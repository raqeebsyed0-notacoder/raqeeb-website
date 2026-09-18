import re

path = 'E:/raqeeb-website/src/data/portfolio.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove White Graphics from brand-identity
white_graphics_block = """  {
    id: 'white-graphics',
    title: 'White Graphics',
    slug: 'white-graphics',
    category: 'brand-identity',
    sourceFolder: 'E:\\\\\\\\Portfolio\\\\\\\\Brand Identity',
    year: null,
    client: 'White Graphics',
    description: 'Logo design for White Graphics.',
    thumbnail: '/assets/brand/white-graphics/twg-logo.webp',
    media: ['/assets/brand/white-graphics/twg-logo.webp'],
    mediaTypes: ['image'],
    originalFiles: ['E:\\\\\\\\Portfolio\\\\\\\\Brand Identity\\\\\\\\logo\\\\\\\\twg-logo.webp'],
  },

"""
content = content.replace(white_graphics_block, '')

# 2. Replace presentation projects with full page arrays
presentation_projects = [
    {
        'id': 'blaize',
        'title': 'Blaize Technical Proposal',
        'slug': 'blaize',
        'client': 'Blaize',
        'description': 'Technical proposal document design.',
        'thumbnail': '/assets/presentation/blaize/blaize-01.jpg',
        'pages': 26,
        'ratio': '960/540',
        'source': 'Blaize technical proposal.pdf',
    },
    {
        'id': 'chashmawala',
        'title': 'Dr. Chashmawala Proposal',
        'slug': 'chashmawala',
        'client': 'Dr. Chashmawala',
        'description': 'Brand proposal and visual identity presentation.',
        'thumbnail': '/assets/presentation/chashmawala/chashmawala-01.jpg',
        'pages': 9,
        'ratio': '960/540',
        'source': 'dr-chashmawala-proposal-light.pdf',
    },
    {
        'id': 'flowserve',
        'title': 'Flowserve Event Presentation',
        'slug': 'flowserve',
        'client': 'Flowserve',
        'description': 'Event presentation design for Flowserve.',
        'thumbnail': '/assets/presentation/flowserve/flowserve-01.jpg',
        'pages': 39,
        'ratio': '1191/842',
        'source': 'FLOWSERVE EVENT PRESENTATION.pdf',
    },
    {
        'id': 'jalal',
        'title': 'Jalal Event Presentation',
        'slug': 'jalal',
        'client': 'Jalal',
        'description': 'Event presentation and accompanying A4 booklet design.',
        'thumbnail': '/assets/presentation/jalal/cover.jpg',
        'pages': 12,
        'ratio': '842/595',
        'source': 'JALAL EVENT PRESENTATION.pdf',
        'extra_source': 'Size A4 Booklet Jalal.pdf',
    },
    {
        'id': 'shafa-al-shams',
        'title': 'Shafa Al Shams',
        'slug': 'shafa-al-shams',
        'client': 'Shafa Al Shams',
        'description': 'Presentation deck for Shafa Al Shams.',
        'thumbnail': '/assets/presentation/shafa-al-shams/cover.jpg',
        'pages': 4,
        'ratio': '960/540',
        'source': 'Shafa al shams.pdf',
    },
    {
        'id': 'stage-nine',
        'title': 'Stage Nine',
        'slug': 'stage-nine',
        'client': 'Stage Nine',
        'description': 'Brand proposal and visual system presentation.',
        'thumbnail': '/assets/presentation/stage-nine/stage-nine-01.jpg',
        'pages': 16,
        'ratio': '960/540',
        'source': 'Stage Nine.pdf',
    },
    {
        'id': 'trillium',
        'title': 'Trillium Event Proposal',
        'slug': 'trillium',
        'client': 'Trillium',
        'description': 'Event proposal presentation for Trillium.',
        'thumbnail': '/assets/presentation/trillium/trillium-01.jpg',
        'pages': 12,
        'ratio': '1191/842',
        'source': 'TRILLIUM EVENT PROPOSAL.pdf',
    },
    {
        'id': 'white-graphics-brochure',
        'title': 'White Graphics Brochure',
        'slug': 'white-graphics-brochure',
        'client': 'White Graphics',
        'description': 'Corporate brochure design for White Graphics.',
        'thumbnail': '/assets/presentation/white-graphics/white-graphics-01.jpg',
        'pages': 40,
        'ratio': '870/595',
        'source': 'WHITE GRAPHICS BROCHURE.pdf',
    },
]

# Build new presentation section
lines = []
lines.append('  // ── PRESENTATION DESIGN ────────────────────────────────────────')

for proj in presentation_projects:
    media_entries = []
    for i in range(1, proj['pages'] + 1):
        media_entries.append(f"      '/assets/presentation/{proj['slug']}/{proj['slug']}-{str(i).zfill(2)}.jpg',")
    media_array = '\n'.join(media_entries)
    
    source_escaped = proj['source'].replace('\\', '\\\\\\\\')
    extra = ''
    if 'extra_source' in proj:
        extra_escaped = proj['extra_source'].replace('\\', '\\\\\\\\')
        extra = f"\n      '{extra_escaped}',"
    
    lines.append(f"""  {{
    id: '{proj['id']}',
    title: '{proj['title']}',
    slug: '{proj['slug']}',
    category: 'presentation',
    sourceFolder: 'E:\\\\\\\\Portfolio\\\\\\\\Presentations',
    year: null,
    client: '{proj['client']}',
    description: '{proj['description']}',
    thumbnail: '{proj['thumbnail']}',
    media: [
{media_array}
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '{proj['ratio']}',
    originalFiles: ['E:\\\\\\\\Portfolio\\\\\\\\Presentations\\\\\\\\{source_escaped}'{extra}],
  }},""")

new_section = '\n'.join(lines) + '\n\n'

# Replace the entire presentation section
# Find from "  // ── PRESENTATION DESIGN" to the next "  // ──" section
pattern = r'  // ── PRESENTATION DESIGN ────────────────────────────────────────\n.*?  // ── SOCIAL MEDIA ───────────────────────────────────────────────'
content = re.sub(pattern, new_section + '  // ── SOCIAL MEDIA ───────────────────────────────────────────────', content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('portfolio.ts updated successfully')
