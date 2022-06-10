<!-- mit Kommentar gibt bei gedit Syntaxhighlightning --> 
<template>
  <div>
  <!-- style="font-family:Arial, Helvetica, sans-serif;" -->
    <!-- Kommt von
    https://stackoverflow.com/questions/49516424/use-style-tags-inside-vuejs-template-and-update-from-data-model/57331310#57331310
    -->
    <!-- wichtiger Kommentar, nicht entfernen: -->
    <!-- eslint-disable vue/require-component-is -->
    <component is="style">
      @media print {
        #Header, #Footer {display: none !important; }
      }

      @page {
        size: a4;
      }

      html {
        background-color: #FFFFFF;
        margin: 0px; /* this affects the margin on the HTML before sending to      printer */
      }

      body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 9pt;
        margin: 0;
      }

      .printblock {
        break-inside: avoid;
        margin-bottom: 15mm;
      }

      h1 {
        margin-top: 0;
        font-size: 18pt;
      }

      h2 {
        margin: 2mm 0 0 0;
        font-size: 10pt;
        text-decoration:underline;
      }

      h3 {
        margin: 0 0 2mm 0;
        font-size: 10pt;
      }

      table {
        break-inside: avoid;
/*        page-break-inside: avoid;*/
        font-size: 9pt;
      }

      table.mitrahmen {
        break-inside: avoid;
        width: 190mm;
        font-size: 9pt;
        border: thin solid black;
        border-collapse: separate;
        border-spacing: 2mm 0mm;
      }

      table.mitrand {
        width: 190mm;
        font-size: 9pt;
        border-collapse: collapse;
      }
      table.mitrand td, table.mitrand th {
        border: thin solid black;
      }

      table.sachwert {
        width: 190mm;
        font-size: 9pt;
        border-collapse: collapse;
        border: thin solid black;
/*        border-collapse: separate;*/
/*        border-spacing: 2mm 0mm;*/

        margin-bottom: 3mm;
      }

      table.sachwert td, table.sachwert th {
        border: thin solid black;
      }


      table.gesamtsumme {
        width: 190mm;
        font-size: 9pt;
        margin-top: 5mm;
        text-align: right;
        font-weight:bold;
        border: thin solid black;
        border-collapse: separate;
        border-spacing: 2mm 0mm;
      }

      table.insgesamt {
        width: 190mm;
        font-size: 10pt;
        border:thin solid black;
        border-collapse: separate;
        border-spacing: 2mm 0mm;
        padding: 3mm;
      }

      div.multicolumn {
        display: table;
        width: calc(100% - 10pt);
        font-size: 8pt;
        margin-bottom: 3mm;
      }
      div.onecolumn { 
        display: table-cell;
//        border: thin solid red;
        width: 90mm;
        margin-bottom: 4mm;
      }

      .fett {
        font-weight: bold;
      }
    </component>


    <CustomKopf :custom="custom"/>

    <p>
      Die Werte der Anpflanzungen werden gemäß der Methode Koch ermittelt.
      Diese Methode wurde mehrfach bestätigt durch den BGH.
      Die Wertermittlung der Pflanzungen erfolgt in Anlehnung an die
      aktualisierten Gehölzwerttabellen und die "Richtlinie für die
      Wertermittlung von Schutz- und Gestaltungsgrün, Baumschulpflanzen und
      Dauerkulturen der FLL (Forschungsgesellschaft Landschaftsentwicklung
      Landschaftsbau e.V.)".
      Werte der Gartenlaube und Nebenanlagen werden in Anlehnung an die
      Empfehlungen des Sachverständigenkuratoriums (SVK) ermittelt.
      Die Wertermittlung erfolgt gemäß §11 BKleingG (Bundeskleingartengesetz).
    </p>

    <table style="font-size:9t">
      <tr>
        <td style="width:45mm">Stadt-/Ortsverband:</td>
        <td colspan="3"><strong>{{wep.grunddaten.verband}}</strong></td>
      </tr><tr>
        <td>Kleingarten-Anlage:</td>
        <td colspan="3"><strong>{{wep.grunddaten.anlage}}</strong></td>
      </tr><tr>
        <td>Parzellen-Nummer:</td>
        <td style="width:60mm"><strong>{{wep.grunddaten.parzellennummer}}</strong></td>
        <td>Fläche der Parzelle:</td>
        <td><strong>{{wep.grunddaten.parzellenflaeche}}</strong> m²</td>
      </tr><tr>
        <td>Pächter(in):</td>
        <td><strong>{{wep.grunddaten.paechtername}}</strong></td>
        <td>Datum der Begehung:</td>
        <td><strong>{{deutschesDatum}}</strong></td>
      </tr>
      <tr v-if="custom.AdressEingabe">
        <td colspan="2">Straße:
           <strong>{{wep.grunddaten.strasse}}</strong></td>
        <td>Wohnort:</td>
        <td><strong>{{wep.grunddaten.ort}}</strong></td>
      </tr>
      <tr>
        <td>Anwesend bei der Begehung:</td>
        <td colspan="3"><strong>{{alleAnwesenden}}</strong></td>
      </tr>
    </table>

    <h2 style="padding-top:5mm">
     Tabelle 1 - Bewertung der Gartenlaube (incl. Überdachung Freisitz,
     An- und Nebenbauten)
    </h2>
    <div class="multicolumn">
      <div class="onecolumn">
        <h2>Gartenhaus</h2>
        <h3>Grunddaten:</h3>
        <table>
          <tbody>
            <tr>
              <td style="width:25mm">Grundfläche</td>
              <td>
                <strong>{{wep.gebaeude[0].flaeche}}</strong> m²
                <small>(Außenkante x Außenkante Wand)</small>
              </td>
            </tr><tr v-if="wep.gebaeude[0].flaecheZuviel">
              <td>unberücksichtigt</td>
              <td><strong>{{wep.gebaeude[0].flaecheZuviel}}</strong> m²</td>
            </tr><tr>
              <td>Höhe</td>
              <td><strong>{{wep.gebaeude[0].hoehe}}</strong> m</td>
            </tr><tr>
              <td>Baujahr</td>
              <td>
                <strong>{{wep.gebaeude[0].baujahr}}</strong>
                (Alter {{wep.grunddaten.datum.substring(0,4) - 
                    wep.gebaeude[0].baujahr}} Jahre)
              </td>
            </tr>
          </tbody>
        </table>
        <h3>Ausführung</h3>
        <table>
          <tbody>
            <tr v-for="(a, ai) in wep.gebaeude[0].ausstattung" :key="ai">
              <td>{{a.name}}:</td>
              <td>
                <strong>
                <template v-for="s in a.selected">
                  {{s}},
                </template>
                {{a.ergaenzung}}
                </strong>
              </td>
            </tr><tr>
              <td>Anzahl Fenster:</td>
              <td><strong>{{wep.gebaeude[0].fenster}}</strong> Stück</td>
            </tr><tr>
              <td>Anzahl Türen:</td>
              <td><strong>{{wep.gebaeude[0].tueren}}</strong> Stück</td>
            </tr><tr>
              <td style="vertical-align:top">Zustand:</td>
              <td>
                <template v-if="custom.ZustandsArray">
                  <p style="font-weight:bold; margin-top:0mm; margin-bottom:1mm"
                     v-for="(z, zi) in wep.gebaeude[0].zustandArray" :key="zi">
                    {{ z }}
                  </p>
                </template>
                <template v-else>
                  <strong>{{wep.gebaeude[0].zustand}}</strong>
                </template>
              </td>
            </tr>
            <tr v-if="!wep.gebaeude[0].alternativ">
              <td colspan="2">
                <strong>Abschreibungssatz:</strong>
                <span style="padding-right:5mm"></span>
                <strong>{{wep.gebaeude[0].abschreibungssatz}} %</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="onecolumn">
        <h2>Überdachter Freisitz</h2>
        <table>
          <tbody>
            <tr>
              <td style="width:25mm">Fläche</td>
              <td><strong>{{wep.gebaeude[1].flaeche}}</strong> m²</td>
            </tr><tr>
              <td>Baujahr</td>
              <td>
                <strong>{{wep.gebaeude[1].baujahr}}</strong>
                (Alter {{wep.grunddaten.datum.substring(0,4) - 
                wep.gebaeude[1].baujahr}} Jahre)
              </td>
            </tr><tr>  
              <td colspan="2">einbezogen in Dachkonstruktion:
                <strong>
                  {{wep.gebaeude[1].einbezogen ? 'ja' : 'nein'}}
                </strong>
              </td>
            </tr><tr>
              <td style="vertical-align:top">Ausführung</td>
              <td>
                <template v-if="custom.ZustandsArray">
                  <p style="font-weight:bold; margin-top:0mm; margin-bottom:1mm"
                     v-for="(z, zi) in wep.gebaeude[1].zustandArray" :key="zi">
                    {{ z }}
                  </p>
                </template>
                <template v-else>
                  <strong>{{wep.gebaeude[1].zustand}}</strong>
                </template>
              </td>
            </tr>
            <tr v-if="!wep.gebaeude[1].alternativ">
              <td colspan="2">
                <strong>Abschreibungssatz:</strong>
                <span style="padding-right:5mm"></span>
                <strong>{{wep.gebaeude[1].abschreibungssatz}} %</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-for="(g, gi) in wep.gebaeude" :key="gi">
          <template v-if="g.art=='Renovierung' || g.art=='Schaden'">
            <h2>{{g.art}}</h2>
            <table>
              <tbody>
                <tr>
                  <td style="width:25mm">Fläche</td>
                  <td><strong>{{g.flaeche}}</strong> m²</td>
                </tr><tr>
                  <td>Jahr</td>
                  <td>
                    <strong>{{g.baujahr}}</strong>
                    (Alter {{wep.grunddaten.datum.substring(0,4) -
                    g.baujahr}} Jahre)
                  </td>
                </tr><tr>
                  <td>Erläuterung</td>
                  <td><strong>{{g.zustand}}</strong></td>
                </tr>
                <tr v-if="!g.alternativ">
                  <td colspan="2">
                    <strong>Abschreibungssatz</strong>
                    <span style="padding-right:5mm"></span>
                    <strong>{{g.abschreibungssatz}} %</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-if="g.art=='Anbau' || g.art=='Nebenbau'">
            <h2>{{g.art}}</h2>
            <table>
              <tbody>
                <tr>
                  <td style="width:25mm">Grundfläche</td>
                  <td>
                    <strong>{{g.flaeche}}</strong>
                    m²
                    <small>(Außenkante x Außenkante Wand)</small>
                  </td>
                </tr><tr>
                  <td>Höhe</td>
                  <td><strong>{{g.hoehe}}</strong> m</td>
                </tr><tr>
                  <td>Baujahr</td>
                  <td>
                    <strong>{{g.baujahr}}</strong>
                    (Alter {{wep.grunddaten.datum.substring(0,4) - 
                    g.baujahr}} Jahre)
                  </td>
                </tr>
                <template v-for="(a, ai) in g.ausstattung">
                  <template v-if="a.selected.length != 0 || a.ergaenzung">
                    <tr :key="ai">
                      <td>{{a.name}}:</td>
                      <td>
                        <strong>
                          <template v-for="s in a.selected">
                            {{s}},
                          </template>
                          {{a.ergaenzung}}
                        </strong>
                      </td>
                    </tr>
                  </template>
                </template>
                <tr v-if="g.fenster!=0">
                  <td>Anzahl Fenster:</td>
                  <td><strong>{{g.fenster}}</strong> Stück</td>
                </tr><tr v-if="g.tueren!=0">
                  <td>Anzahl Türen:</td>
                  <td><strong>{{g.tueren}}</strong> Stück</td>
                </tr><tr>
                  <td style="vertical-align:top">Zustand:</td>
                  <td>
                    <template v-if="custom.ZustandsArray">
                      <p style="font-weight:bold; margin-top:0mm; margin-bottom:1mm"
                         v-for="(z, zi) in g.zustandArray" :key="zi">
                        {{ z }}
                      </p>
                    </template>
                    <template v-else>
                      <strong>{{g.zustand}}</strong>
                    </template>
                  </td>
                </tr>
                <tr v-if="!g.alternativ">
                  <td colspan="2">
                    <strong>Abschreibungssatz:</strong>
                    <span style="padding-right:5mm"></span>
                    <strong>{{g.abschreibungssatz}} %</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      </div> <!-- onecolumn -->
    </div>

    
    <div class="printblock">
      <h3>
        Berechnungsschema Gartenlaube, überdachter Freisitz, An- und Nebenbauten
      </h3>
      <p v-if="mindEinZeitwert">
        <strong>Anmerkung:</strong>
        Übersteigt der nach der Berechnungsformel (Normalherstellungswert x
        Grundfläche x Baukostenindex - Abschreibung)
        errechnete Wert einer Gartenlaube den tatsächlichen Anschaffungswert
        unverhältnismäßig, kann der Zeitwert
        einer Gartenlaube aus dem Anschaffungswert abzüglich einer jährlichen
        Abschreibung von 2-5% errechnet werden.
      </p>
      <p v-if="mindEinRestwert">
        <strong>Anmerkung:</strong>
        Aufgrund des Alters und einem überdurchschnittlich guten Zustand
        <template v-if="mindEinZeitwert">
          wird bei einzelnen Baulichkeiten
        </template>
        <template v-else>
          der Baulichkeiten wird
        </template>
        eine Restwertberechnung durchgeführt.
      </p>
      <table class="mitrahmen" style="page-break-inside:avoid;">
        <tbody>

          <!-- Zeitwert -->

          <template v-if="mindEinZeitwert">
          <tr>
            <th>Formel für</th>
            <th>Normalher-</th>
            <th></th>
            <th></th>
            <th></th>
            <th>Baukosten-</th>
            <th></th>
            <th>Zwischen-</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Zeitwert</th>
            <th>stellungswert</th>
            <th>x</th>
            <th>Grundfläche</th>
            <th>x</th>
            <th>index</th>
            <th>=</th>
            <th>summe</th>
            <th>-</th>
            <th>Abschreibung</th>
            <th>=</th>
            <th>Zeitwert</th>
          </tr>
          <template v-for="(g, gi2) in wep.gebaeude">
            <tr v-if="!g.alternativ" :key="gi2">
            <td> {{g.art}} </td>
            <td style="text-align:right">
              {{g.normalherstellungswert.toLocaleString("de-DE",
                {minimumFractionDigits: 2})}}
            </td>
            <td> x </td>
            <td style="text-align:right"> {{g.flaeche}} m² </td>
            <td> x </td>
            <td style="text-align:right">
              {{wep.baukostenindex.toLocaleString("de-DE",
                {minimumFractionDigits: 3})}}
            </td>
            <td> = </td>
            <td style="text-align:right">
              {{ formatEuro(neuwert(g)) }}
            </td>
            <td> - </td>
            <td style="text-align:right">
              {{ gesamtAbschreibung(g.baujahr, g.abschreibungssatz).toLocaleString("de-DE",
                {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} %
            </td>
            <td> = </td>
            <td style="text-align:right">
              {{ formatEuro(zeitwert(g)) }}
            </td>
            </tr>
          </template>
          </template>

          <!-- Restwert -->

          <template v-if="mindEinRestwert">
            <tr style="height:3mm"/>
            <tr>
              <th>Formel für</th>
              <th>Normalher-</th>
              <th></th>
              <th></th>
              <th></th>
              <th>Baukosten-</th>
              <th></th>
              <th>Zwischen-</th>
              <th></th>
              <th>prozentualer</th>
              <th></th>
              <th></th>
            </tr>
            <tr>
               <th>Restwert</th>
              <th>stellungswert</th>
              <th>x</th>
              <th>Grundfläche</th>
              <th>x</th>
              <th>index</th>
              <th>=</th>
              <th>summe</th>
              <th>x</th>
              <th>Restwert</th>
              <th>=</th>
              <th>Restwert</th>
            </tr>
            <template v-for="(g, gi3) in wep.gebaeude">
              <tr v-if="g.alternativ" :key="gi3">
                <td> {{g.art}} </td>
                <td style="text-align:right">
                  {{g.normalherstellungswert.toLocaleString("de-DE",
                    {minimumFractionDigits: 2})}}
                </td>
                <td> x </td>
                <td style="text-align:right"> {{g.flaeche}} m² </td>
                <td> x </td>
                <td style="text-align:right">
                  {{wep.baukostenindex.toLocaleString("de-DE",
                    {minimumFractionDigits: 3})}}
                </td>
                <td> = </td>
                <td style="text-align:right">
                  {{ formatEuro(neuwert(g)) }}
                </td>
                <td> x </td>
                <td style="text-align:right">
                  {{ g.prozentualerRestwert }} %
                </td>
                <td> = </td>
                <td style="text-align:right">
                  {{ formatEuro(restwert(g)) }}
                </td>
              </tr>
            </template>
          </template>

          <tr style="height:2mm"/>
          <tr>
            <td colspan="7"></td>
            <td colspan="4" style="padding-top:3mm; font-weight:bold;">Gesamtsumme Baulichkeiten</td>
            <td style="text-align:right; font-weight:bold; padding-top:3mm;">
              {{ formatEuro(gesamtsummeBau) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="printblock">
      <h2>
       Tabelle 2 - Bewertung der Nebenanlagen
      </h2>
      <table class="mitrand">
        <thead>
          <tr>
            <th style="border-bottom-style:none">Art der Nebenanlage</th>
            <th style="border-bottom-style:none">Menge</th>
            <th style="border-bottom-style:none">Einheit</th>
            <th style="border-bottom-style:none">Bewertungskriterien</th>
            <th style="border-bottom-style:none">Grundpreis</th>
            <th style="border-bottom-style:none">Wertmind.</th>
            <th style="border-bottom-style:none">Endpreis</th>
          </tr>
          <tr>
            <th style="border-top-style:none"></th>
            <th style="border-top-style:none"></th>
            <th style="border-top-style:none"></th>
            <th style="border-top-style:none; font-size:smaller;">(z.B. Material, Alter, Zustand, Beeinträchtigungnen)</th>
            <th style="border-top-style:none"></th>
            <th style="border-top-style:none"></th>
            <th style="border-top-style:none"></th>
          </tr>  
        </thead>
        <tbody>
          <tr v-for="(v, vi1) in wep.vorhanden[0]" :key="vi1">
            <td> {{v.key}} </td>
            <td style="text-align:center"> {{v.menge}} </td>
            <td style="text-align:center"> {{v.einheit}} </td>
            <td> {{v.kriterien}} </td>
            <td style="text-align:right">
              {{ formatEuro(v.grundpreis) }}
            </td>
            <td style="text-align:right"> {{v.minderung}}&nbsp;% </td>
            <td style="text-align:right">
              {{ formatEuro(wertVorhanden(v)) }}
            </td>
          </tr>
        </tbody>
      </table>
      <table class="gesamtsumme">
        <tbody>
          <tr>
            <td>
              Gesamtsumme Nebenanlagen
            </td>
            <td style="width:30mm; padding:1mm;">
              {{ formatEuro(summeNebenanlagen) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="printblock" v-for="kategorie in 2" :key="kategorie">
      <h2 v-if="kategorie==1">
       Tabelle 3 - Bewertung der gärtnerischen Kulturen
      </h2>
      <h2 v-if="kategorie==2">
       Tabelle 4 - Bewertung Schutz- und Gestaltungsgrün
      </h2>
      <table class="sachwert" v-for="(v, vi2) in wep.vorhanden[kategorie]" :key="vi2">
        <tbody>
          <template v-if="v.summentyp==1">

            <!-- Bodenverbesserung -->

            <tr style="background-color: #D0D0D0;">
              <td></td>
              <td>Berechnung des Sachwertes</td>
              <td style="text-align:center;"><strong>{{v.menge}} {{v.einheit}}</strong></td>
              <td><strong>{{v.key}}</strong></td>
              <td></td>
            </tr>
            <tr>
              <td>Ze2</td>
              <td>Netto-Katalogpreis</td>
              <td style="text-align:center">
                <strong>
                  {{formatEuro(v.grundpreis)}}
                </strong>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze3</td>
              <td>Gehölzpreis</td>
              <td></td>
              <td>Ze1 x Ze2</td>
              <td style="text-align:right">{{formatEuro(gehoelzpreis(v))}}</td>
            </tr>
            <tr>
              <td>Ze19</td>
              <td>Wertminderung für Mängel und Vorschäden</td>
              <td style="text-align:center"><strong>{{v.minderung}}%</strong></td>
              <td>von Ze3</td>
              <td style="text-align:right">{{formatEuro(preisMinderungBeet(v))}}</td>
            </tr>
            <tr>
              <td></td>
              <td colspan="3">
                Minderungsgründe:
                <template v-for="m in v.minderungsgruende">
                  {{m}},
                </template>
              </td>
              <td></td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze20</td>
              <td>Sachwert zum Stichtag</td>
              <td></td>
              <td></td>
              <td style="text-align:right">
                <strong>{{formatEuro(sachwertZumStichtag(v))}}</strong>
              </td>
            </tr>


          </template>
          <template v-if="v.summentyp==5">

            <!-- Rasen / Beete -->

            <tr style="background-color: #D0D0D0;">
              <td></td>
              <td>Berechnung des Sachwertes</td>
              <td style="text-align:center;"><strong>{{v.menge}} {{v.einheit}}</strong></td>
              <td><strong>{{v.key}}</strong></td>
              <td></td>
            </tr>
            <tr>
              <td>Ze2</td>
              <td>Netto-Katalogpreis</td>
              <td style="text-align:center">
                <strong>
                  {{formatEuro(v.grundpreis)}}
                </strong>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze3</td>
              <td>Gehölzpreis</td>
              <td></td>
              <td>Ze1 x Ze2</td>
              <td style="text-align:right">{{formatEuro(gehoelzpreis(v))}}</td>
            </tr>
            <tr>
              <td>Ze4</td>
              <td>Pflanzung</td>
              <td style="text-align:center">{{v.pflanzung}}&nbsp;%</td>
              <td>von Ze3</td>
              <td style="text-align:right">{{formatEuro(preisPflanzung(v))}}</td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze5</td>
              <td>Kosten der Investition</td>
              <td></td>
              <td>Ze3 + Ze4</td>
              <td style="text-align:right">{{formatEuro(kostenInvestition(v))}}</td>
            </tr>

            <tr>
              <td>Ze19</td>
              <td>Wertminderung für Mängel und Vorschäden</td>
              <td style="text-align:center"><strong>{{v.minderung}}%</strong></td>
              <td>von Ze3</td>
              <td style="text-align:right">{{formatEuro(preisMinderungBoden(v))}}</td>
            </tr>
            <tr>
              <td></td>
              <td colspan="3">
                Minderungsgründe:
                <template v-for="m in v.minderungsgruende">
                  {{m}},
                </template>
              </td>
              <td></td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze20</td>
              <td>Sachwert zum Stichtag</td>
              <td></td>
              <td></td>
              <td style="text-align:right">
                <strong>{{formatEuro(sachwertZumStichtag(v))}}</strong>
              </td>
            </tr>




          </template>
          <template v-if="v.summentyp!=1 && v.summentyp!=5">
            <tr style="background-color: #D0D0D0;">
              <td></td>
              <td>Berechnung des Sachwertes</td>
              <td style="text-align:center;"><strong>{{v.menge}} {{v.einheit}}</strong></td>
              <td><strong>{{v.key}}</strong></td>
              <td></td>
            </tr>
            <tr>
              <td>Ze2</td>
              <td>Netto-Katalogpreis</td>
              <td style="text-align:center">
                <strong>
                  {{formatEuro(v.grundpreis)}}
                </strong>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze3</td>
              <td>Gehölzpreis</td>
              <td></td>
              <td>Ze1 x Ze2 + 19% MwSt.</td>
              <td style="text-align:right">{{formatEuro(gehoelzpreis(v))}}</td>
            </tr>
            <tr>
              <td>Ze4</td>
              <td>Pflanzung</td>
              <td style="text-align:center">{{v.pflanzung}}&nbsp;%</td>
              <td>von Ze3</td>
              <td style="text-align:right">{{formatEuro(preisPflanzung(v))}}</td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze5</td>
              <td>Kosten der Investition</td>
              <td></td>
              <td>Ze3 + Ze4</td>
              <td style="text-align:right">{{formatEuro(kostenInvestition(v))}}</td>
            </tr>

            <tr>
              <td>Ze6</td>
              <td>jährliche Anwuchspflege</td>
              <td style="text-align:center">{{v.pflege}} %</td>
              <td>von Ze4</td>
              <td style="text-align:right">{{formatEuro(pflegeProJahr(v))}}</td>
            </tr>
            <tr>
              <td>Ze7</td>
              <td>jährlicher Zinsanspruch</td>
              <td style="text-align:center">{{wep.grunddaten.zinssatz}} %</td>
              <td>von Ze5</td>
              <td style="text-align:right">{{formatEuro(zinsProJahr(v))}}</td>
            </tr>
            <tr>
              <td>Ze8</td>
              <td>Rentenendwertfaktor</td>
              <td style="text-align:center">
                {{ rentenendwertfaktor(3).toLocaleString("de-DE", 
                  {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}
              </td>
              <td>({{ wep.grunddaten.zinssatz }} % für 3 Jahre)</td>
              <td></td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze9</td>
              <td>Kosten für 3-jährige Anwuchsphase</td>
              <td></td>
              <td>(Ze6 + Ze7) x Ze8</td>
              <td style="text-align:right">{{formatEuro(kostenAnwuchsphase(v))}}</td>
            </tr>

            <tr>
              <td>Ze10</td>
              <td>Anwachsrisiko</td>
              <td style="text-align:center">{{v.anwachsrisiko}} %</td>
              <td>von Ze5 + Ze9</td>
              <td style="text-align:right">{{formatEuro(preisAnwachsrisiko(v))}}</td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze11</td>
              <td>Gehölz gepflanzt und angewachsen</td>
              <td></td>
              <td>Ze5 + Ze9 + Ze10</td>
              <td style="text-align:right">{{formatEuro(preisAngewachsen(v))}}</td>
            </tr>

            <tr>
              <td>Ze12</td>
              <td>Herstellungsdauer</td>
              <td style="text-align:center">{{v.herstellungsdauer}}</td>
              <td>Jahre</td>
              <td></td>
            </tr>
            <tr>
              <td>Ze13</td>
              <td>Kapitalendwertfaktor</td>
              <td style="text-align:center">
                {{ kapitalendwertfaktor(v.herstellungsdauer).toLocaleString("de-DE", 
                  {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}
              </td>
              <td>({{wep.grunddaten.zinssatz}} % für {{v.herstellungsdauer}} Jahre)</td>
              <td></td>
            </tr>
            <tr>
              <td>Ze14</td>
              <td>Verzinsung des angewachsenen Gehölzes</td>
              <td></td>
              <td>Ze11 x Ze13</td>
              <td style="text-align:right">{{formatEuro(zinsAngewachsen(v))}}</td>
            </tr>
            <tr>
              <td>Ze15</td>
              <td>Rentenendwertfaktor</td>
              <td style="text-align:center">
                {{ rentenendwertfaktor(v.herstellungsdauer).toLocaleString("de-DE", 
                  {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}
              </td>
              <td>({{wep.grunddaten.zinssatz}} % für {{v.herstellungsdauer}} Jahre)</td>
              <td></td>
            </tr>
            <tr>
              <td>Ze16</td>
              <td>Fachliche Leistungen bei Herstellung</td>
              <td></td>
              <td>30% x Ze6 x Ze15</td>
              <td style="text-align:right">{{formatEuro(preisHerstellung(v))}}</td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze17</td>
              <td>Gesamtherstellungskosten</td>
              <td></td>
              <td>Ze14 + Ze16</td>
              <td style="text-align:right">{{formatEuro(gesamtherstellungskosten(v))}}</td>
            </tr>
            <tr>
              <td>Ze18</td>
              <td>Alterswertminderung</td>
              <td style="text-align:center"><strong>{{v.alterswertminderung}}%</strong></td>
              <td>von Ze17</td>
              <td style="text-align:right">{{formatEuro(preisAlterswertminderung(v))}}</td>
            </tr>
            <tr>
              <td>Ze19</td>
              <td>Minderung</td>
              <td style="text-align:center"><strong>{{v.minderung}}%</strong></td>
              <td>von (Ze17 - Ze18)</td>
              <td style="text-align:right">{{formatEuro(preisMinderung(v))}}</td>
            </tr>
            <tr>
              <td></td>
              <td colspan="3">
                Minderungsgründe:
                <template v-for="m in v.minderungsgruende">
                  {{m}},
                </template>
              </td>
              <td></td>
            </tr>
            <tr style="background-color: #D0D0D0;">
              <td>Ze20</td>
              <td>Sachwert zum Stichtag</td>
              <td></td>
              <td></td>
              <td style="text-align:right">
                <strong>{{formatEuro(sachwertZumStichtag(v))}}</strong>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <table class="gesamtsumme">
        <tbody>
          <tr v-if="kategorie==1">
            <td>
              Gesamtsumme gärtnerische Kulturen zum Stichtag
            </td>
            <td style="width:30mm; padding:1mm;">
              {{ formatEuro(summeKulturenKoch) }}
            </td>
          </tr>
          <tr v-if="kategorie==2">
            <td>
              Gesamtsumme Schutz- und Gestaltungsgrün zum Stichtag
            </td>
            <td style="width:30mm; padding:1mm;">
              {{ formatEuro(summeZierKoch) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="printblock">
      <h1 style="text-align:center;">ERGEBNIS DER WERTERMITTLUNG</h1>
      <p v-if="wep.nichtbewertet.length!=0" style="padding-top:10mm;">
        Nicht bewertete Anlagen (mit Begründung für die unterbliebene Wertung,
        evtl. Ansatz für Beseitigung):
        <ul>
          <li style="font-weight:bold;" v-for="(n, ni) in wep.nichtbewertet" :key="ni">
            {{ n.name }}
          </li>
        </ul>
      </p>
      <p v-if="wep.auflagen.length!=0" style="padding-top:10mm;">
        Auflagen
        <ul>
          <li style="font-weight:bold;" v-for="(a, ai) in wep.auflagen" :key="ai">
            {{a.name}} ({{a.preis}} €)
          </li>
        </ul>
      </p>
      <template v-if="wep.gesamtbewertung">
        <p style="padding-top:10mm;">Gesamtbewertung des Gartens</p>
        <p  style="font-weight:bold; padding: 0mm 9mm 10mm 9mm;">
          {{wep.gesamtbewertung}}
        </p>
      </template>

      <table class="insgesamt">

        <tbody>
          <tr>
            <td>Gesamtsumme Tabelle 1 (Baulichkeiten):</td>
            <td style="text-align:right">
              {{ formatEuro(gesamtsummeBau) }}
            </td>
          </tr>
          <tr>
            <td>Gesamtsumme Tabelle 2 (Nebenanlagen):</td>
            <td style="text-align:right">
              {{ formatEuro(summeNebenanlagen) }}
            </td>
          </tr>
          <tr>
            <td>Gesamtsumme Tabelle 3 (Gärtnerische Kulturen):</td>
            <td style="text-align:right">
              {{ formatEuro(summeKulturenKoch) }}
            </td>
          </tr>
          <tr>
            <td>Gesamtsumme Tabelle 4 (Schutz- und Gestaltungsgrün):</td>
            <td style="text-align:right">
              {{ formatEuro(summeZierKoch) }}
            </td>
          </tr>
          <tr v-if="wep.auflagen.length!=0">
            <td>Abzug für Beseitigung von Anpflanzungen und Anlagen:</td>
            <td style="text-align:right">
              {{ formatEuro(-summeAuflagen) }}
            </td>
          </tr>
          <tr style="height: 3mm;"/>
          <tr>
            <td style="font-weight:bold;">Entschädigung insgesamt netto:</td>
            <td style="text-align:right; font-weight:bold;">
              {{ formatEuro(entschaedigungKoch) }}
            </td>
          </tr>
          <tr>
            <td style="font-weight:bold;">Entschädigung insgesamt brutto (inkl. 19% MwSt):</td>
            <td style="text-align:right; font-weight:bold;">
              {{ formatEuro(entschaedigungKoch*1.19) }}
            </td>
          </tr>
        </tbody>
      </table>

      <CustomUnterschrift :custom="custom" />

    </div>
  </div>
</template>


<script>
import Kopf from '../customize/Kopf.vue'
import Unterschrift from '../customize/Unterschrift.vue'

export default {

  props: ['custom'],

  components: {
    'CustomKopf': Kopf,
    'CustomUnterschrift': Unterschrift,
  },


  methods: {

    rundeCent: function(x) {
      return Math.round(100*x)/100;
    },

    wertVorhanden(v) {
      return Math.round(v.grundpreis*v.menge*(100-v.minderung)) / 100;
    },

    accVorhanden(acc, v) {
      return acc + this.wertVorhanden(v);
    },

    gesamtAbschreibung(jahr, satz) {
      let gesamt = (this.wep.grunddaten.datum.substring(0,4) - jahr) * satz;
      if (gesamt > 100.0) { gesamt = 100.0 }
      return this.rundeCent(gesamt);
    },

    neuwert: function(g) {
      return this.rundeCent(g.normalherstellungswert*g.flaeche*this.wep.baukostenindex);
    },

    restwert: function(g) {
      const r = g.prozentualerRestwert * 0.01 * this.neuwert(g);
      return (g.art=='Schaden') ? (-r) : r;
    },

    zeitwert: function(g) {
      const neuwert = this.neuwert(g);
      const abschreibung = this.gesamtAbschreibung(g.baujahr, g.abschreibungssatz);
      const r = neuwert*(1 - 0.01*abschreibung);
      return (g.art=='Schaden') ? (-r) : r;
    },

    formatEuro: function(x) {
        return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(x);
    },




    /* Methode Koch */

    gehoelzpreis: function(v) {
      return v.menge * v.grundpreis; // * 1.19;
    },

    preisPflanzung: function(v) {
      return v.pflanzung * this.gehoelzpreis(v) * 0.01;
    },

    kostenInvestition: function(v) {
      return this.gehoelzpreis(v) + this.preisPflanzung(v);
    },

    pflegeProJahr: function(v) {
      return v.pflege * this.preisPflanzung(v) * 0.01;
    },

    zinsProJahr: function(v) {
      return this.wep.grunddaten.zinssatz * this.kostenInvestition(v) * 0.01;
    },

    kapitalendwertfaktor: function(jahre) {
      return Math.pow((this.wep.grunddaten.zinssatz * 0.01) + 1, jahre);
    },

    rentenendwertfaktor: function(jahre) {
      return (100 * (this.kapitalendwertfaktor(jahre) - 1)) 
        / this.wep.grunddaten.zinssatz;
    },

    kostenAnwuchsphase: function(v) {
      return (this.pflegeProJahr(v) + this.zinsProJahr(v))
        * this.rentenendwertfaktor(3);
    },

    preisAnwachsrisiko: function(v) {
      return v.anwachsrisiko * (this.kostenInvestition(v) + this.kostenAnwuchsphase(v)) * 0.01;
    },

    preisAngewachsen: function(v) {
      return this.kostenInvestition(v) + this.kostenAnwuchsphase(v) + this.preisAnwachsrisiko(v);
    },

    zinsAngewachsen: function(v) {
      return this.preisAngewachsen(v) * this.kapitalendwertfaktor(v.herstellungsdauer);
    },

    preisHerstellung: function(v) {
      return this.pflegeProJahr(v) * 0.3 * this.rentenendwertfaktor(v.herstellungsdauer);
    },

    gesamtherstellungskosten: function(v) {
      return this.zinsAngewachsen(v) + this.preisHerstellung(v);
    },

    preisAlterswertminderung: function(v) {
      return v.alterswertminderung * this.gesamtherstellungskosten(v) * 0.01;
    },

    preisMinderung: function(v) {
      return v.minderung * (this.gesamtherstellungskosten(v) - this.preisAlterswertminderung(v)) * 0.01;
    },

    preisMinderungBeet: function(v) {
      return v.minderung * this.kostenInvestition(v) * 0.01;
    },

    preisMinderungBoden: function(v) {
      return v.minderung * this.gehoelzpreis(v) * 0.01;
    },

    sachwertZumStichtag: function(v) {
        if (v.summentyp==1) /* Nebenanlagen und Bodenverbesserung */
            return (v.menge * v.grundpreis * (100-v.minderung) * 0.01);
        if (v.summentyp==5) /* Rasen und Beete */
            return (v.menge * v.grundpreis * (100+v.pflanzung) * (100-v.minderung) * 0.0001);
      return this.gesamtherstellungskosten(v) - this.preisAlterswertminderung(v) - this.preisMinderung(v);
    }






  },

  computed: {

    alleAnwesenden() {
      let s = this.wep.grunddaten.anwesend;
      if (this.wep.grunddaten.paechteranwesend) {
        if (s) {
          s = "Pächter(in) " + this.wep.grunddaten.paechtername + " und " + s;
        } else {
          s = "Pächter(in) " + this.wep.grunddaten.paechtername;
        }
      }
      return s;
    },

    deutschesDatum() {
        let s = this.wep.grunddaten.datum;
        return s[8]+s[9]+"."+s[5]+s[6]+"."+s[0]+s[1]+s[2]+s[3];
    },

    // mindestens einmal nicht die alternative Berechnungsmethode ausgewählt?
    mindEinZeitwert() {
      return this.wep.gebaeude.reduce((acc, g) => acc | !g.alternativ,
        false);
    },

    // mindestens einmal alternative Berechnungsmethode ausgewählt?
    mindEinRestwert() {
      return this.wep.gebaeude.reduce((acc, g) => acc | g.alternativ,
        false);
    },

    warnBefestigt() {
      return (10*this.befestigteFlaeche > this.wep.grunddaten.parzellenflaeche);
    },

    rasenFlaeche() {
      return this.wep.vorhanden[2].reduce(
        (acc, v) => acc + (v.summentyp==5 ? v.menge : 0),
        0);
    },

    // Wenn es Rasenteile mit unterschiedlichen Minderungen gibt und die
    // Gesamtrasenfläche 1/3 der Parzelle überschreitet, wird eine
    // durchschnittliche Minderung ausgerechnet, die mit der gedeckelten
    // Rasenfläche multipliziert wird
    durchschnittsWertRasen() {
      return (this.rasenFlaeche==0) ? 0 : (this.zwischensummeRasen / this.rasenFlaeche)
    },

    gedeckeltRasen () {
        let flaeche = Math.min(this.rasenFlaeche, this.wep.grunddaten.parzellenflaeche/3);
        return this.rundeCent(flaeche * this.durchschnittsWertRasen);
    },


    gesamtsummeBau : function() {
      return this.wep.gebaeude.reduce((acc, g) => acc +
        (g.alternativ ? this.restwert(g) : this.zeitwert(g)), 0);
    },

    summeNebenanlagen : function() {
      return this.wep.vorhanden[0].reduce(this.accVorhanden, 0);
    },

    summeKulturen : function() {
      return this.wep.vorhanden[1].reduce((acc, v) => acc + this.wertVorhanden(v), 0);
    },

    zwischensummeZiergehoelz : function() {
      return this.wep.vorhanden[2].reduce(
        (acc, v) => acc + (v.summentyp==3 ? this.wertVorhanden(v) : 0),
        0);
    },

    zwischensummeStauden : function() {
      return this.wep.vorhanden[2].reduce(
        (acc, v) => acc + (v.summentyp==4 ? this.wertVorhanden(v) : 0),
        0);
    },

    zwischensummeRasen : function() {
      return this.wep.vorhanden[2].reduce(
        (acc, v) => acc + (v.summentyp==5 ? this.wertVorhanden(v) : 0),
        0);
    },

    gesamtsummeZier : function() {
      const ziergehoelz = Math.min(this.zwischensummeZiergehoelz, 500.00);
      const stauden = Math.min(this.zwischensummeStauden, 300.00);
      return ziergehoelz + stauden + this.gedeckeltRasen;
    },

    summeAuflagen : function() {
      let sum = 0;
      for (const a of this.wep.auflagen) {
        sum = sum + parseInt(a.preis);
      }
      return sum;
    },

    geminderteKulturen () {
      return Math.round(this.summeKulturen * (100-this.wep.minderungKulturen)) / 100;
    },

    geminderteZier () {
      return Math.round(this.gesamtsummeZier * (100-this.wep.minderungZier)) / 100;
    },

    entschaedigung : function () {
      const sum = this.gesamtsummeBau
        + this.summeNebenanlagen
        + this.geminderteKulturen
        + this.geminderteZier
        + parseInt(this.wep.leistungen)
        - this.summeAuflagen;
      return sum;
    },




    /* Methode Koch */

    summeKulturenKoch : function() {
      return this.wep.vorhanden[1].reduce((acc, v) => acc + this.sachwertZumStichtag(v), 0);
    },

    summeZierKoch : function() {
      return this.wep.vorhanden[2].reduce((acc, v) => acc + this.sachwertZumStichtag(v), 0);
    },

    entschaedigungKoch : function () {
      return this.gesamtsummeBau
        + this.summeNebenanlagen
        + this.summeKulturenKoch
        + this.summeZierKoch
        - this.summeAuflagen;
    },


  }
}
</script>


