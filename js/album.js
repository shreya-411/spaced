/* ===================== STARFIELD (pulsing stars) ===================== */
  const starCanvas = document.getElementById('starfield');
  const starCtx = starCanvas.getContext('2d');
  let stars = [];
  const STAR_COLORS = ['#FFFFFF', '#8B78C8', '#4DD9C0'];

  function resizeStarCanvas(){
    starCanvas.width = window.innerWidth;
    starCanvas.height = document.documentElement.scrollHeight;
  }

  function buildStars(){
    const count = Math.floor((starCanvas.width * starCanvas.height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 1.3 + 0.3,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.006
    }));
  }

  let starTime = 0;
  function drawStars(){
    starTime += 1;
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (const s of stars){
      const twinkle = (Math.sin(starTime * s.speed + s.phase) + 1) / 2; // 0..1
      const alpha = 0.25 + twinkle * 0.75;
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r + twinkle * 0.6, 0, Math.PI * 2);
      starCtx.fillStyle = s.color;
      starCtx.globalAlpha = alpha;
      starCtx.fill();
    }
    starCtx.globalAlpha = 1;
    requestAnimationFrame(drawStars);
  }

  function initStarfield(){
    resizeStarCanvas();
    buildStars();
  }
  initStarfield();
  requestAnimationFrame(drawStars);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initStarfield, 250);
  });
  // Rebuild once content settles (images loaded can change page height)
  window.addEventListener('load', () => setTimeout(initStarfield, 300));

/* ===================== COMET CURSOR ===================== */
const cometCanvas = document.getElementById('comet-cursor');
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (!isTouch && cometCanvas) {
  const cometCtx = cometCanvas.getContext('2d');
  let particles = [];
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let lastMouse = { ...mouse };

  function resizeCometCanvas(){
    cometCanvas.width = window.innerWidth;
    cometCanvas.height = window.innerHeight;
  }
  resizeCometCanvas();
  window.addEventListener('resize', resizeCometCanvas);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
    const steps = Math.min(Math.max(Math.floor(dist / 4), 1), 6);
    for (let i = 0; i < steps; i++){
      const t = i / steps;
      particles.push({
        x: lastMouse.x + (mouse.x - lastMouse.x) * t,
        y: lastMouse.y + (mouse.y - lastMouse.y) * t,
        life: 1,
        r: Math.random() * 2 + 1.8
      });
    }
    lastMouse = { x: mouse.x, y: mouse.y };
    if (particles.length > 140) particles = particles.slice(particles.length - 140);
  });

  function drawComet(){
    cometCtx.clearRect(0, 0, cometCanvas.width, cometCanvas.height);
    for (let i = 0; i < particles.length; i++){
      particles[i].life -= 0.035;
    }
    particles = particles.filter(p => p.life > 0);

    for (const p of particles){
      const grad = cometCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4 * p.life + 1);
      grad.addColorStop(0, `rgba(77,217,192,${0.55 * p.life})`);
      grad.addColorStop(0.5, `rgba(107,79,160,${0.28 * p.life})`);
      grad.addColorStop(1, 'rgba(107,79,160,0)');
      cometCtx.beginPath();
      cometCtx.fillStyle = grad;
      cometCtx.arc(p.x, p.y, p.r * 4 * p.life + 1, 0, Math.PI * 2);
      cometCtx.fill();
    }

    const headGrad = cometCtx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 9);
    headGrad.addColorStop(0, '#FFFFFF');
    headGrad.addColorStop(0.4, '#4DD9C0');
    headGrad.addColorStop(1, 'rgba(77,217,192,0)');
    cometCtx.beginPath();
    cometCtx.fillStyle = headGrad;
    cometCtx.arc(mouse.x, mouse.y, 9, 0, Math.PI * 2);
    cometCtx.fill();

    requestAnimationFrame(drawComet);
  }
  requestAnimationFrame(drawComet);
}

const ALBUM_IMAGES = [
  { src: 'assets/album-pics/img1.jpg', alt: 'Caption 1' },
  { src: 'assets/album-pics/img2.jpg', alt: 'Caption 2' },
  { src: 'assets/album-pics/img3.jpg', alt: 'Caption 3' },
  { src: 'assets/album-pics/img4.jpg', alt: 'Caption 4' },
  { src: 'assets/album-pics/img5.jpg', alt: 'Caption 5' },
  { src: 'assets/album-pics/img6.jpg', alt: 'Caption 6' },
  { src: 'assets/album-pics/img7.jpeg', alt: 'Caption 7' },
  { src: 'assets/album-pics/img8.jpeg', alt: 'Caption 8' },
  { src: 'assets/album-pics/img9.jpeg', alt: 'Caption 9' },
  { src: 'assets/album-pics/img10.jpeg', alt: 'Caption 10' },
  { src: 'assets/album-pics/img11.jpeg', alt: 'Caption 11' },
  { src: 'assets/album-pics/img12.jpeg', alt: 'Caption 12' },
  { src: 'assets/album-pics/img13.jpeg', alt: 'Caption 13' },
  { src: 'assets/album-pics/img14.jpeg', alt: 'Caption 14' },
];

const albumModalList = document.getElementById('album-modal-list');
const albumModalImage = document.getElementById('album-modal-image');
const albumModalCaption = document.getElementById('album-modal-caption');
const backBtn = document.getElementById('album-back-btn');

function buildAlbumList(){
  albumModalList.innerHTML = '';

  const colLeft = document.createElement('div');
  colLeft.className = 'album-modal-column';
  const colRight = document.createElement('div');
  colRight.className = 'album-modal-column';

  ALBUM_IMAGES.forEach((img, i) => {
    const item = document.createElement('div');
    item.className = 'album-modal-item';
    item.dataset.index = i;
    item.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    item.addEventListener('click', () => showAlbumImage(i));

    // alternate images between the two columns
    (i % 2 === 0 ? colLeft : colRight).appendChild(item);
  });

  albumModalList.appendChild(colLeft);
  albumModalList.appendChild(colRight);
}

function showAlbumImage(index){
  const img = ALBUM_IMAGES[index];
  albumModalImage.src = img.src;
  albumModalImage.alt = img.alt;
  albumModalCaption.textContent = img.alt;

  document.querySelectorAll('.album-modal-item').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.index) === index);
  });
  const activeEl = albumModalList.querySelector('.album-modal-item.active');
  if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
}

// Read ?img=N from the URL to know which image to open first
const params = new URLSearchParams(window.location.search);
const startIndex = Math.min(Math.max(Number(params.get('img')) || 0, 0), ALBUM_IMAGES.length - 1);

buildAlbumList();
showAlbumImage(startIndex);
