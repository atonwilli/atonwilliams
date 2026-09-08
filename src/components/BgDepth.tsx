'use client'

import { useEffect, useRef } from 'react'

/** Flow field: a slow current of thin lines following a noise field. Abstract, quiet, always moving. Sits behind the page in parallax layers. */
export function BgDepth() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    /* eslint-disable */
    var onResize: (() => void) | undefined, onVis: (() => void) | undefined
  var canvas = ref.current; if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var motion = matchMedia('(prefers-reduced-motion: reduce)');
  var W, H, dpr, particles = [], t = 0, running = true, raf = 0;
  function hash(x, y, z) { var n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return n - Math.floor(n); }
  function smooth(a) { return a * a * (3 - 2 * a); }
  function noise(x, y, z) {
    var xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), xf = smooth(x - xi), yf = smooth(y - yi), zf = smooth(z - zi);
    function l(a, b, s) { return a + (b - a) * s; }
    var c000 = hash(xi, yi, zi), c100 = hash(xi + 1, yi, zi), c010 = hash(xi, yi + 1, zi), c110 = hash(xi + 1, yi + 1, zi);
    var c001 = hash(xi, yi, zi + 1), c101 = hash(xi + 1, yi, zi + 1), c011 = hash(xi, yi + 1, zi + 1), c111 = hash(xi + 1, yi + 1, zi + 1);
    return l(l(l(c000, c100, xf), l(c010, c110, xf), yf), l(l(c001, c101, xf), l(c011, c111, xf), yf), zf);
  }
  var inks = ['52,91,80', '52,91,80', '120,158,140', '254,153,121'];
  function spawn(p) { p.x = Math.random() * W; p.y = Math.random() * H; p.life = 220 + Math.random() * 380; p.ink = inks[Math.floor(Math.random() * inks.length)]; p.w = 0.7 + Math.random() * 0.9; p.a = 0.045 + Math.random() * 0.05; return p; }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#fffaf0'; ctx.fillRect(0, 0, W, H);
    var n = W < 820 ? 140 : 460; particles = []; for (var i = 0; i < n; i++) particles.push(spawn({}));
  }
  function step() {
    t += 1;
    ctx.fillStyle = 'rgba(255,250,240,0.028)'; ctx.fillRect(0, 0, W, H);
    ctx.lineCap = 'round';
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var ang = noise(p.x * 0.0011, p.y * 0.0011, t * 0.0009) * Math.PI * 4;
      var nx = p.x + Math.cos(ang) * 0.9, ny = p.y + Math.sin(ang) * 0.9;
      ctx.strokeStyle = 'rgba(' + p.ink + ',' + p.a + ')'; ctx.lineWidth = p.w;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
      p.x = nx; p.y = ny; p.life--;
      if (p.life < 0 || p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) spawn(p);
    }
  }
  function loop() { if (!running) return; step(); raf = requestAnimationFrame(loop); }
  resize(); onResize = function () { resize(); }; addEventListener('resize', onResize);
  if (motion.matches) { for (var k = 0; k < 900; k++) step(); }
  else {
    for (var k = 0; k < 240; k++) step();
    loop();
    onVis = function () { running = !document.hidden; if (running) loop(); else cancelAnimationFrame(raf); }; document.addEventListener('visibilitychange', onVis);
  }

    return () => { running = false; cancelAnimationFrame(raf); if (onResize) removeEventListener('resize', onResize); if (onVis) document.removeEventListener('visibilitychange', onVis) }
    /* eslint-enable */
  }, [])
  return (
    <div className="bg-depth" aria-hidden="true">
      <div className="layer paper" data-rate="0.04"><span className="paper-tone"></span></div>
      <div className="layer field" data-rate="0.07"><canvas id="flow-field" ref={ref}></canvas></div>
    </div>
  )
}
