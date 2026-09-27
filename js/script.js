// The active chapter changes the weather and time of day inside the bus window.
const chapters = [...document.querySelectorAll('.chapter')];
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

// Pick the chapter nearest the middle of the viewport in either scroll direction.
let scheduled = false;
function updateScene() {
  let closest = chapters[0];
  let distance = Infinity;
  for (const chapter of chapters) {
    const rect = chapter.getBoundingClientRect();
    const middle = rect.top + rect.height / 2;
    const delta = Math.abs(middle - window.innerHeight / 2);
    if (delta < distance) { distance = delta; closest = chapter; }
  }
  document.body.dataset.scene = closest.dataset.scene;
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateScene); }
}, { passive: true });
window.addEventListener('resize', updateScene);
updateScene();
