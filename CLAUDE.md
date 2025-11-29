# Myndigheter - React Components

## Overview
React-komponenter för att visa information om svenska myndigheter. Deployas automatiskt till GitHub Pages.

**Live site:** https://isakskogstad.github.io/myndigheter

## Tech Stack
- React 18
- Create React App (react-scripts 5.0.1)
- GitHub Pages för hosting
- GitHub Actions för CI/CD

## Project Structure
```
src/
├── App.js       # Huvudkomponent
├── App.css      # Styling för App
├── index.js     # Entry point
└── index.css    # Global styling

public/          # Statiska filer
.github/
└── workflows/
    ├── deploy.yml              # Auto-deploy till GitHub Pages
    ├── claude.yml              # Claude Code integration (@claude)
    └── claude-code-review.yml  # Auto PR reviews
```

## Commands
```bash
npm install      # Installera dependencies
npm start        # Kör lokalt (localhost:3000)
npm run build    # Bygg för produktion
npm run deploy   # Manuell deploy till GitHub Pages
npm test         # Kör tester
```

## Development Guidelines

### Code Style
- Använd funktionella komponenter med hooks
- Svenska för UI-text, engelska för kod/kommentarer
- Håll komponenter små och återanvändbara
- CSS i separata filer (inte inline)

### Git Workflow
- `main` branch triggar automatisk deploy
- Skapa feature branches för nya funktioner
- PR reviews körs automatiskt av Claude

### When Making Changes
1. Testa lokalt med `npm start`
2. Kör `npm run build` för att verifiera build
3. Commita med beskrivande meddelanden på svenska/engelska
4. Push till main för auto-deploy

## Claude Code Instructions

### For Issues
När någon taggar `@claude` i en issue:
- Analysera problemet
- Föreslå lösning med kod
- Skapa PR om möjligt

### For PR Reviews
- Granska kodkvalitet
- Kontrollera React best practices
- Verifiera att build fungerar
- Ge konstruktiv feedback

### Allowed Operations
- Läsa och analysera kod
- Skapa och uppdatera filer
- Köra build/test kommandon
- Skapa commits och PRs
- Kommentera på issues/PRs

## Notes
- Projektet använder svenska myndigheter som tema
- Håll det enkelt - detta är ett demo/portfolio projekt
- GitHub Pages deployment sker via `gh-pages` branch
