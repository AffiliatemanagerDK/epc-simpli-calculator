
=== EPC Calculator ===
Contributors: yourname
Tags: calculator, affiliate, marketing, epc, earnings
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

En kraftfuld EPC (Earnings Per Click) beregner til affiliate marketers.

== Description ==

Dette plugin tilføjer en kraftfuld EPC (Earnings Per Click) beregner til din WordPress-hjemmeside.

**Nøglefunktioner:**
* Beregn EPC baseret på Kommissionsprocent, Gennemsnitlig Ordreværdi og Konverteringsrate
* Estimer månedlige indtægter baseret på trafikmængde
* Interaktive skydere til nem beregning
* Fuldt responsivt design
* Elementor-integration

== Installation ==

1. Upload `epc-calculator`-mappen til `/wp-content/plugins/` mappen
2. Aktiver pluginet via 'Plugins' menuen i WordPress
3. Brug shortcode `[epc_calculator]` i dine indlæg eller sider
4. Eller brug Elementor-widgeten, hvis du har Elementor installeret

**Standalone Integration:**
Hvis du ønsker at integrere beregneren direkte i din HTML uden WordPress, kan du bruge følgende kode:
```html
<!-- EPC Beregner Container -->
<div class="epc-calculator-container" data-currency="DKK"></div>

<!-- EPC Beregner Script -->
<script src="https://din-netlify-side.netlify.app/epc-calculator.js"></script>
```
Erstat 'din-netlify-side.netlify.app' med din faktiske Netlify URL efter deployment.

== Frequently Asked Questions ==

= Hvordan beregnes EPC? =
EPC (Earnings Per Click) beregnes ved at gange Kommissionsprocenten med den Gennemsnitlige Ordreværdi (AOV) med Konverteringsraten.

= Kan jeg tilpasse beregneren? =
Ja, du kan tilpasse beregnerens titel, når du bruger Elementor-widgeten, og du kan vælge mellem DKK og USD valuta.

== Screenshots ==
1. EPC Calculator på en side
2. EPC Calculator i Elementor

== Changelog ==

= 1.0.0 =
* Første udgivelse
