const API = 'https://seu-backend.onrender.com'; // Substitua pela URL do Render

document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.querySelector('#formCadastro');
  if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = new FormData(cadastroForm);
      const obj = Object.fromEntries(form.entries());

      obj.senha = await hash(obj.senha);

      const r = await fetch(`${API}/cadastrar`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
      });

      window.location.href = r.ok ? 'bemvindo.html' : 'erro.html';
    });
  }

  const loginForm = document.querySelector('#formLogin');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = new FormData(loginForm);
      const apelido = form.get('apelido');
      const senha = await hash(form.get('senha'));

      const r = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ apelido, senha })
      });

      window.location.href = r.ok ? 'bemvindo.html' : 'erro.html';
    });
  }
});

async function hash(text) {
  const encoded = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
