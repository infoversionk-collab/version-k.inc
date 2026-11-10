(() => {
  const form = document.getElementById('vk-contact-form');
  if (!form) return;
  const trigger = document.getElementById('vk-multi-trigger');
  const options = document.getElementById('vk-multi-options');
  const summary = document.getElementById('vk-multi-summary');
  const status = document.getElementById('form-status');
  const submit = document.getElementById('vk-submit');
  const success = document.getElementById('contact-success');
  const checkboxes = [...options.querySelectorAll('input[type="checkbox"]')];

  const closeMenu = () => { options.hidden = true; trigger.setAttribute('aria-expanded', 'false'); };
  trigger.addEventListener('click', () => {
    const opening = options.hidden;
    options.hidden = !opening;
    trigger.setAttribute('aria-expanded', String(opening));
  });
  const updateSummary = () => {
    const selected = checkboxes.filter(c => c.checked).map(c => c.value);
    summary.textContent = selected.length ? `${selected.length}項目を選択中：${selected.join('、')}` : 'お問い合わせ内容を選択してください';
    summary.classList.toggle('has-selection', selected.length > 0);
  };
  checkboxes.forEach(c => c.addEventListener('change', updateSummary));
  document.addEventListener('click', e => { if (!e.target.closest('#vk-multi')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';
    if (!checkboxes.some(c => c.checked)) {
      status.textContent = 'お問い合わせ内容を1つ以上選択してください。';
      status.classList.add('is-error');
      trigger.focus();
      return;
    }
    const endpoint = form.getAttribute('action');
    if (!endpoint || endpoint.includes('REPLACE_WITH_FORM_ID')) {
      status.textContent = 'メール送信設定がまだ完了していません。FormspreeのフォームIDを設定してください。';
      status.classList.add('is-error');
      return;
    }
    submit.disabled = true;
    submit.querySelector('.submit-label').textContent = '送信しています…';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) {
        let detail = '';
        try { const data = await response.json(); detail = (data.errors || []).map(x => x.message).join(' '); } catch (_) {}
        throw new Error(detail || '送信に失敗しました。時間をおいて再度お試しください。');
      }
      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      status.textContent = err.message || '通信エラーが発生しました。ネットワークを確認して再度お試しください。';
      status.classList.add('is-error');
    } finally {
      submit.disabled = false;
      submit.querySelector('.submit-label').textContent = '入力内容を送信する';
    }
  });
})();
