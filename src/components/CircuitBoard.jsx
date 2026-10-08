import { useEffect, useRef } from 'react'

// Animated hero board: traces routed outward from a central chip, with pulses
// travelling along them. Ported from the Circuito design system.
const C = { trace: '#2E2532', plum: '#7E397E', signal: '#C77DC7', spark: '#F3E8F3', void: '#0A090B' }

export default function CircuitBoard() {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let W, H, paths = [], pulses = [], layer, raf

    // Deterministic PRNG so the board looks the same every load.
    let seed = 7
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647

    function route(x, y, dx, dy, G) {
      const pts = [[x, y]]
      let steps = 0
      while (x > -G && x < W + G && y > -G && y < H + G && steps < 60) {
        const run = 2 + Math.floor(rnd() * 5)
        x += dx * G * run; y += dy * G * run
        pts.push([x, y])
        if (rnd() < 0.55) { // 45° jog sideways, then resume
          const s = rnd() < 0.5 ? -1 : 1, k = 1 + Math.floor(rnd() * 3)
          x += (dx + (dx ? 0 : s)) * G * k; y += (dy + (dy ? 0 : s)) * G * k
          pts.push([x, y])
        }
        if (rnd() < 0.12) break // ends early on a pad
        steps++
      }
      return pts
    }

    function build() {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2)
      W = r.width; H = r.height
      cv.width = W * dpr; cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed = 7; paths = []
      const G = Math.max(10, Math.round(W / 90))
      const cw = Math.min(680, W - 32) / 2 + 14, ch = Math.min(H * 0.36, 240)
      const cx = W / 2, cy = H / 2
      for (let i = 0; i < 26; i++) { // top & bottom
        const x = cx - cw + (2 * cw) * (i + 0.5) / 26
        paths.push(route(x, cy - ch, 0, -1, G), route(x, cy + ch, 0, 1, G))
      }
      for (let i = 0; i < 9; i++) { // sides
        const y = cy - ch + (2 * ch) * (i + 0.5) / 9
        paths.push(route(cx - cw, y, -1, 0, G), route(cx + cw, y, 1, 0, G))
      }
      paths.forEach((p) => {
        let L = 0; p.seg = []
        for (let i = 1; i < p.length; i++) {
          const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1])
          p.seg.push(d); L += d
        }
        p.len = L; p.hot = rnd() < 0.35
      })

      layer = document.createElement('canvas')
      layer.width = cv.width; layer.height = cv.height
      const g = layer.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.fillStyle = C.void; g.fillRect(0, 0, W, H)
      g.lineCap = 'round'; g.lineJoin = 'round'
      paths.forEach((p) => {
        g.beginPath(); p.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)))
        g.strokeStyle = p.hot ? C.plum : C.trace; g.lineWidth = p.hot ? 1.6 : 1.2
        if (p.hot) { g.shadowColor = C.plum; g.shadowBlur = 8 } else g.shadowBlur = 0
        g.stroke()
        const [ex, ey] = p[p.length - 1]
        g.shadowBlur = p.hot ? 10 : 0; g.shadowColor = C.signal
        g.beginPath(); g.arc(ex, ey, p.hot ? 3.2 : 2.4, 0, 7)
        g.fillStyle = p.hot ? C.signal : C.trace; g.fill()
      })
      g.shadowBlur = 0
      // radial fade so the edges sink into black
      const vg = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.75)
      vg.addColorStop(0, 'rgba(10,9,11,0)'); vg.addColorStop(1, 'rgba(10,9,11,.92)')
      g.fillStyle = vg; g.fillRect(0, 0, W, H)

      pulses = Array.from({ length: 22 }, () => ({ p: paths[Math.floor(rnd() * paths.length)], t: rnd(), v: 0.0025 + rnd() * 0.004 }))
    }

    function at(p, t) {
      let d = t * p.len
      for (let i = 0; i < p.seg.length; i++) {
        if (d <= p.seg[i]) {
          const f = d / p.seg[i], a = p[i], b = p[i + 1]
          return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]
        }
        d -= p.seg[i]
      }
      return p[p.length - 1]
    }

    function frame() {
      ctx.drawImage(layer, 0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'
      pulses.forEach((q) => {
        q.t += q.v
        if (q.t > 1) { q.p = paths[Math.floor(Math.random() * paths.length)]; q.t = 0; q.v = 0.0025 + Math.random() * 0.004 }
        for (let k = 0; k < 6; k++) { // short comet tail
          const tt = q.t - k * 0.008; if (tt < 0) break
          const [x, y] = at(q.p, tt)
          ctx.beginPath(); ctx.arc(x, y, 2.6 - k * 0.35, 0, 7)
          ctx.fillStyle = k ? `rgba(199,125,199,${0.55 - k * 0.09})` : C.spark
          ctx.shadowColor = C.signal; ctx.shadowBlur = k ? 0 : 14; ctx.fill()
        }
      })
      ctx.shadowBlur = 0; ctx.globalCompositeOperation = 'source-over'
      if (!reduce) raf = requestAnimationFrame(frame)
    }

    function start() { cancelAnimationFrame(raf); build(); frame() }
    start()
    let to
    const onResize = () => { clearTimeout(to); to = setTimeout(start, 150) }
    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else if (!reduce) frame() }
    addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf); clearTimeout(to)
      removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" />
}
