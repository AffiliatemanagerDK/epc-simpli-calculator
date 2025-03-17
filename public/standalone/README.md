
# EPC Beregner til Affiliateprogrammer

En standalone JavaScript beregneren til at beregne Earnings Per Click (EPC) for affiliateprogrammer. Beregneren kan nemt integreres på enhver hjemmeside uden afhængigheder.

## Integration

For at integrere EPC beregneren på din hjemmeside, skal du blot tilføje følgende kode:

```html
<!-- EPC Beregner Container -->
<div class="epc-calculator-container" data-currency="DKK"></div>

<!-- EPC Beregner Script -->
<script src="https://cdn.jsdelivr.net/gh/DITHUS/epc-calculator@main/public/standalone/epc-calculator.js"></script>
```

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

## Hostering af filer

Hvis du ønsker at hoste filerne selv i stedet for at bruge CDN, kan du:

1. Download `epc-calculator.js` filen
2. Upload filen til din egen server
3. Opdater script-tagget til at pege på din egen fil:

```html
<script src="path/to/your/epc-calculator.js"></script>
```
