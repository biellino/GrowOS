const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
function createParticles(){
  particles = Array.from({length: Math.min(90, Math.floor(window.innerWidth/18))}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx: (Math.random()-.5)*.35,
    vy: (Math.random()-.5)*.35,
    r: Math.random()*1.8+.6,
    a: Math.random()*.55+.15
  }));
}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(95,209,55,${p.a})`; ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const q=particles[j]; const dx=p.x-q.x; const dy=p.y-q.y; const d=Math.sqrt(dx*dx+dy*dy);
      if(d<130){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle=`rgba(95,209,55,${(1-d/130)*.12})`; ctx.stroke(); }
    }
  });
  requestAnimationFrame(draw);
}
resize(); createParticles(); draw(); window.addEventListener('resize',()=>{resize();createParticles();});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent('Contato pelo site GrowOS');
  const body = encodeURIComponent(
    `Nome: ${data.get('nome') || ''}\nEmpresa: ${data.get('empresa') || ''}\nCidade: ${data.get('cidade') || ''}\nWhatsApp: ${data.get('whatsapp') || ''}\nE-mail: ${data.get('email') || ''}\n\nMensagem:\n${data.get('mensagem') || ''}`
  );
  window.location.href = `mailto:gabriellino@gmail.com?subject=${subject}&body=${body}`;
  document.getElementById('formStatus').textContent = 'Abrindo seu aplicativo de e-mail...';
});
