from pathlib import Path
path = Path('src/db/projects.ts')
text = path.read_text(encoding='utf-8')
patterns = ['αª', 'αº', 'αÑ', 'ΓÇ', '╛', '┐', 'á', 'í', 'õ', 'Ω']
with open('tmp_scan_output.txt', 'w', encoding='utf-8') as out:
    for i, line in enumerate(text.splitlines(), start=1):
        if any(p in line for p in patterns):
            out.write(f'{i}: {line}\n')
