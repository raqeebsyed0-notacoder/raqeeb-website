content = open('src/data/portfolio.ts').read()

euphoria_entry = """  {
    id: 'euphoria-experiences-brand',
    title: 'Euphoria Experiences',
    slug: 'euphoria-experiences-brand',
    category: 'brand-identity',
    sourceFolder: 'E:\\\\Portfolio\\\\Brand Identity',
    year: null,
    client: 'Euphoria Experiences',
    description: 'Brand identity and logo design for the creative agency itself.',
    thumbnail: '/assets/brand/euphoria/cover.png',
    media: ['/assets/brand/euphoria/cover.png'],
    mediaTypes: ['image'],
    originalFiles: ['E:\\\\Portfolio\\\\Brand Identity\\\\logo\\\\Euphoria Experiences.pdf (1).png'],
  },
"""

insert_after = """    brandFonts: ['Biennale', 'Manrope'],
  },"""

if insert_after in content:
    content = content.replace(insert_after, insert_after + euphoria_entry)
    print('Inserted')
else:
    print('Pattern not found')

open('src/data/portfolio.ts', 'w').write(content)
