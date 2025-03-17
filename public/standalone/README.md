
# EPC Beregner til Affiliateprogrammer

En standalone JavaScript beregneren til at beregne Earnings Per Click (EPC) for affiliateprogrammer. Beregneren kan nemt integreres på enhver hjemmeside uden afhængigheder.

## Netlify Deployment

For at deploye denne beregner via Netlify:

1. Opret en konto på [Netlify](https://www.netlify.com/)
2. Upload dette projekt til et GitHub repository
3. Gå til Netlify dashboard og klik på "New site from Git"
4. Vælg dit GitHub repository
5. Sæt følgende indstillinger:
   - Build command: (lad denne være tom)
   - Publish directory: `public/standalone`
6. Klik på "Deploy site"

Efter deployment, vil din beregner være tilgængelig på den URL, som Netlify genererer.

## Integration

For at integrere EPC beregneren på din hjemmeside, skal du blot tilføje følgende kode:

```html
<!-- EPC Beregner Container -->
<div class="epc-calculator-container" data-currency="DKK"></div>

<!-- EPC Beregner Script -->
<script src="https://your-netlify-site.netlify.app/epc-calculator.js"></script>
```

Erstat `your-netlify-site.netlify.app` med din faktiske Netlify URL.

Du kan vælge hvilken valuta beregneren skal bruge (DKK eller USD) ved at ændre `data-currency` attributten:

```html
<div class="epc-calculator-container" data-currency="USD"></div>
```

## Funktioner

- Beregn EPC baseret på kommissionsprocent, gennemsnitlig ordreværdi og konverteringsrate
- Viser en score for dit affiliateprogram baseret på EPC-værdien
- Understøtter både DKK og USD valuta
- Responsivt design, der tilpasser sig alle skærmstørrelser
- Selvstændig JavaScript-fil der injecter alt nødvendigt CSS og HTML
- Ingen afhængigheder eller konflikter med eksisterende biblioteker

## Hvordan det fungerer

1. Scriptet injecter nødvendigt CSS og HTML i containeren.
2. Beregneren bruger sliders til at justere kommissionsprocent, gennemsnitlig ordreværdi og konverteringsrate.
3. EPC beregnes dynamisk baseret på formlen: Kommissionsprocent × Gennemsnitlig ordreværdi × Konverteringsrate
4. Beregneren viser det beregnede EPC og en score for dit affiliateprogram.
