const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('visible'); }
  });
},{threshold:0.14});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('contactForm')?.addEventListener('submit', (event)=>{
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent('Contato pelo site GrowOS');
  const body = encodeURIComponent(
`Nome: ${data.get('nome') || ''}
Empresa: ${data.get('empresa') || ''}
Cidade: ${data.get('cidade') || ''}
WhatsApp: ${data.get('whatsapp') || ''}
E-mail: ${data.get('email') || ''}

Mensagem:
${data.get('mensagem') || ''}`
  );
  window.location.href = `mailto:gabriellino@gmail.com?subject=${subject}&body=${body}`;
});
