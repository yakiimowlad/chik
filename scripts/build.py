"""Build the ready-to-upload skill and optional terminal kit. Python standard library only."""
from pathlib import Path
import zipfile,hashlib
R=Path(__file__).resolve().parents[1];W=R/'website'
def zip_paths(output,items):
 with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
  for source,prefix in items:
   files=sorted(source.rglob('*')) if source.is_dir() else [source]
   for f in files:
    if not f.is_file():continue
    assert not f.is_symlink()
    name=(Path(prefix)/f.relative_to(source)).as_posix() if source.is_dir() else prefix
    assert not name.startswith('/') and '..' not in Path(name).parts
    z.write(f,name)
 with zipfile.ZipFile(output) as z: assert z.testzip() is None
zip_paths(W/'chik-skill.zip',[(R/'skills/chik','chik')])
zip_paths(W/'chik-installer.zip',[(R/'skills','chik-installer/skills'),(R/'upstream','chik-installer/upstream'),(R/'install.sh','chik-installer/install.sh'),(R/'LICENSE','chik-installer/LICENSE'),(R/'docs/INSTALL.md','chik-installer/README.md')])
(W/'SHA256SUMS.txt').write_text(''.join(hashlib.sha256((W/n).read_bytes()).hexdigest()+'  '+n+'\n' for n in ['chik-skill.zip','chik-installer.zip']))
print('Built chik-skill.zip (ready skill) and chik-installer.zip (terminal kit)')
