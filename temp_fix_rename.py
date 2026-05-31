from pathlib import Path

path = Path('src/db/projects.ts')
text = path.read_text(encoding='utf-8')
text = text.replace(
    'Why Grisha chose Eren  -  revenge or destiny?',
    'Why Grisha chose Eren — revenge or destiny?'
)
updated = text != path.read_text(encoding='utf-8')
path.write_text(text, encoding='utf-8')
print('updated' if updated else 'no changes')
