# UX Improvements Plan - Myndigheter

## Översikt
Omfattande förbättringar av myndighetsverktyget med fokus på:
1. Förbättrad grafvisualisering med flera dataserier
2. Historisk data för regioner och departement
3. Moderniserad design och typografi
4. Introduktionssektion med källhänvisningar
5. GD-information för myndigheter
6. Förbättrad departementsvisning

---

## Fas 1: Förbättrad Multi-Axis Graf (Översikt)

### Problem
- Nuvarande graf har bara 2 Y-axlar (vänster/höger)
- Svårt att jämföra data med olika skalor (BNP i miljarder vs antal myndigheter ~200)
- Begränsade visualiseringsalternativ

### Lösning
1. **Normaliserad jämförelsevy**
   - Lägg till toggle: "Visa som index (1978=100)"
   - Alla serier normaliseras till samma startpunkt
   - Gör det enklare att se relativa trender

2. **Förbättrad dataserier-väljare**
   - Checkboxar för varje dataserie:
     - Antal myndigheter
     - Antal anställda (FTE)
     - Befolkning
     - BNP
     - Antal kvinnor i staten
     - Antal män i staten
   - Varje serie får egen färg och linjestil

3. **Förbättrad tooltip**
   - Visa alla aktiva serier
   - Visa både absoluta tal och procentuell förändring
   - Visa årlig tillväxttakt

4. **Diagramtyps-alternativ per serie**
   - Möjlighet att visa vissa serier som staplar, andra som linjer
   - T.ex. antal myndigheter som staplar, BNP som linje

### Teknisk implementation
```jsx
// Ny state för aktiva serier
const [activeSeries, setActiveSeries] = useState({
  agencies: true,
  employees: false,
  population: false,
  gdp: false,
  women: false,
  men: false
});

const [normalizeData, setNormalizeData] = useState(false);
const [seriesChartType, setSeriesChartType] = useState({
  agencies: 'bar',
  employees: 'line',
  population: 'line',
  gdp: 'line',
  women: 'area',
  men: 'area'
});
```

---

## Fas 2: Historisk Data för Regioner

### Problem
- Regioner visar endast nuvarande fördelning
- Ingen trendanalys möjlig

### Lösning
1. **Beräkna historisk regiondata**
   - Använd befintlig `s` (start) och `e` (end) för varje myndighet
   - Beräkna antal myndigheter per region för varje år 1978-2025
   - Använd `city` fältet för regiontillhörighet

2. **Ny regionvy med tidslinje**
   - Stacked area chart: regioner över tid
   - Slider för att välja årsspann
   - Alternativ: animerad visualisering över tid

3. **Implementering**
```jsx
// Beräkna regionhistorik
const regionHistoryData = useMemo(() => {
  const years = [];
  for (let year = 1978; year <= 2025; year++) {
    const activeAgencies = currentAgenciesData.filter(a => {
      const startYear = a.s ? parseInt(a.s.split('-')[0]) : 1900;
      const endYear = a.e ? parseInt(a.e.split('-')[0]) : 2100;
      return startYear <= year && endYear >= year;
    });

    const regionCounts = {
      year,
      Stockholm: 0, Göteborg: 0, Malmö: 0, Uppsala: 0, Övrigt: 0
    };

    activeAgencies.forEach(a => {
      const region = getRegionForCity(a.city);
      regionCounts[region]++;
    });

    years.push(regionCounts);
  }
  return years;
}, [currentAgenciesData]);
```

---

## Fas 3: Historisk Data för Departement

### Problem
- Endast nuvarande departementsfördelning visas
- Kan inte se hur departement växt/krympt över tid

### Lösning
1. **Beräkna departementshistorik**
   - Samma logik som regioner
   - OBS: Departement har bytt namn/struktur över tid
   - Behöver mappning för historiska departementsnamn

2. **Departementsvy med tidslinje**
   - Stacked bar chart eller stream graph
   - Visa antal myndigheter per departement över tid
   - Visa antal anställda per departement över tid (där data finns)

3. **Departementsnamn-mappning**
```javascript
const deptNameMapping = {
  // Nuvarande namn → historiska namn som mappar hit
  'Klimat- och näringslivsdepartementet': [
    'Näringsdepartementet',
    'Miljödepartementet',
    'Klimat- och miljödepartementet'
  ],
  // ... etc
};
```

### Fix: Departementsnamn i tabell
- Säkerställ att fullständiga namn visas
- Ingen trunkering av långa namn
- Responsive layout som hanterar långa namn

---

## Fas 4: Moderniserad Design

### Typografi
1. **Primärt typsnitt: Inter**
   - Modern, neutral, utmärkt läsbarhet
   - Google Fonts: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')`

2. **Sekundärt typsnitt för rubriker: Source Serif 4**
   - Akademisk känsla
   - Kontrast mot brödtext

3. **Typografisk skala**
```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Source Serif 4', Georgia, serif;

  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
```

### Färgpalett - Ljus, Fräsch, Akademisk

```css
:root {
  /* Primära färger - Dämpad blå (seriös, förtroendeingivande) */
  --primary-50: #f0f7ff;
  --primary-100: #e0efff;
  --primary-200: #bae0ff;
  --primary-300: #7cc4ff;
  --primary-400: #36a3ff;
  --primary-500: #0c80f0;
  --primary-600: #0062cc;
  --primary-700: #004da6;
  --primary-800: #004080;
  --primary-900: #003366;

  /* Accenter - Varma toner för kontrast */
  --accent-warm: #d97706;   /* Amber för BNP/ekonomi */
  --accent-teal: #0d9488;   /* Teal för befolkning */
  --accent-rose: #be185d;   /* Rose för kvinnor */
  --accent-indigo: #4f46e5; /* Indigo för män */

  /* Neutrala - Lätt varma gråtoner */
  --neutral-50: #fafaf9;
  --neutral-100: #f5f5f4;
  --neutral-200: #e7e5e4;
  --neutral-300: #d6d3d1;
  --neutral-400: #a8a29e;
  --neutral-500: #78716c;
  --neutral-600: #57534e;
  --neutral-700: #44403c;
  --neutral-800: #292524;
  --neutral-900: #1c1917;

  /* Semantiska färger */
  --success: #059669;
  --warning: #d97706;
  --error: #dc2626;
  --info: #0284c7;

  /* Bakgrunder */
  --bg-page: #fafaf9;
  --bg-card: #ffffff;
  --bg-elevated: #ffffff;

  /* Skuggor - Mjukare, mer subtila */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02);
}
```

### Uppdaterade departementssfärger
```javascript
const deptColors = {
  'Justitiedepartementet': '#0c80f0',      // Primär blå
  'Finansdepartementet': '#059669',         // Grön (pengar)
  'Utbildningsdepartementet': '#7c3aed',   // Lila
  'Socialdepartementet': '#be185d',         // Rose
  'Klimat- och näringslivsdepartementet': '#0d9488', // Teal
  'Kulturdepartementet': '#8b5cf6',         // Violet
  'Försvarsdepartementet': '#475569',       // Slate
  'Arbetsmarknadsdepartementet': '#0891b2', // Cyan
  'Landsbygds- och infrastrukturdepartementet': '#65a30d', // Lime
  'Utrikesdepartementet': '#0284c7',        // Sky
  'Statsrådsberedningen': '#dc2626',        // Röd (viktig)
};
```

### Designelement
1. **Kort**
   - Vit bakgrund med subtil skugga
   - 1px border i neutral-200
   - Border-radius: 12px
   - Padding: 24px

2. **Knappar**
   - Primär: Solid blå med vit text
   - Sekundär: Vit med blå border
   - Ghost: Transparent med hover-state

3. **Grafer**
   - Ljus bakgrund (ingen grå)
   - Tunna gridlinjer
   - Tydliga färger för dataserier
   - Animerade övergångar

---

## Fas 5: Introduktionssektion

### Innehåll
```markdown
# Svenska Myndigheter

Ett interaktivt verktyg för att utforska Sveriges myndigheter -
historiskt och idag.

## Vad du kan göra
- Utforska 978 myndigheter (618 aktiva, 356 nedlagda)
- Se utvecklingen 1978-2025
- Jämför med befolkning och BNP
- Analysera per departement, region och kategori
- Sök och filtrera i myndighetsregistret

## Datakällor
- **Civic Tech Sweden** - Myndighetsdata (myndighetsdata GitHub)
- **ESV** - Ekonomistyrningsverket (anställningsstatistik)
- **SCB** - Statistiska centralbyrån (befolkning, BNP, kontaktuppgifter)
- **STKT** - Statskontoret (organisationsstruktur)
- **Wikidata** - Start/slutdatum, Wikipedia-länkar
- **SFS** - Svensk författningssamling (instruktioner)

Senast uppdaterad: [datum] | Data cacheas lokalt i 24 timmar
```

### Implementation
- Collapsible sektion högst upp
- Visa minimerad som default efter första besöket
- LocalStorage för att minnas användarens preferens

---

## Fas 6: GD-information

### Tillgänglig data
- `gd: boolean` - Har myndigheten en GD?
- `str: string` - Ledningsform (Styrelse/Enrådighet/etc.)

### Visning i myndighetsdetaljer
```jsx
<div className="info-row">
  <span className="label">Ledningsform</span>
  <span className="value">
    {agency.str || 'Ej angivet'}
    {agency.gd && (
      <span className="badge">Generaldirektör</span>
    )}
  </span>
</div>
```

### Statistik i Dashboard
- Antal myndigheter med GD
- Fördelning Styrelse vs Enrådighet
- Pie chart eller bar chart

---

## Fas 7: Departementsnamn Fix

### Problem
Långa departementsnamn trunkeras i tabellen

### Lösning
1. **Responsiv kolumnbredd**
   - `min-width: 200px` för departementkolumn
   - `word-wrap: break-word` för långa namn

2. **Tooltip för fullständigt namn**
   - Visa fullständigt namn vid hover

3. **Alternativ: Förkortningar med legend**
   ```javascript
   const deptAbbreviations = {
     'Klimat- och näringslivsdepartementet': 'KN',
     'Landsbygds- och infrastrukturdepartementet': 'LI',
     // ...
   };
   ```
   - Visa förkortning i tabell
   - Legend med fullständiga namn

---

## Implementeringsordning

### Sprint 1: Design Foundation (Dag 1)
1. [ ] Lägg till Google Fonts (Inter, Source Serif 4)
2. [ ] Uppdatera CSS-variabler med ny färgpalett
3. [ ] Uppdatera deptColors och regionColors
4. [ ] Applicera nya typsnitt på headings och body

### Sprint 2: Introduktion & GD (Dag 1)
5. [ ] Skapa IntroSection-komponent
6. [ ] Lägg till GD-info i myndighetsdetaljer
7. [ ] Lägg till ledningsform-statistik i Dashboard

### Sprint 3: Förbättrad Graf (Dag 2)
8. [ ] Implementera dataserie-väljare med checkboxar
9. [ ] Lägg till normaliserings-toggle (index)
10. [ ] Förbättra tooltip med alla aktiva serier
11. [ ] Möjliggör olika diagramtyper per serie

### Sprint 4: Historisk Data (Dag 2-3)
12. [ ] Beräkna regionHistoryData
13. [ ] Skapa RegionHistoryChart-komponent
14. [ ] Beräkna deptHistoryData
15. [ ] Skapa DeptHistoryChart-komponent
16. [ ] Lägg till tidslinje-kontroller

### Sprint 5: Polish & Fixes (Dag 3)
17. [ ] Fixa departementsnamn i tabell
18. [ ] Finjustera responsiv design
19. [ ] Testa dark mode med ny palett
20. [ ] Performance-optimering

---

## Risker och Begränsningar

1. **Historisk departementsdata**
   - Departement har bytt namn/struktur
   - Mappning kan vara ofullständig
   - *Mitigation:* Dokumentera antaganden, visa "okänt" för osäkra

2. **GD-data begränsad**
   - Endast boolean, inga namn/datum
   - *Mitigation:* Visa det vi har, länka till Wikipedia för mer

3. **Performance**
   - Historisk beräkning för 978 myndigheter × 48 år
   - *Mitigation:* useMemo, virtualisering vid behov

4. **Bundle size**
   - Google Fonts ökar laddtid
   - *Mitigation:* font-display: swap, subset för svenska tecken

---

## Definition of Done

- [ ] Alla checkboxar ovan markerade
- [ ] Build passerar utan fel
- [ ] Responsiv på mobil/tablet/desktop
- [ ] Dark mode fungerar
- [ ] Lighthouse score > 90
- [ ] Dokumentation uppdaterad
