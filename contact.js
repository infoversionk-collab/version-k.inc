(() => {
  const form = document.getElementById('vk-contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const submit = document.getElementById('vk-submit');
  const success = document.getElementById('contact-success');
  const categoryError = document.getElementById('category-error');
  const checkboxes = [...form.querySelectorAll('input[name="お問い合わせ内容[]"]')];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';
    categoryError.textContent = '';
    if (!checkboxes.some((c) => c.checked)) {
      categoryError.textContent = 'お問い合わせの種類を1つ以上選択してください。';
      checkboxes[0].focus();
      return;
    }
    const endpoint = form.getAttribute('action');
    if (!endpoint || endpoint.includes('REPLACE_WITH_FORM_ID')) {
      status.textContent = 'メール送信設定がまだ完了していません。';
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
        try {
          const data = await response.json();
          detail = (data.errors || []).map((x) => x.message).join(' ');
        } catch (_) {}
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
