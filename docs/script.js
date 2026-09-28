// script.js — تأثير خلفية باستخدام Canvas (particles)
(function(){
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = innerWidth;
  let height = canvas.height = innerHeight;
  const particles = [];
  const PARTICLE_COUNT = Math.min(90, Math.floor((width*height)/80000));

  function rand(min,max){return Math.random()*(max-min)+min}
  function resize(){width = canvas.width = innerWidth;height = canvas.height = innerHeight}
  addEventListener('resize',resize);

  function create(){
    for(let i=0;i<PARTICLE_COUNT;i++){
      particles.push({
        x:rand(0,width),
        y:rand(0,height),
        vx:rand(-0.25,0.25),
        vy:rand(-0.25,0.25),
        r:rand(0.6,2.2),
        hue:rand(180,260)
      });
    }
  }

  function step(){
    ctx.clearRect(0,0,width,height);
    // soft gradient background
    const g = ctx.createLinearGradient(0,0,width,height);
    g.addColorStop(0,'rgba(7,16,41,0.6)');
    g.addColorStop(1,'rgba(10,20,40,0.35)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,width,height);

    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x< -50) p.x = width + 50;
      if(p.x> width + 50) p.x = -50;
      if(p.y< -50) p.y = height + 50;
      if(p.y> height + 50) p.y = -50;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue},70%,70%,0.9)`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }

    // draw connecting lines
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d<110){
          ctx.strokeStyle = `rgba(124,131,253,${1 - d/140})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }

  create();
  step();

  // simple contact form handler (no backend)
  window.handleContact = function(e){
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    alert('تم استلام الرسالة — هذه نسخة تجريبية محلية.');
    form.reset();
  }
})();
