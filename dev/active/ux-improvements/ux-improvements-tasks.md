# UX Improvements - Tasks

## Sprint 1: Design Foundation

- [x] 1.1 Lägg till Google Fonts i index.html (Inter, Source Serif 4)
- [x] 1.2 Uppdatera CSS-variabler i index.css med ny färgpalett
- [x] 1.3 Uppdatera deptColors i constants.js
- [x] 1.4 Uppdatera regionColors i constants.js
- [x] 1.5 Applicera nya typsnitt (font-family) på body och headings
- [x] 1.6 Uppdatera cardStyle, headingStyle etc i MyndigheterApp
- [x] 1.7 Uppdatera dark mode färger för ny palett

## Sprint 2: Introduktion & GD

- [x] 2.1 Skapa IntroSection-komponent med:
  - Titel och beskrivning
  - "Vad du kan göra"-lista
  - Datakällor-sektion
  - Collapsible med localStorage-persistence
- [x] 2.2 Lägg till IntroSection i MyndigheterApp (före navigation)
- [x] 2.3 Lägg till GD-badge i myndighetsdetaljer (selectedAgency modal)
- [x] 2.4 Lägg till ledningsform (str) i myndighetsdetaljer
- [x] 2.5 Lägg till GD/ledningsform-statistik i Dashboard-vyn
- [x] 2.6 Skapa pie chart för Styrelse vs Enrådighet fördelning

## Sprint 3: Förbättrad Graf (Översikt)

- [x] 3.1 Skapa SeriesSelector-komponent med checkboxar
- [x] 3.2 Lägg till state för activeSeries (agencies, employees, population, gdp, women, men)
- [x] 3.3 Implementera normaliseringslogik (index 1978=100)
- [x] 3.4 Lägg till toggle "Visa som index"
- [x] 3.5 Uppdatera ComposedChart att rendera alla aktiva serier
- [x] 3.6 Förbättra Tooltip att visa alla aktiva serier med formatering
- [x] 3.7 Lägg till val av diagramtyp per serie (dropdown/toggle)
- [x] 3.8 Hantera edge cases (saknad data för vissa år)

## Sprint 4: Historisk Data - Regioner

- [x] 4.1 Skapa useMemo för regionHistoryData-beräkning
- [x] 4.2 Skapa RegionHistoryChart-komponent (StackedAreaChart)
- [x] 4.3 Lägg till årsspanns-slider i Region-vyn
- [x] 4.4 Lägg till toggle mellan "Nuvarande" och "Historik" i Region-vyn
- [x] 4.5 Visa absoluta tal och procent-fördelning
- [x] 4.6 Lägg till animerings-funktion (play genom åren)

## Sprint 5: Historisk Data - Departement

- [x] 5.1 Skapa departementsnamn-mappning för historiska namn
- [x] 5.2 Skapa useMemo för deptHistoryData-beräkning
- [x] 5.3 Skapa DeptHistoryChart-komponent (StackedAreaChart)
- [x] 5.4 Lägg till årsspanns-slider i Departement-vyn
- [x] 5.5 Lägg till toggle mellan "Nuvarande" och "Historik"
- [x] 5.6 Visa både antal myndigheter och anställda över tid (där data finns)

## Sprint 6: Departementsnamn Fix

- [x] 6.1 Identifiera var departementsnamn trunkeras
- [x] 6.2 Uppdatera CSS för full bredd på departementskolumn
- [x] 6.3 Skapa getShortDeptName hjälpfunktion
- [x] 6.4 Lägg till förkortningar med hover-tooltip (title-attribut)
- [x] 6.5 Testa alla 11 departement syns korrekt

## Sprint 7: Polish & QA

- [x] 7.1 Testa alla vyer på mobil (375px) - responsiva komponenter
- [x] 7.2 Testa alla vyer på tablet (768px) - grid-layout
- [x] 7.3 Testa dark mode med alla nya komponenter
- [x] 7.4 Kör npm run build och verifiera inga kritiska fel
- [x] 7.5 Bundle size check (176.25 kB gzipped)
- [x] 7.6 Uppdatera dev docs med completion status
- [ ] 7.7 Commit och push till GitHub (väntar på användarens godkännande)

---

## Progress Tracking

| Sprint | Status | Completed |
|--------|--------|-----------|
| 1. Design Foundation | COMPLETED | 7/7 |
| 2. Intro & GD | COMPLETED | 6/6 |
| 3. Förbättrad Graf | COMPLETED | 8/8 |
| 4. Historik Regioner | COMPLETED | 6/6 |
| 5. Historik Dept | COMPLETED | 6/6 |
| 6. Dept Fix | COMPLETED | 5/5 |
| 7. Polish | IN PROGRESS | 6/7 |

**Total: 44/45 tasks**

---

## New Components Created

1. `src/components/IntroSection.jsx` - Collapsible intro with features & data sources
2. `src/components/SeriesSelector.jsx` - Multi-series toggle with normalization
3. `src/components/RegionHistoryChart.jsx` - Historical region distribution
4. `src/components/DeptHistoryChart.jsx` - Historical department distribution

## Key Changes

- **Design System**: Inter + Source Serif 4 fonts, new color palette
- **Multi-series graphs**: Compare agencies, employees, population, GDP, gender data
- **Normalization**: Index-based comparison (base year = 100)
- **Historical visualizations**: Animated stacked area charts for regions and departments
- **GD/Ledningsform**: Added statistics and visualizations for agency leadership
- **Department names**: Short names with full name tooltips

---

## Last Updated
2025-11-29
