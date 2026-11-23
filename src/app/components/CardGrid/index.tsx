'use client'
import Image from "next/image"
import { Card } from "@/app/types/type"
import { PAGE_SIZE } from "@/api/pokemonTcg"

import "./style.css"

type Props = {
    cards: Card[]
    loading: boolean
    onSelect: (card: Card) => void
}

const CardGrid = ({ cards, loading, onSelect }: Props) => {
    if (loading) {
        return (
            <div className="cardGrid" aria-busy="true">
                {Array.from({ length: PAGE_SIZE }, (_, i) => <div key={i} className="cardSkeleton" />)}
            </div>
        )
    }

    return (
        <ul className="cardGrid">
            {cards.map((card) => (
                <li key={card.id}>
                    <button className="cardItem" onClick={() => onSelect(card)} aria-label={`${card.name} · ${card.set.name}`}>
                        <Image
                            src={card.images.small}
                            alt={card.name}
                            width={245}
                            height={342}
                            sizes="(min-width: 1400px) 130px, (min-width: 900px) 16vw, 45vw"
                            unoptimized
                        />
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default CardGrid
