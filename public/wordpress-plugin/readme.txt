
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

Denne plugin tilføjer en kraftfuld EPC (Earnings Per Click) beregner til din WordPress hjemmeside.

**Nøglefunktioner:**
* Beregn EPC baseret på Kommissionsprocent, Gennemsnitlig Ordreværdi og Konverteringsrate
* Estimér månedlige indtægter baseret på trafikmængde
* Interaktive skydere til nem beregning
* Fuldt responsivt design
* Elementor integration
* Understøtter både DKK og USD valuta

== Installation ==

1. Upload mappen `epc-calculator` til `/wp-content/plugins/` mappen
2. Aktivér pluginet via 'Plugins' menuen i WordPress
3. Brug shortcode `[epc_calculator]` i dine indlæg eller sider
4. Eller brug Elementor widgeten hvis du har Elementor installeret

For valutavalg, brug: `[epc_calculator currency="USD"]` (standard er DKK)

== Frequently Asked Questions ==

= Hvordan beregnes EPC? =
EPC (Earnings Per Click) beregnes ved at gange Kommissionsprocent med Gennemsnitlig Ordreværdi (AOV) med Konverteringsrate.

= Kan jeg tilpasse beregneren? =
Ja, du kan tilpasse beregnerens titel og valuta når du bruger Elementor widgeten.

= Hvorfor ser jeg ikke beregneren efter aktivering? =
Sørg for at du har tilføjet shortcoden `[epc_calculator]` til en side eller bruger Elementor widgeten. Hvis problemet fortsætter, tjek for JavaScript-fejl i din browsers konsol.

= Jeg får en fejl om "headers already sent" ved aktivering =
Dette kan ske hvis der er skjulte tegn i plugin-filen. Prøv disse løsninger:
1. Sørg for at alle PHP filer IKKE har whitespace eller tomme linjer før <?php tagget
2. Hvis du bruger en teksteditor, gem filerne som "UTF-8 without BOM" for at undgå byte order mark
3. Slet og geninstaller pluginet fra en frisk download
4. Tjek om dit tema sender output før pluginet aktiveres
5. Deaktiver alle andre plugins midlertidigt for at se om der er en konflikt
6. Øg PHP memory limit i din wp-config.php fil (f.eks. define('WP_MEMORY_LIMIT', '128M');)

= Er der nogen krav til dette plugin? =
Pluginet kræver WordPress 5.0 eller nyere og fungerer bedst med moderne browsere. Det har ingen andre plugin-afhængigheder.

= Kan jeg ændre farverne på beregneren? =
I øjeblikket er farverne fastsat til en teal/grøn gradient. Hvis du er fortrolig med CSS, kan du tilpasse farverne ved at tilføje brugerdefineret CSS til dit tema.

== Screenshots ==
1. EPC Beregner på en side
2. EPC Beregner i Elementor
3. Indstillinger for Elementor widgeten

== Changelog ==

= 1.0.0 =
* Første udgivelse
* Tilføjet responsivt design
* Tilføjet Elementor widget
* Tilføjet valutavalg (DKK/USD)
* Grundlæggende funktionalitet implementeret
* Fixet problem med "headers already sent" fejl under aktivering

== Upgrade Notice ==

= 1.0.0 =
Første udgivelse
