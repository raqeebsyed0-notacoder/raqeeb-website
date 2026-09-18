path = 'E:/raqeeb-website/src/data/portfolio.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove White Graphics block using a flexible pattern
# The block starts with "  {" after euphoria-experiences-brand and ends with the closing "}," before PRESENTATION DESIGN
import re

# Match from "  // White Graphics project" to its closing "},"
# The pattern: find the white-graphics block by matching its id and capturing to the closing brace
pattern = r"""
  \{
    id: 'white-graphics',
    title: 'White Graphics',
    slug: 'white-graphics',
    category: 'brand-identity',
    sourceFolder: 'E:\\Portfolio\\Brand Identity',
    year: null,
    client: 'White Graphics',
    description: 'Logo design for White Graphics\.',
    thumbnail: '/assets/brand/white-graphics/twg-logo\.webp',
    media: \['/assets/brand/white-graphics/twg-logo\.webp'\],
    mediaTypes: \['image'\],
    originalFiles: \['E:\\Portfolio\\Brand Identity\\logo\\twg-logo\.webp'\],
  \},\n\n"""

match = re.search(pattern, content)
if match:
    content = content[:match.start()] + content[match.end():]
    print("White Graphics block removed")
else:
    print("Pattern not found, trying alternative...")
    # Try with double backslashes (as shown in read_file output)
    pattern2 = r"""
  \{
    id: 'white-graphics',
    title: 'White Graphics',
    slug: 'white-graphics',
    category: 'brand-identity',
    sourceFolder: 'E:\\\\Portfolio\\\\Brand Identity',
    year: null,
    client: 'White Graphics',
    description: 'Logo design for White Graphics\.',
    thumbnail: '/assets/brand/white-graphics/twg-logo\.webp',
    media: \['/assets/brand/white-graphics/twg-logo\.webp'\],
    mediaTypes: \['image'\],
    originalFiles: \['E:\\\\Portfolio\\\\Brand Identity\\\\logo\\\\twg-logo\.webp'\],
  \},\n\n"""
    match2 = re.search(pattern2, content)
    if match2:
        content = content[:match2.start()] + content[match2.end():]
        print("White Graphics block removed (pattern2)")
    else:
        print("ERROR: Could not find White Graphics block")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
