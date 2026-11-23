import { Lang } from "@/app/types/type"

const ui = {
  ES: {
    home: "Inicio", cards: "Cartas", news: "Noticias",
    searchPlaceholder: "Buscar cartas de Pokémon... (ej, Charizard, VMAX)",
    set: "Set", type: "Tipo", rarity: "Rareza", language: "Idioma",
    allSets: "Todos los sets", allTypes: "Todos los tipos", allRarities: "Todas las rarezas",
    page: (p: number, t: number) => `Página ${p} de ${t}`,
    prev: "Anterior", next: "Siguiente",
    results: (n: number) => `${n.toLocaleString("es-ES")} cartas`,
    noResults: "No se han encontrado cartas con esos filtros.",
    errorNetwork: "No se pudo conectar con la API de Pokémon TCG. Revisa tu conexión.",
    errorRateLimit: "Se ha superado el límite de peticiones de la API. Espera unos segundos y reintenta.",
    errorServer: "La API de Pokémon TCG no está respondiendo correctamente.",
    retry: "Reintentar",
    back: "Volver a cartas", close: "Cerrar",
    description: "Descripción", data: "Datos",
    setLabel: "Colección / Set", number: "Número", artist: "Ilustrador",
    subtype: "Subtipo", hp: "PS",
    priceHistory: "Historial de Precios (API)",
    currentPrice: "Precio Actual", maxPrice: "Precio Máximo", minPrice: "Precio Mínimo",
    noPrices: "Esta carta no tiene datos de Cardmarket disponibles.",
    noDescription: "Sin descripción disponible.",
    updated: (d: string) => `Cardmarket · actualizado el ${d}`,
    avgSeries: "Precio medio", meanSeries: "Media acumulada",
    window30: "30 días", window7: "7 días", window1: "24 h", trend: "Tendencia",
    addFav: "Añadir a favoritas", removeFav: "Quitar de favoritas",
    contact: "Contacto", terms: "Términos", privacy: "Privacidad",
    soon: "Próximamente",
    newsText: "Aquí aparecerán las últimas noticias del mundo de Pokémon TCG.",
    heroTitle: "Tu Pokédex de cartas con precios de mercado",
    heroText: "Busca cualquier carta de Pokémon TCG, filtra por set, tipo y rareza, y consulta sus precios en Cardmarket.",
    heroCta: "Explorar cartas",
    favorites: "Tus favoritas",
    favNav: "Favoritos",
    favText: "Aquí se mostrarán tus cartas favoritas.",
  },
  EN: {
    home: "Home", cards: "Cards", news: "News",
    searchPlaceholder: "Search Pokémon cards... (e.g. Charizard, VMAX)",
    set: "Set", type: "Type", rarity: "Rarity", language: "Language",
    allSets: "All sets", allTypes: "All types", allRarities: "All rarities",
    page: (p: number, t: number) => `Page ${p} of ${t}`,
    prev: "Previous", next: "Next",
    results: (n: number) => `${n.toLocaleString("en-US")} cards`,
    noResults: "No cards match those filters.",
    errorNetwork: "Could not reach the Pokémon TCG API. Check your connection.",
    errorRateLimit: "API rate limit exceeded. Wait a few seconds and retry.",
    errorServer: "The Pokémon TCG API is not responding properly.",
    retry: "Retry",
    back: "Back to cards", close: "Close",
    description: "Description", data: "Details",
    setLabel: "Collection / Set", number: "Number", artist: "Illustrator",
    subtype: "Subtype", hp: "HP",
    priceHistory: "Price History (API)",
    currentPrice: "Current Price", maxPrice: "Highest Price", minPrice: "Lowest Price",
    noPrices: "No Cardmarket data available for this card.",
    noDescription: "No description available.",
    updated: (d: string) => `Cardmarket · updated ${d}`,
    avgSeries: "Average price", meanSeries: "Running mean",
    window30: "30 days", window7: "7 days", window1: "24 h", trend: "Trend",
    addFav: "Add to favorites", removeFav: "Remove from favorites",
    contact: "Contact", terms: "Terms", privacy: "Privacy",
    soon: "Coming soon",
    newsText: "The latest Pokémon TCG news will show up here.",
    heroTitle: "Your card Pokédex with market prices",
    heroText: "Search any Pokémon TCG card, filter by set, type and rarity, and check its Cardmarket prices.",
    heroCta: "Browse cards",
    favorites: "Your favorites",
    favNav: "Favorites",
    favText: "Your favorite cards will show up here.",
  },
  JP: {
    home: "ホーム", cards: "カード", news: "ニュース",
    searchPlaceholder: "ポケモンカードを検索…（例：Charizard, VMAX）",
    set: "セット", type: "タイプ", rarity: "レアリティ", language: "言語",
    allSets: "すべてのセット", allTypes: "すべてのタイプ", allRarities: "すべてのレアリティ",
    page: (p: number, t: number) => `${t}ページ中 ${p}ページ`,
    prev: "前へ", next: "次へ",
    results: (n: number) => `${n.toLocaleString("ja-JP")} 枚`,
    noResults: "条件に一致するカードはありません。",
    errorNetwork: "Pokémon TCG API に接続できません。接続を確認してください。",
    errorRateLimit: "API のリクエスト上限に達しました。少し待ってから再試行してください。",
    errorServer: "Pokémon TCG API が正しく応答していません。",
    retry: "再試行",
    back: "カード一覧に戻る", close: "閉じる",
    description: "説明", data: "データ",
    setLabel: "コレクション / セット", number: "番号", artist: "イラスト",
    subtype: "サブタイプ", hp: "HP",
    priceHistory: "価格履歴 (API)",
    currentPrice: "現在価格", maxPrice: "最高価格", minPrice: "最低価格",
    noPrices: "このカードの Cardmarket データはありません。",
    noDescription: "説明はありません。",
    updated: (d: string) => `Cardmarket · ${d} 更新`,
    avgSeries: "平均価格", meanSeries: "累積平均",
    window30: "30日", window7: "7日", window1: "24時間", trend: "トレンド",
    addFav: "お気に入りに追加", removeFav: "お気に入りから削除",
    contact: "お問い合わせ", terms: "利用規約", privacy: "プライバシー",
    soon: "近日公開",
    newsText: "Pokémon TCG の最新ニュースがここに表示されます。",
    heroTitle: "相場価格つきカード図鑑",
    heroText: "ポケモンカードを検索し、セット・タイプ・レアリティで絞り込み、Cardmarket の価格を確認できます。",
    heroCta: "カードを見る",
    favorites: "お気に入り",
    favNav: "お気に入り",
    favText: "お気に入りのカードがここに表示されます。",
  },
}

export type Dictionary = (typeof ui)["ES"]
export const dictionaries: Record<Lang, Dictionary> = ui

export const locales: Record<Lang, string> = { ES: "es-ES", EN: "en-US", JP: "ja-JP" }

const typeNames: Record<string, Record<Lang, string>> = {
  Colorless: { ES: "Incoloro", EN: "Colorless", JP: "無色" },
  Darkness: { ES: "Oscuro", EN: "Darkness", JP: "悪" },
  Dragon: { ES: "Dragón", EN: "Dragon", JP: "ドラゴン" },
  Fairy: { ES: "Hada", EN: "Fairy", JP: "フェアリー" },
  Fighting: { ES: "Lucha", EN: "Fighting", JP: "闘" },
  Fire: { ES: "Fuego", EN: "Fire", JP: "炎" },
  Grass: { ES: "Planta", EN: "Grass", JP: "草" },
  Lightning: { ES: "Rayo", EN: "Lightning", JP: "雷" },
  Metal: { ES: "Metálico", EN: "Metal", JP: "鋼" },
  Psychic: { ES: "Psíquico", EN: "Psychic", JP: "超" },
  Water: { ES: "Agua", EN: "Water", JP: "水" },
}

export const translateType = (type: string, lang: Lang) => typeNames[type]?.[lang] ?? type

const seriesEs: Record<string, string> = {
  "Sword & Shield": "Espada y Escudo",
  "Scarlet & Violet": "Escarlata y Púrpura",
  "Sun & Moon": "Sol y Luna",
  "Black & White": "Negro y Blanco",
  "HeartGold & SoulSilver": "Oro HeartGold y Plata SoulSilver",
  "Diamond & Pearl": "Diamante y Perla",
  "Mega Evolution": "Megaevolución",
  "Platinum": "Platino",
  "Base": "Base",
  "Other": "Otros",
}

export const translateSeries = (series: string, lang: Lang) =>
  lang === "ES" ? seriesEs[series] ?? series : series

// Rarezas: palabras sueltas traducidas en el orden natural del español
// ("Rare Holo V" -> "Rara Holo V", "Illustration Rare" -> "Rara Ilustración").
const rarityWordsEs: Record<string, string> = {
  Rare: "Rara", Common: "Común", Uncommon: "Poco común", Secret: "Secreta",
  Illustration: "Ilustración", Special: "Especial", Double: "Doble", Hyper: "Híper",
  Ultra: "Ultra", Amazing: "Asombrosa", Radiant: "Radiante", Shiny: "Shiny",
  Rainbow: "Arcoíris", Shining: "Brillante", Promo: "Promo", Classic: "Clásica",
  Collection: "Colección", Trainer: "Entrenador", Gallery: "Galería",
  Futuristic: "Futurista", Black: "Negra", White: "Blanca",
}

const rarityOverridesEs: Record<string, string> = {
  "Special Illustration Rare": "Rara Ilustración Especial",
  "Trainer Gallery Rare Holo": "Rara Holo Galería de Entrenadores",
  "Shiny Ultra Rare": "Rara Ultra Shiny",
  "ACE SPEC Rare": "Rara AS TÁCTICO",
}

export const translateRarity = (rarity: string, lang: Lang) => {
  if (lang !== "ES") return rarity
  if (rarityOverridesEs[rarity]) return rarityOverridesEs[rarity]
  const words = rarity.replace(/_/g, " ").split(" ")
  // En español "Rare" va delante: "Illustration Rare" -> "Rare Illustration".
  const rareIdx = words.findIndex((w) => /^rare$/i.test(w))
  if (rareIdx > 0) words.unshift(...words.splice(rareIdx, 1))
  return words.map((w) => rarityWordsEs[w] ?? rarityWordsEs[w.charAt(0) + w.slice(1).toLowerCase()] ?? w).join(" ")
}
