const form = document.querySelector('[data-contact-form]');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const status = form.querySelector('[data-form-status]');
  if (status) {
    status.textContent = form.querySelector('.form-note')?.textContent ?? '';
    status.hidden = false;
  }
});
