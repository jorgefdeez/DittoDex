import "./style.css"

const energy: Record<string, { glyph: string; color: string }> = {
    Fire: { glyph: "🔥", color: "#f97316" },
    Water: { glyph: "💧", color: "#3b82f6" },
    Lightning: { glyph: "⚡", color: "#facc15" },
    Grass: { glyph: "🌿", color: "#22c55e" },
    Psychic: { glyph: "🔮", color: "#a855f7" },
    Fighting: { glyph: "👊", color: "#b45309" },
    Darkness: { glyph: "🌙", color: "#334155" },
    Metal: { glyph: "⚙️", color: "#94a3b8" },
    Fairy: { glyph: "✨", color: "#f472b6" },
    Dragon: { glyph: "🐉", color: "#ca8a04" },
    Colorless: { glyph: "⭐", color: "#cbd5e1" },
}

const EnergyIcon = ({ type, size = 20, label }: { type: string; size?: number; label?: string }) => {
    const e = energy[type] ?? { glyph: "•", color: "#64748b" }
    return (
        <span
            className="energyIcon"
            style={{ width: size, height: size, fontSize: size * 0.85, ["--energy" as string]: e.color }}
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            title={label}
        >
            {e.glyph}
        </span>
    )
}

export default EnergyIcon
