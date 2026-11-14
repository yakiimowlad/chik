"""Check the release structure and installer in temporary directories."""
from pathlib import Path
import tempfile,subprocess,hashlib,zipfile,shutil,os
R=Path(__file__).resolve().parents[1]
def digest(root):return {str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in root.rglob('*') if p.is_file()}
subprocess.run(['bash','-n',str(R/'install.sh')],check=True)
with tempfile.TemporaryDirectory() as temp:
 t=Path(temp)
 for target in ['codex','claude']:
  d=t/(target+' skills')
  subprocess.run(['bash',str(R/'install.sh'),target,'--skills-dir',str(d)],check=True,capture_output=True)
  assert (d/'chik/SKILL.md').is_file() and not (d/'unslop').exists()
  for n in ['voice-style','apca-addon','hig-design-system','motion-haptics','sound-design','no-js-release','mobile-ux','device-viewport-reference']:assert (d/f'chik/references/{n}.md').is_file()
  (d/'chik/local').write_text('keep')
  subprocess.run(['bash',str(R/'install.sh'),target,'--skills-dir',str(d),'--with-unslop'],check=True,capture_output=True)
  assert digest(d/'unslop')==digest(R/'upstream/unslop')
  assert any((b/'chik/local').exists() for b in d.glob('.chik-backup.*'))
  (d/'unslop/local').write_text('untouched');before=digest(d/'unslop')
  subprocess.run(['bash',str(R/'install.sh'),target,'--skills-dir',str(d)],check=True,capture_output=True)
  assert digest(d/'unslop')==before
 # A symlink must never be replaced by installation.
 d=t/'symlink';d.mkdir();(d/'chik').symlink_to(t/'codex skills/chik',target_is_directory=True)
 assert subprocess.run(['bash',str(R/'install.sh'),'codex','--skills-dir',str(d)],capture_output=True).returncode!=0
 # Fail on the optional second move; restore the first skill and both old directories.
 d=t/'codex skills';before={n:digest(d/n) for n in ['chik','unslop']};bin=t/'bin';bin.mkdir();flag=t/'failed';mv=shutil.which('mv')
 (bin/'mv').write_text('#!/usr/bin/env bash\nif [[ "$1" == */.chik-stage.*/unslop ]] && [[ ! -e "'+str(flag)+'" ]]; then touch "'+str(flag)+'"; exit 1; fi\nexec '+mv+' "$@"\n');(bin/'mv').chmod(0o755)
 env=dict(os.environ,PATH=str(bin)+':'+os.environ['PATH'])
 assert subprocess.run(['bash',str(R/'install.sh'),'codex','--skills-dir',str(d),'--with-unslop'],env=env,capture_output=True).returncode!=0
 assert all(digest(d/n)==before[n] for n in before)
 for name in ['chik-skill.zip','chik-installer.zip']:
  with zipfile.ZipFile(R/'website'/name) as z:
   assert z.testzip() is None
   assert all('..' not in Path(n).parts and not n.startswith('/') for n in z.namelist())
   if name=='chik-skill.zip':
    assert 'chik/SKILL.md' in z.namelist() and not any(n.endswith('install.sh') for n in z.namelist())
   else:
    z.extractall(t/'unpacked');subprocess.run(['bash',str(t/'unpacked/chik-installer/install.sh'),'codex','--skills-dir',str(t/'from-zip')],check=True,capture_output=True)
print('PASS: both clients, one skill by default, complete modules, optional unchanged original, backup, rollback, symlink refusal, both archives')
