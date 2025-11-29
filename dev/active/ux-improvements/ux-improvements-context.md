# UX Improvements - Context

## Nyckelfiles

### Huvudfiler att modifiera
| Fil | Syfte | Ändringar |
|-----|-------|-----------|
| `src/index.css` | Global styling | Ny färgpalett, typsnitt, CSS-variabler |
| `src/MyndigheterApp.jsx` | Huvudkomponent | Alla UI-ändringar |
| `src/data/constants.js` | Färger, data | Uppdatera deptColors, regionColors |

### Nya filer att skapa
| Fil | Syfte |
|-----|-------|
| `src/components/IntroSection.jsx` | Introduktionssektion med källinfo |
| `src/components/SeriesSelector.jsx` | Dataserie-väljare för grafer |
| `src/components/RegionHistoryChart.jsx` | Historisk regionvy |
| `src/components/DeptHistoryChart.jsx` | Historisk departementsvy |

---

## Befintlig datastruktur

### Agency object (compact)
```javascript
{
  n: string,      // namn
  en: string,     // english name
  sh: string,     // short name
  d: string,      // department
  org: string,    // org number
  s: string,      // start date (YYYY-MM-DD)
  e: string,      // end date
  emp: number,    // employees
  fte: number,    // FTE
  w: number,      // women
  m: number,      // men
  empH: object,   // employee history {year: count}
  wH: object,     // women history
  mH: object,     // men history
  fteH: object,   // FTE history
  str: string,    // structure (Styrelse/Enrådighet)
  gd: boolean,    // has GD
  cof: number,    // COFOG code
  host: string,   // host authority
  grp: string,    // group category
  web: string,    // website
  wiki: string,   // Wikipedia URL
  wdId: string,   // Wikidata ID
  email: string,  // email
  tel: string,    // phone
  city: string,   // city
  addr: string,   // address
  post: string,   // postal address
  sfs: string,    // SFS reference
  sfsAll: array,  // all SFS refs
}
```

### timeSeriesData (1978-2025)
```javascript
{ year, count, dissolved, emp }
```

### genderHistoryData (1990-2024)
```javascript
{ year, w, m, pct }
```

### swedenStats (1978-2025)
```javascript
{ year, population, gdp }
```

---

## Befintliga färger

### Department Colors (constants.js)
```javascript
deptColors = {
  'Justitiedepartementet': '#dc2626',
  'Finansdepartementet': '#16a34a',
  'Utbildningsdepartementet': '#9333ea',
  'Socialdepartementet': '#ec4899',
  'Klimat- och näringslivsdepartementet': '#f59e0b',
  'Kulturdepartementet': '#8b5cf6',
  'Försvarsdepartementet': '#475569',
  'Arbetsmarknadsdepartementet': '#0891b2',
  'Landsbygds- och infrastrukturdepartementet': '#65a30d',
  'Utrikesdepartementet': '#0284c7',
  'Statsrådsberedningen': '#be123c',
}
```

### Region Colors
```javascript
regionColors = {
  'Stockholm': '#3b82f6',
  'Göteborg': '#10b981',
  'Malmö': '#f59e0b',
  'Uppsala': '#8b5cf6',
  'Övrigt': '#6b7280',
}
```

---

## Viktiga beslut

1. **Typsnitt**: Inter (sans) + Source Serif 4 (headings) - båda från Google Fonts
2. **Färgpalett**: Dämpad blå som primär, varma accenter
3. **Normalisering**: Index-baserad (startår = 100) för jämförelse
4. **Historisk beräkning**: Dynamisk baserat på s/e datum per myndighet
5. **Departementsmappning**: Behöver manuell mappning för historiska namn

---

## Integration points

### ComposedChart (Recharts)
- Stödjer 2 Y-axlar (left/right)
- För fler serier: använd normalisering eller separata grafer
- Bar, Line, Area kan mixas

### useMemo för beräkningar
- regionHistoryData beräknas från agencies + years
- deptHistoryData beräknas från agencies + years
- Beroenden: [currentAgenciesData]

### LocalStorage
- darkMode: boolean
- introCollapsed: boolean
- myndigheter_data_cache_v3: cached API data

---

## Känd teknisk skuld

1. `handleUndo`/`handleRedo` används före definition (eslint warning)
2. `isLoading`, `setIsLoading` unused
3. `Skeleton` component unused
4. Missing dependencies i useEffect arrays

---

## Last Updated
2025-11-29
