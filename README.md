# DittoDex

Buscador y catálogo de cartas de Pokémon TCG con precios de mercado de Cardmarket, construido con Next.js 16 (App Router) y la [Pokémon TCG API v2](https://docs.pokemontcg.io).

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### API key (opcional)

La API funciona sin clave, pero con un límite de peticiones más bajo. Para usar tu clave, crea `.env.local` en la raíz:

```
NEXT_PUBLIC_POKEMON_TCG_API_KEY=tu-clave
```

Se envía en la cabecera `X-Api-Key` (ver `src/api/axios.ts`).

## Estructura

```
src/
  api/
    axios.ts          Cliente axios: API key, reintentos ante 429/5xx, tipos de error
    pokemonTcg.ts     Endpoints /cards, /sets, /rarities, /types y construcción de la query `q`
  app/
    page.tsx          Inicio
    cartas/           Catálogo con filtros, grid, paginación y modal de detalle
    noticias/         Placeholder
    components/       Un componente por carpeta: index.tsx + style.css
    types/type.ts     Tipos de la API
    utils/            i18n (ES/EN/JP) y cálculo/formato de precios
  context/Provider.tsx  Favoritas e idioma (persistidos en localStorage)
  machine_learning/     Reservado para fases futuras
  web_scraping/         Reservado para fases futuras
```

## Notas sobre los datos

- pokemontcg.io solo publica cartas en inglés. El selector **Idioma** traduce la interfaz y los vocabularios de los filtros (tipos, rarezas, series); nombres y textos de las cartas siguen en inglés.
- Cardmarket no ofrece un histórico mensual: la gráfica usa las medias reales de `avg30`, `avg7`, `avg1` y `trendPrice`, junto con su media acumulada. Las cartas sin datos de Cardmarket muestran «N/D».
