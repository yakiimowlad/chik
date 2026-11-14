'use strict';
// Progressive enhancement only: no content or download depends on this file.
const status = document.querySelector('.copy-status');
for (const button of document.querySelectorAll('[data-copy]')) {
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(button.dataset.copy);
      if (status) status.textContent = 'Команды скопированы.';
    } catch {
      status.textContent = 'Браузер не разрешил копирование. Выделите команду под кнопкой и скопируйте вручную.';
    }
  });
}
const share = document.querySelector('#share-button');
const shareStatus = document.querySelector('#share-status');
if (share) {
  share.hidden = false;
  share.addEventListener('click', async () => {
    const local = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    const title = 'ЧИК — скилл для сайтов, приложений и презентаций';
    const text = local ? `${title}. Чтобы попробовать, передайте коллеге архив chik-skill.zip.` : `${title}. Проверять дизайн внимательнее.`;
    try {
      if (navigator.share && !local) {
        await navigator.share({title, text, url: location.href.split('#')[0]});
        shareStatus.textContent = 'Окно отправки закрыто.';
      } else {
        if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
        await navigator.clipboard.writeText(local ? text : `${text}\n${location.href.split('#')[0]}`);
        share.textContent = local ? 'Текст скопирован' : 'Ссылка скопирована';
        shareStatus.textContent = share.textContent;
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      share.textContent = local ? 'Передайте ZIP коллеге' : 'Скопируйте адрес страницы';
      shareStatus.textContent = 'Браузер не разрешил отправку. ' + share.textContent + '.';
    }
  });
}

// A native anchor index remains usable without JavaScript; tabs enhance it.
document.documentElement.classList.add('js');
const tabs = [...document.querySelectorAll('[data-platform]')];
const panels = [...document.querySelectorAll('.platform-panel')];
if (tabs.length) {
  tabs[0].parentElement.setAttribute('role', 'tablist');
  function selectPlatform(name, focus = false) {
    for (const tab of tabs) {
      const selected = tab.dataset.platform === name;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `platform-${tab.dataset.platform}`);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    }
    for (const panel of panels) {
      panel.setAttribute('role', 'tabpanel');
      panel.hidden = panel.id !== `platform-${name}`;
    }
  }
  const initial = location.hash.replace('#platform-', '');
  selectPlatform(tabs.some(t => t.dataset.platform === initial) ? initial : 'chatgpt');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => { event.preventDefault(); selectPlatform(tab.dataset.platform); });
    tab.addEventListener('keydown', event => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectPlatform(tabs[next].dataset.platform, true);
    });
  });
}
// Return the header when reading back or focusing a navigation link.
const shell = document.querySelector('.header-shell');
let previousY = window.scrollY, scheduled = false;
window.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    if (shell && Math.abs(y - previousY) > 6) shell.dataset.hidden = String(y > previousY && y > 160);
    previousY = y; scheduled = false;
  });
}, {passive: true});
// One action follows reading; it leaves while its destination is on screen.
const floatingInstall = document.querySelector('.floating-install');
if (floatingInstall && 'IntersectionObserver' in window) {
  let heroVisible = true, installVisible = false;
  const update = () => { floatingInstall.hidden = heroVisible || installVisible; };
  new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; update(); }).observe(document.querySelector('.hero .actions'));
  new IntersectionObserver(([entry]) => { installVisible = entry.isIntersecting; update(); }, {rootMargin: '0px 0px -80px 0px'}).observe(document.querySelector('#install'));
}

// Keep the decorative scene asleep outside the viewport or when the tab is hidden.
const agentStage = document.querySelector('.agent-stage');
if (agentStage && 'IntersectionObserver' in window) {
  let stageVisible = true;
  const syncMotion = () => { agentStage.dataset.offscreen = String(!stageVisible || document.hidden); };
  new IntersectionObserver(([entry]) => { stageVisible = entry.isIntersecting; syncMotion(); }).observe(agentStage);
  document.addEventListener('visibilitychange', syncMotion);
}

// Short, content-specific icon sequences run only when their cards enter view.
const moduleCards = [...document.querySelectorAll('.short-checks article')];
if ('IntersectionObserver' in window) {
  const moduleObserver = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.dataset.motion = String(entry.isIntersecting);
  }, {threshold: 0.2});
  moduleCards.forEach(card => moduleObserver.observe(card));
}
const syncPageMotion = () => { document.documentElement.dataset.motionPaused = String(document.hidden); };
document.addEventListener('visibilitychange', syncPageMotion);
syncPageMotion();
