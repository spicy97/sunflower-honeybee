/* =============================================
   Particle System — Sunflower & Honeybee Site
   Floating petals, sparkles, and hearts
   ============================================= */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
    this.mode = 'petals'; // 'petals', 'sparkles', 'hearts', 'celebration'
    this.paused = false;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // ---- Particle Factories ----
  createPetal() {
    const size = 6 + Math.random() * 12;
    const colors = ['#FFF778', '#FFE030', '#FFD700', '#F5C518', '#FFEE44', '#FFD54F'];
    return {
      type: 'petal',
      x: Math.random() * this.canvas.width,
      y: -size * 2,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: 0.6 + Math.random() * 1.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.06,
      opacity: 0.4 + Math.random() * 0.6,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.02,
    };
  }

  createSparkle() {
    return {
      type: 'sparkle',
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: 2 + Math.random() * 4,
      color: Math.random() > 0.5 ? '#FFF778' : '#FFFFFF',
      opacity: Math.random(),
      opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.02,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.1 - Math.random() * 0.4,
      life: 1,
      lifeDecay: 0.004 + Math.random() * 0.006,
    };
  }

  createHeart(x, y) {
    const size = 14 + Math.random() * 20;
    const colors = ['#ff6b9d', '#ff4081', '#FFF778', '#ff8fab', '#ff99bb'];
    return {
      type: 'heart',
      x: x || Math.random() * this.canvas.width,
      y: y || this.canvas.height * 0.6 + Math.random() * this.canvas.height * 0.4,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 2,
      speedY: -(1 + Math.random() * 2),
      opacity: 1,
      lifeDecay: 0.008 + Math.random() * 0.006,
      rotation: (Math.random() - 0.5) * 0.4,
      rotSpeed: (Math.random() - 0.5) * 0.03,
    };
  }

  createStar() {
    return {
      type: 'star',
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: 1.5 + Math.random() * 3,
      color: '#FFFFFF',
      opacity: 0.1 + Math.random() * 0.9,
      opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.015,
      speedX: 0,
      speedY: 0,
    };
  }

  createConfetti() {
    const colors = ['#FFF778', '#022658', '#F5C518', '#ff6b9d', '#FFFFFF', '#FFD700', '#87CEEB'];
    return {
      type: 'confetti',
      x: Math.random() * this.canvas.width,
      y: -20,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 4,
      speedY: 2 + Math.random() * 4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      opacity: 1,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    };
  }

  // ---- Draw Functions ----
  drawPetal(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawSparkle(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle = p.color;

    // 4-point star
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const outerX = Math.cos(angle) * p.size;
      const outerY = Math.sin(angle) * p.size;
      const innerX = Math.cos(angle + Math.PI / 4) * p.size * 0.3;
      const innerY = Math.sin(angle + Math.PI / 4) * p.size * 0.3;
      if (i === 0) ctx.moveTo(outerX, outerY);
      else ctx.lineTo(outerX, outerY);
      ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawHeart(p) {
    const ctx = this.ctx;
    const s = p.size;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.3);
    ctx.bezierCurveTo(s * 0.5, -s * 0.8, s, -s * 0.3, s * 0.5, s * 0.2);
    ctx.bezierCurveTo(s * 0.25, s * 0.5, 0, s * 0.65, 0, s * 0.7);
    ctx.bezierCurveTo(0, s * 0.65, -s * 0.25, s * 0.5, -s * 0.5, s * 0.2);
    ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s * 0.8, 0, -s * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawStar(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawConfetti(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle = p.color;
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ---- Update Functions ----
  updatePetal(p) {
    p.wobble += p.wobbleSpeed;
    p.x += p.speedX + Math.sin(p.wobble) * 0.5;
    p.y += p.speedY;
    p.rotation += p.rotSpeed;
    return p.y < this.canvas.height + 30;
  }

  updateSparkle(p) {
    p.x += p.speedX;
    p.y += p.speedY;
    p.opacity += p.opacityDir;
    if (p.opacity >= 1 || p.opacity <= 0) p.opacityDir *= -1;
    p.life -= p.lifeDecay;
    return p.life > 0 && p.x > 0 && p.x < this.canvas.width;
  }

  updateHeart(p) {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotSpeed;
    p.opacity -= p.lifeDecay;
    p.speedY -= 0.02; // slight acceleration upward
    return p.opacity > 0 && p.y > -50;
  }

  updateStar(p) {
    p.opacity += p.opacityDir;
    if (p.opacity >= 1) { p.opacity = 1; p.opacityDir = -Math.abs(p.opacityDir); }
    if (p.opacity <= 0.05) { p.opacity = 0.05; p.opacityDir = Math.abs(p.opacityDir); }
    return true; // stars never die
  }

  updateConfetti(p) {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotSpeed;
    p.speedX *= 0.99;
    return p.y < this.canvas.height + 30 && p.opacity > 0;
  }

  // ---- Spawn Logic ----
  spawnParticle() {
    switch (this.mode) {
      case 'petals':
        if (this.particles.length < 40 && Math.random() < 0.06) {
          this.particles.push(this.createPetal());
        }
        // Occasional sparkle
        if (this.particles.filter(p => p.type === 'sparkle').length < 15 && Math.random() < 0.04) {
          this.particles.push(this.createSparkle());
        }
        break;

      case 'stars':
        if (this.particles.length < 80 && Math.random() < 0.15) {
          this.particles.push(this.createStar());
        }
        if (this.particles.filter(p => p.type === 'sparkle').length < 10 && Math.random() < 0.03) {
          this.particles.push(this.createSparkle());
        }
        break;

      case 'hearts':
        if (this.particles.length < 50 && Math.random() < 0.08) {
          this.particles.push(this.createHeart());
        }
        break;

      case 'celebration':
        if (this.particles.length < 200 && Math.random() < 0.4) {
          this.particles.push(this.createConfetti());
        }
        if (Math.random() < 0.15) {
          this.particles.push(this.createHeart());
        }
        break;

      case 'mixed':
        if (Math.random() < 0.04) this.particles.push(this.createPetal());
        if (Math.random() < 0.03) this.particles.push(this.createSparkle());
        if (Math.random() < 0.025) this.particles.push(this.createHeart());
        break;
    }
  }

  // ---- Main Loop ----
  draw(p) {
    switch (p.type) {
      case 'petal':    this.drawPetal(p);    break;
      case 'sparkle':  this.drawSparkle(p);  break;
      case 'heart':    this.drawHeart(p);    break;
      case 'star':     this.drawStar(p);     break;
      case 'confetti': this.drawConfetti(p); break;
    }
  }

  update(p) {
    switch (p.type) {
      case 'petal':    return this.updatePetal(p);
      case 'sparkle':  return this.updateSparkle(p);
      case 'heart':    return this.updateHeart(p);
      case 'star':     return this.updateStar(p);
      case 'confetti': return this.updateConfetti(p);
      default:         return false;
    }
  }

  tick() {
    if (!this.canvas || this.paused) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.spawnParticle();

    this.particles = this.particles.filter(p => {
      const alive = this.update(p);
      if (alive) this.draw(p);
      return alive;
    });

    this.animId = requestAnimationFrame(() => this.tick());
  }

  // ---- Public API ----
  start(mode = 'petals') {
    this.mode = mode;
    if (this.animId) cancelAnimationFrame(this.animId);
    this.particles = [];
    this.paused = false;
    this.tick();
  }

  setMode(mode) {
    this.mode = mode;
    // Don't clear existing — let them fade out naturally
  }

  burst(x, y, count = 12, type = 'heart') {
    for (let i = 0; i < count; i++) {
      let p;
      if (type === 'heart') {
        p = this.createHeart(
          x + (Math.random() - 0.5) * 60,
          y + (Math.random() - 0.5) * 30
        );
        p.speedX = (Math.random() - 0.5) * 6;
        p.speedY = -(2 + Math.random() * 4);
      } else {
        p = this.createSparkle();
        p.x = x + (Math.random() - 0.5) * 80;
        p.y = y + (Math.random() - 0.5) * 40;
        p.speedX = (Math.random() - 0.5) * 3;
        p.speedY = -(1 + Math.random() * 2);
        p.size = 3 + Math.random() * 8;
        p.life = 0.8;
      }
      this.particles.push(p);
    }
  }

  stop() {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.animId = null;
    if (this.canvas) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  pause() { this.paused = true; }
  resume() { this.paused = false; this.tick(); }
}

// Export for use in other scripts
window.ParticleSystem = ParticleSystem;
