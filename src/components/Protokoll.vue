<!-- mit Kommentar gibt bei gedit Syntaxhighlightning --> 
<template>
  <div>
  <!-- style="font-family:Arial, Helvetica, sans-serif;" -->
    <!-- Kommt von
    https://stackoverflow.com/questions/49516424/use-style-tags-inside-vuejs-template-and-update-from-data-model/57331310#57331310
    -->
    <!-- wichtiger Kommentar: -->
    <!-- eslint-disable vue/require-component-is -->
    <component is="style">
      @page {
        size: 210mm 297mm;
        margin: 0mm
      }

      html {
        background-color: #FFFFFF;
        margin: 0px; /* this affects the margin on the HTML before sending to      printer */
      }

      body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 9pt;
        margin: 15mm 15mm 15mm 15mm; /* margin you want for the content */
      }

      .printblock {
        page-break-inside: avoid;
        padding-top: 8mm;
        padding-bottom: 5mm;
      }

      h1 {
        margin-top: 0;
        font-size: 18pt; 
      }

      h2 {
        margin: 2mm 0;
        font-size: 10pt; 
        text-decoration:underline;
      }

      h3 {
        margin: 2mm 0;
        font-size: 10pt; 
      }

      table {
        font-size: 9pt;
      }

      table.mitrahmen {
        width: 180mm;
        font-size: 9pt;
        border: thin solid black;
        border-collapse: separate;
        border-spacing: 2mm 0mm;
      }

      table.mitrand {
        width: 180mm;
        font-size: 9pt;
        border-collapse: collapse;
      }
      table.mitrand td, table.mitrand th {
        border: thin solid black;
      }

      table.insgesamt {
        width: 180mm;
        font-size: 10pt;
        border:thin solid black;
        border-collapse: separate;
        border-spacing: 2mm 0mm;
        padding: 3mm;
      }

      div.multicolum {
        display: table;
        width: calc(100% - 10pt);
        font-size: 8pt;
      }
      div.onecolumn { 
        display: table-cell;
//        border: thin solid red;
        width: 90mm;
      }

      .fett {
        font-weight: bold;
      }
    </component>


    <AnpassungKopf />

    <table style="font-size:9t">
      <tr>
        <td style="width:45mm">Stadt-/Ortsverband:</td>
        <td colspan="3"><strong>{{wep.grunddaten.verband}}</strong></td>
      </tr><tr>
        <td>Kleingarten-Anlage:</td>
        <td colspan="3"><strong>{{wep.grunddaten.anlage}}</strong></td>
      </tr><tr>
        <td>Parzellen-Nummer:</td>
        <td><strong>{{wep.grunddaten.parzellennummer}}</strong></td>
        <td>Fläche der Parzelle:
            <strong>{{wep.grunddaten.parzellenflaeche}}</strong> m²</td>
        <td>Datum der Begehung:
            <strong>{{deutschesDatum}}</strong></td>
      </tr><tr>
        <td>Pächter(in):</td>
        <td><strong>{{wep.grunddaten.paechtername}}</strong></td>
        <td>Straße:
           <strong>{{wep.grunddaten.strasse}}</strong></td>
        <td>Wohnort:
           <strong>{{wep.grunddaten.ort}}</strong></td>
      </tr><tr>
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
            </tr><tr v-if="wep.gebaeude[0].flaeche_bem != ''">
              <td></td>
              <td><strong>{{wep.gebaeude[0].flaeche_bem}}</strong></td>
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
        <h3>Ausführung/Ausstattung</h3>
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
                <p style="font-weight:bold; margin-top:0mm; margin-bottom:1mm"
                   v-for="(z, zi) in wep.gebaeude[0].zustand" :key="zi">
                  {{ z }}
                </p>
              </td>
            </tr>
            <tr v-if="!wep.gebaeude[0].alternativ">
              <td colspan="2">
                <strong>Abschreibungssatz gem. Tabelle 5:</strong>
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
              <td colspan="2">
                <small>
                  (Berechnung:
                  Breite = Verlängerung der Außenkanten der Laube,
                  Länge = Vorderkante Überstand bis Außenkante Laubenwand)
                </small>
              </td>
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
              <td style="vertical-align:top">Ausführung/Ausstattung:</td>
<!--
              <td><strong>{{wep.gebaeude[1].ausfuehrung}}</strong></td>

-->
              <td>
                <p style="font-weight:bold; margin-top:0mm; margin-bottom:1mm"
                   v-for="(z, zi) in wep.gebaeude[1].zustand" :key="zi">
                  {{ z }}
                </p>
              </td>
            </tr>
            <tr v-if="!wep.gebaeude[1].alternativ">
              <td colspan="2">
                <strong>Abschreibungssatz gem. Tabelle 5:</strong>
                <span style="padding-right:5mm"></span>
                <strong>{{wep.gebaeude[1].abschreibungssatz}} %</strong>
              </td>
            </tr>  
          </tbody>
        </table>  

        <div v-for="(g, gi) in wep.gebaeude" :key="gi">
        <template v-if="g.art=='Anbau' || g.art=='Nebenbau'">
          <h2 v-if="g.art=='Anbau'">Anbau</h2>
          <h2 v-if="g.art=='Nebenbau'">Nebenbau</h2>
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
                  <p style="font-weight:bold; margin-top:0mm; margin-bottom:1mm"
                     v-for="(z, zi) in g.zustand" :key="zi">
                    {{ z }}
                  </p>
                </td>
              </tr>
              <tr v-if="!g.alternativ">
                <td colspan="2">
                  <strong>Abschreibungssatz gem. Tabelle 5:</strong>
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
              {{gesamtAbschreibung(g.baujahr, g.abschreibungssatz).toLocaleString("de-DE",
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
            <td colspan="4" style="padding-top:3mm;">Gesamtsumme Baulichkeiten</td>
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

          <tr>
            <td colspan="5" style="padding-top:5mm; text-align:right; border-style:none;">
              Gesamtsumme Nebenanlagen
            </td>
            <td style="border-style:none;"></td>
            <td style="padding-top:5mm; text-align:right; font-weight:bold; border-style:none;">
              {{ formatEuro(summeNebenanlagen) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="printblock">
      <h2>
       Tabelle 3 - Bewertung der gärtnerischen Kulturen
      </h2>
      <table class="mitrand">
        <thead>
          <tr>
            <th style="border-bottom-style:none">Art der Kultur</th>
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
            <th style="border-top-style:none; font-size:smaller;">
              (z.B. Art, Sorte, Alter, Zustand, Beeinträchtigungnen)</th>
            <th style="border-top-style:none"></th>
            <th style="border-top-style:none"></th>
            <th style="border-top-style:none"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, vi2) in wep.vorhanden[1]" :key="vi2">
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

          <tr>
            <td colspan="5" style="padding-top:5mm; text-align:right; border-style:none;">
              Summe gärtnerische Kulturen
            </td>
            <td style="border-style:none;"></td>  
            <td style="padding-top:5mm; text-align:right; border-style:none;">
              {{ formatEuro(summeKulturen) }}
            </td>
          </tr><tr>
            <td colspan="5" style="padding-top:3mm; text-align:right; border-style:none;">
              Minderung aufgrund von Pflegerückständen
            </td>
            <td style="padding-top:3mm; text-align:right; border-style:none;">
              {{wep.minderungKulturen}} %
            </td>
            <td style="border-style:none;"></td> 
          </tr><tr>
            <td colspan="5" style="text-align:right; border-style:none;">
              Gesamtsumme gärtnerische Kulturen
            </td>
            <td style="border-style:none;"></td>  
            <td style="text-align:right; font-weight:bold; border-style:none;">
              {{ formatEuro(geminderteKulturen) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="printblock">
      <h2>
       Tabelle 4 - Bewertung der Zierbegrünung
      </h2>
      <table class="mitrand">
        <thead>
          <tr>
            <th style="border-bottom-style:none">Art der Zierbegrünung</th>
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
            <th style="border-top-style:none; font-size:smaller;">
              (z.B. Art, Sorte, Alter, Zustand, Beeinträchtigungnen)</th>
            <th style="border-top-style:none"></th>
            <th style="border-top-style:none"></th>
            <th style="border-top-style:none"></th>
          </tr>
        </thead>
        <tbody>

          <!-- tr must be inside v-if to avoid dublicate keys vi3, vi4 and vi5 -->
          <template v-for="(v, vi3) in wep.vorhanden[2]">
            <template v-if="v.summentyp==3">
            <tr :key="vi3">
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
            </template>
          </template>
          <tr>
            <td colspan="5" style="text-align:right; font-weight:bold;">
              Zwischensumme Ziergehölze
            </td>
            <td></td>
            <td style="text-align:right; font-weight:bold;">
              {{ formatEuro(zwischensummeZiergehoelz) }}
            </td>
          </tr>
          <tr v-if="zwischensummeZiergehoelz &gt; 500">
            <td colspan="5" style="text-align:right; font-weight:bold;">
              Höchstwert von 500,00 € wurde überschritten<br/>
              Aufgrund der Deckelung bleiben Ziergehölze teilweise unberücksichtigt
            </td>
            <td></td>
            <td style="text-align:right; font-weight:bold;">
              500,00 €
            </td>
          </tr>

          <template v-for="(v, vi4) in wep.vorhanden[2]">
            <template v-if="v.summentyp==4">
            <tr :key="vi4">
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
            </template>
          </template>
          <tr>
            <td colspan="5" style="text-align:right; font-weight:bold;">
              Zwischensumme Stauden
            </td>
            <td></td>
            <td style="text-align:right; font-weight:bold;">
              {{ formatEuro(zwischensummeStauden) }}
            </td>
          </tr>
          <tr v-if="zwischensummeStauden &gt; 300">
            <td colspan="5" style="text-align:right; font-weight:bold;">
              Höchstwert von 300,00 € wurde überschritten<br/>
              Aufgrund der Deckelung bleiben Stauden teilweise unberücksichtigt
            </td>
            <td></td>
            <td style="text-align:right; font-weight:bold;">
              300,00 €
            </td>
          </tr>

          <template v-for="(v, vi5) in wep.vorhanden[2]">
            <template v-if="v.summentyp==5">
            <tr :key="vi5">
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
            </template>
          </template>
          <tr>
            <td colspan="5" style="text-align:right; font-weight:bold;">
              Zwischensumme Rasen
            </td>
            <td></td>
            <td style="text-align:right; font-weight:bold;">
              {{ formatEuro(zwischensummeRasen) }}
            </td>
          </tr>
          <tr v-if="rasenFlaeche &gt; (wep.grunddaten.parzellenflaeche/3)">
            <td colspan="5" style="text-align:right; font-weight:bold;">
              Die Rasenfläche überschreitet den Höchstwert von 1/3 der Gesamtfläche<br/>
              Aufgrund der Deckelung bleiben Rasenflächen teilweise unberücksichtigt
            </td>
            <td></td>
            <td style="text-align:right; font-weight:bold;">
              {{ formatEuro(gedeckeltRasen) }}
            </td>
          </tr>


          <tr>
            <td colspan="5" style="padding-top:5mm; text-align:right; border-style:none;">
              Summe Zierbegrünung
            </td>
            <td style="border-style:none;"></td>
            <td style="padding-top:5mm; text-align:right; border-style:none;">
              {{ formatEuro(gesamtsummeZier) }}
            </td>
          </tr><tr>
            <td colspan="5" style="padding-top:3mm; text-align:right; border-style:none;">
              Minderung aufgrund von Pflegerückständen
            </td>
            <td style="padding-top:3mm; text-align:right; border-style:none;">
              {{wep.minderungZier}} %
            </td> 
            <td style="border-style:none;"></td> 
          </tr><tr>
            <td colspan="5" style="text-align:right; border-style:none;">
              Gesamtsumme Zierbegrünung
            </td>
            <td style="border-style:none;"></td>
            <td style="text-align:right; font-weight:bold; border-style:none;">
              {{ formatEuro(geminderteZier) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="printblock">
      <h1 style="text-align:center;">ERGEBNIS DER WERTERMITTLUNG</h1>
      <p>
        Nicht bewertete Anlagen (mit Begründung für die unterbliebene Wertung,
        evtl. Ansatz für Beseitigung):
        <ul style="padding-bottom:10mm;">
          <li style="font-weight:bold;" v-for="(n, ni) in wep.nichtbewertet" :key="ni">
            {{ n.name }}
          </li>
        </ul>
      </p>
      <p v-if="wep.auflagen.length!=0">
        Auflagen / Gesamtbewertung des Gartens
        <ul>
          <li style="font-weight:bold;" v-for="(a, ai) in wep.auflagen" :key="ai">
            {{a.name}} ({{a.preis}} €)
          </li>
        </ul>
      </p>
      <p style="font-weight:bold; padding: 0mm 9mm 10mm 9mm;">
        {{wep.gesamtbewertung}}
      </p>
      <p v-if="wep.anmerkungen" style="font-weight:bold; padding: 0mm 9mm 10mm 9mm;">
        {{wep.anmerkungen}}
      </p>

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
              {{ formatEuro(geminderteKulturen) }}
            </td>
          </tr>
          <tr>
            <td>Gesamtsumme Tabelle 4 (Zierbegrünung):</td>
            <td style="text-align:right">
              {{ formatEuro(geminderteZier) }}
            </td>
          </tr>
          <tr>
            <td>Summe:</td>
            <td style="text-align:right; font-weight:bold;">
              {{ formatEuro(gesamtsummeBau+summeNebenanlagen+geminderteKulturen+geminderteZier) }}
            </td>
          </tr>
          <tr style="height: 3mm;"/>
          <tr>
            <td>Leistungen für die Erstellung von Gemeinschaftseinrichtungen:</td>
            <td style="text-align:right">
              {{ formatEuro(wep.leistungen) }}
            </td>
          </tr>
          <tr>
            <td>Abzug für Beseitigung von Anpflanzungen und Anlagen:</td>
            <td style="text-align:right">
              {{ formatEuro(-summeAuflagen) }}
            </td>
          </tr>
          <tr style="height: 3mm;"/>
          <tr>
            <td style="font-weight:bold;">Entschädigung insgesamt:</td>
            <td style="text-align:right; font-weight:bold;">
              {{ formatEuro(entschaedigung) }}
            </td>
          </tr>
        </tbody>
      </table>

      <AnpassungUnterschrift />

    </div>
  </div>
</template>


<script>
import AnpassungKopf from './AnpassungKopf.vue'
import AnpassungUnterschrift from './AnpassungUnterschrift.vue'
export default {

  components: {
    AnpassungKopf,
    AnpassungUnterschrift
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
      return Math.round(g.prozentualerRestwert * this.neuwert(g)) / 100;
    },

    zeitwert: function(g) {
      const neuwert = this.neuwert(g);
      const abschreibung = this.gesamtAbschreibung(g.baujahr, g.abschreibungssatz);
      return Math.round(neuwert * (100-abschreibung)) / 100;
    },

    formatEuro: function(x) {
        return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(x);
    },

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

  }
}
</script>


