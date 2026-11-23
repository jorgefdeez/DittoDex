'use client'
import { useId, useMemo, useState } from "react"
import { PricePoint } from "@/app/utils/prices"
import { Dictionary } from "@/app/utils/i18n"

import "./style.css"

const W = 640
const H = 240
const M = { top: 14, right: 18, bottom: 34, left: 52 }
const IW = W - M.left - M.right
const IH = H - M.top - M.bottom

type Pt = { x: number; y: number }

const monotonePath = (pts: Pt[]) => {
    if (pts.length < 2) return ""
    const n = pts.length
    const dx = pts.slice(1).map((p, i) => p.x - pts[i].x)
    const s = pts.slice(1).map((p, i) => (p.y - pts[i].y) / dx[i])
    const m = pts.map((_, i) => {
        if (i === 0) return s[0]
        if (i === n - 1) return s[n - 2]
        return s[i - 1] * s[i] <= 0 ? 0 : (s[i - 1] + s[i]) / 2
    })
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === 0) { m[i] = 0; m[i + 1] = 0; continue }
        const a = m[i] / s[i], b = m[i + 1] / s[i], h = a * a + b * b
        if (h > 9) { const k = 3 / Math.sqrt(h); m[i] = k * a * s[i]; m[i + 1] = k * b * s[i] }
    }
    let d = `M${pts[0].x},${pts[0].y}`
    for (let i = 0; i < n - 1; i++) {
        const h = dx[i] / 3
        d += ` C${pts[i].x + h},${pts[i].y + m[i] * h} ${pts[i + 1].x - h},${pts[i + 1].y - m[i + 1] * h} ${pts[i + 1].x},${pts[i + 1].y}`
    }
    return d
}

const niceStep = (range: number) => {
    const raw = range / 4
    const mag = 10 ** Math.floor(Math.log10(raw))
    const norm = raw / mag
    return (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag
}

type Props = {
    points: PricePoint[]
    t: Dictionary
    locale: string
}

const GraficaPrecios = ({ points, t, locale }: Props) => {
    const uid = useId().replace(/:/g, "")
    const [hover, setHover] = useState<number | null>(null)

    const chart = useMemo(() => {
        const market = points.map((p) => p.value)
        const mean = market.map((_, i) => market.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1))
        const all = [...market, ...mean]
        let lo = Math.min(...all), hi = Math.max(...all)
        if (hi - lo < 0.01) { lo = lo * 0.8; hi = hi * 1.2 + 0.01 }
        const pad = (hi - lo) * 0.15
        const step = niceStep(hi - lo + pad * 2)
        const yMin = Math.max(0, Math.floor((lo - pad) / step) * step)
        const yMax = Math.ceil((hi + pad) / step) * step
        const ticks: number[] = []
        for (let v = yMin; v <= yMax + step / 2; v += step) ticks.push(+v.toFixed(4))

        const x = (i: number) => M.left + (points.length === 1 ? IW / 2 : (i / (points.length - 1)) * IW)
        const y = (v: number) => M.top + IH - ((v - yMin) / (yMax - yMin)) * IH
        const toPts = (vals: number[]) => vals.map((v, i) => ({ x: x(i), y: y(v) }))
        return { market, mean, ticks, x, y, marketPts: toPts(market), meanPts: toPts(mean), step }
    }, [points])

    const money = (v: number, digits?: number) =>
        new Intl.NumberFormat(locale, {
            style: "currency", currency: "EUR",
            minimumFractionDigits: digits ?? 2, maximumFractionDigits: digits ?? 2,
        }).format(v)

    const tickDigits = chart.step >= 1 ? 0 : 2
    const baseY = M.top + IH
    const area = (pts: Pt[]) => pts.length < 2 ? "" : `${monotonePath(pts)} L${pts[pts.length - 1].x},${baseY} L${pts[0].x},${baseY} Z`

    const onMove = (e: React.PointerEvent<SVGRectElement>) => {
        const rect = e.currentTarget.ownerSVGElement!.getBoundingClientRect()
        const vx = ((e.clientX - rect.left) / rect.width) * W
        let best = 0
        chart.marketPts.forEach((p, i) => { if (Math.abs(p.x - vx) < Math.abs(chart.marketPts[best].x - vx)) best = i })
        setHover(best)
    }

    const hp = hover !== null ? chart.marketPts[hover] : null

    return (
        <div className="grafica">
            <div className="graficaLegend">
                <span><i className="dot dotMarket" />{t.avgSeries}</span>
                <span><i className="dot dotMean" />{t.meanSeries}</span>
            </div>
            <div className="graficaPlot">
                <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.priceHistory}>
                    <defs>
                        <linearGradient id={`gm${uid}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
                        </linearGradient>
                        <linearGradient id={`gb${uid}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#5b8def" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#5b8def" stopOpacity="0.02" />
                        </linearGradient>
                    </defs>

                    {chart.ticks.map((v) => (
                        <g key={v}>
                            <line x1={M.left} x2={W - M.right} y1={chart.y(v)} y2={chart.y(v)} className="gridLine" />
                            <text x={M.left - 8} y={chart.y(v)} className="axisText" textAnchor="end" dominantBaseline="middle">
                                {money(v, tickDigits)}
                            </text>
                        </g>
                    ))}

                    {points.map((p, i) => (
                        <text key={p.key} x={chart.x(i)} y={H - 10} className="axisText" textAnchor={points.length > 1 && i === 0 ? "start" : points.length > 1 && i === points.length - 1 ? "end" : "middle"}>
                            {t[p.key]}
                        </text>
                    ))}

                    <path d={area(chart.meanPts)} fill={`url(#gb${uid})`} />
                    <path d={area(chart.marketPts)} fill={`url(#gm${uid})`} />
                    <path d={monotonePath(chart.meanPts)} className="lineMean" />
                    <path d={monotonePath(chart.marketPts)} className="lineMarket" />

                    {chart.marketPts.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={hover === i ? 5 : 3.5} className="pointMarket" />
                    ))}

                    {hp && (
                        <>
                            <line x1={hp.x} x2={hp.x} y1={M.top} y2={baseY} className="crosshair" />
                            <circle cx={hp.x} cy={chart.meanPts[hover!].y} r={4.5} className="pointMean" />
                        </>
                    )}

                    <rect
                        x={M.left - 10} y={M.top} width={IW + 20} height={IH}
                        fill="transparent"
                        onPointerMove={onMove}
                        onPointerLeave={() => setHover(null)}
                    />
                </svg>

                {hp && hover !== null && (
                    <div
                        className="graficaTooltip"
                        style={{ left: `${(hp.x / W) * 100}%`, top: `${(Math.min(hp.y, chart.meanPts[hover].y) / H) * 100}%` }}
                    >
                        <strong>{t[points[hover].key]}</strong>
                        <span><i className="dot dotMarket" />{money(chart.market[hover])}</span>
                        <span><i className="dot dotMean" />{money(chart.mean[hover])}</span>
                    </div>
                )}
            </div>

            <table className="srOnly">
                <caption>{t.priceHistory}</caption>
                <thead><tr><th /><th>{t.avgSeries}</th><th>{t.meanSeries}</th></tr></thead>
                <tbody>
                    {points.map((p, i) => (
                        <tr key={p.key}><th>{t[p.key]}</th><td>{money(chart.market[i])}</td><td>{money(chart.mean[i])}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default GraficaPrecios
