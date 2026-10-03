const carousel = document.querySelector('[data-pair-carousel]');

if (carousel) {
  const pairs = JSON.parse(carousel.dataset.pairs ?? '[]');
  const beforeImage = carousel.querySelector('[data-pair-before]');
  const afterImage = carousel.querySelector('[data-pair-after]');
  const counter = carousel.querySelector('[data-pair-counter]');
  let currentIndex = 0;

  const showPair = (index) => {
    currentIndex = (index + pairs.length) % pairs.length;
    beforeImage.src = pairs[currentIndex].before;
    afterImage.src = pairs[currentIndex].after;
    counter.textContent = `${currentIndex + 1} / ${pairs.length}`;
  };

  carousel.querySelector('[data-pair-previous]')?.addEventListener('click', () => showPair(currentIndex - 1));
  carousel.querySelector('[data-pair-next]')?.addEventListener('click', () => showPair(currentIndex + 1));

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPair(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showPair(currentIndex + 1);
    }
  });
}