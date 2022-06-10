<template>
  <div class="eingabe">


      <b-navbar toggleable="md" type="dark" variant="gradient-primary" fixed="top">
        <b-navbar-brand href="#top">GartenWert</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav align="left">
<!--
            <b-nav-item-dropdown variant="gradient-primary" text="Springe zu" left>
              <b-dropdown-item href="#grunddaten">Grunddaten</b-dropdown-item>
              <b-dropdown-item href="#baulichkeiten">Baulichkeiten</b-dropdown-item>
              <b-dropdown-item href="#gliederung0">Nebenanlagen</b-dropdown-item>
              <b-dropdown-item href="#gliederung1">Gärtnerische Kulturen</b-dropdown-item>
              <b-dropdown-item href="#gliederung2">Zierbegrünung</b-dropdown-item>
              <b-dropdown-item href="#schnelleingabe">Schnelleingabe</b-dropdown-item>
              <b-dropdown-item href="#ergebnis">Ergebnis</b-dropdown-item>
            </b-nav-item-dropdown>
-->
            <b-nav-item href="#grunddaten"
                        v-b-tooltip.hover.v-secondary
                        title="Grunddaten">
              <AccountIcon/>
            </b-nav-item>
            <b-nav-item href="#baulichkeiten"
                        v-b-tooltip.hover.v-secondary
                        title="Baulichkeiten">
              <HomeIcon/>
            </b-nav-item>
            <b-nav-item href="#gliederung0"
                        v-b-tooltip.hover.v-secondary
                        title="Nebenanlagen">
              <WaterPumpIcon/>
            </b-nav-item>
            <b-nav-item href="#gliederung1"
                        v-b-tooltip.hover.v-secondary
                        title="Gärtnerische Kulturen">
              <FruitGrapesIcon/>
            </b-nav-item>
            <b-nav-item href="#gliederung2"
                        v-b-tooltip.hover.v-secondary
                        title="Zierbegrünung">
              <BarleyIcon/>
            </b-nav-item>
            <b-nav-item v-on:click="custom.EingabeArt = 3-custom.EingabeArt"
                        v-b-tooltip.hover.v-secondary>
              <BikeFastIcon/>
            </b-nav-item>
            <b-nav-item href="#ergebnis"
                        v-b-tooltip.hover.v-secondary
                        title="Ergebnis">
              <SigmaIcon/>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-on:click="wepSpeichern"
                        v-b-tooltip.hover.v-secondary
                        title="Vorgang speichern">
              <ContentSaveIcon />
            </b-nav-item>
            <b-nav-item v-on:click="wepGenerieren(true)"
                        v-b-tooltip.hover.v-secondary
                        title="Protokoll drucken">
              <PrinterIcon />
            </b-nav-item>
            <b-nav-item v-on:click="preisAnzeigen = !preisAnzeigen"
                        v-b-tooltip.hover.v-secondary
                        title="Preisanzeige umschalten">
              <b-icon-eye v-if="preisAnzeigen" />
              <b-icon-eye-slash v-if="!preisAnzeigen" />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>






    <b-container>
      <b-row class="mt-2">
        <b-col md="1" />

        <b-col md="5">
          <h2 id="aktionen">Aktionen</h2>
          <b-button class="mt-2" variant="primary" block v-on:click="wepLoeschen">Neuer Vorgang</b-button>
            <b-form-file
              class="mt-2"
              v-model="wepFile"
              placeholder="noch kein Vorgang geöffnet"
              browse-text="Vorgang öffnen"
              drop-placeholder="Drop file here..."
              @change="wepLaden($event)"
            ></b-form-file>
          <b-button class="mt-2" variant="primary" block v-on:click="wepSpeichern">
            Vorgang speichern
          </b-button>
          <b-button class="mt-2" variant="primary" block v-on:click="wepGenerieren(false)">
            Protokoll erzeugen
          </b-button>
          <b-button class="mt-2" variant="primary" block v-on:click="wepGenerieren(true)">
            Protokoll drucken
          </b-button>
        </b-col>

        <b-col md="6">

          <CustomUeber />

        </b-col>
      </b-row>
    </b-container>



    <b-container v-if="custom.Konfigurierbar">
        <b-row class="mr-0 mt-5">
          <b-col sm="10" class="bg-gradient-secondary p-0">
            <b-button variant="primary"
                      class="mr-2"
                      size="sm"
                      v-on:click="einstellungenEinklappen = !einstellungenEinklappen">
              <template v-if="einstellungenEinklappen">
                <b-icon-caret-right-fill/>Ausklappen
              </template>
              <template v-else>
                <b-icon-caret-down-fill/>Einklappen
              </template>
            </b-button>
            Einstellungen
          </b-col>
          <b-col sm="2" class="text-right bg-gradient-secondary p-0">
          </b-col>
        </b-row>
      <div class="mb-3 bg-light pl-2 pr-2 pt-2" v-if="!einstellungenEinklappen">
        <b-row class="mt-2">
          <b-col sm="4">
            <b-form-group label="Eingabeart" v-slot="{ ariaDescribedby }">
              <b-form-radio v-model="custom.EingabeArt" value="1" :aria-describedby="ariaDescribedby">
                Hierarchisches Formular
              </b-form-radio>
              <b-form-radio v-model="custom.EingabeArt" value="2" :aria-describedby="ariaDescribedby">
                Combobox
              </b-form-radio>
<!--
              <b-form-radio v-model="custom.EingabeArt" value="3" :aria-describedby="ariaDescribedby">
                Editierbare Liste
              </b-form-radio>
-->
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Bewertungssmethode" v-slot="{ ariaDescribedby }">
              <b-form-radio v-model="wep.methode" value="0" :aria-describedby="ariaDescribedby">
                fester Grundpreis
              </b-form-radio>
              <b-form-radio v-model="wep.methode" value="1" :aria-describedby="ariaDescribedby">
                Grundpreisspanne
              </b-form-radio>
              <b-form-radio v-model="wep.methode" value="2" :aria-describedby="ariaDescribedby">
                Methode Koch
              </b-form-radio>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-checkbox v-model="custom.Siegel">
              Protokoll mit Siegel
            </b-form-checkbox>
            <b-form-checkbox v-model="preisAnzeigen">
              Eurobeträge anzeigen
            </b-form-checkbox>
          </b-col>
        </b-row>
      </div>
    </b-container>





    <b-container>
      <h2 id="grunddaten">Grunddaten</h2>

      <div class="mb-2 bg-light pl-2 pr-2 pt-2 pb-2">
      <b-row class="mt-1">
        <b-col sm="3">Stadt-/Ortsverband</b-col>
        <b-col sm="9"><b-form-input type="text" v-model="wep.grunddaten.verband" /></b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="3">Kleingartenanlage</b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="wep.grunddaten.anlage"/>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="3">Parzellen-Nummer</b-col>
        <b-col sm="4">
          <b-form-input type="text" v-model="wep.grunddaten.parzellennummer"/>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="3">Parzellen-Fläche</b-col>
        <b-col sm="4"><b-form-input type="number" min="0" v-model.number="wep.grunddaten.parzellenflaeche"/></b-col>
        <b-col sm="1">m²</b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="3">Pächter/in</b-col>
        <b-col sm="4"><b-form-input type="text" v-model="wep.grunddaten.paechtername"/></b-col>
        <b-col sm="5">
          <b-form-checkbox v-model="wep.grunddaten.paechteranwesend">
            anwesend bei Begehung
          </b-form-checkbox>
        </b-col>
      </b-row>
      <template v-if="custom.AdressEingabe">
        <b-row class="mt-2">
          <b-col sm="3">Straße</b-col>
          <b-col sm="9"><b-form-input type="text" v-model="wep.grunddaten.strasse"/></b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col sm="3">Wohnort</b-col>
          <b-col sm="9"><b-form-input type="text" v-model="wep.grunddaten.ort"/></b-col>
        </b-row>
      </template>
      <b-row class="mt-2">
        <b-col sm="3">Weitere Teilnehmer</b-col>
        <b-col sm="9"><b-form-input type="text" v-model="wep.grunddaten.anwesend"/></b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="3">Datum</b-col>
        <b-col sm="9">
          <b-form-datepicker v-model="wep.grunddaten.datum"
            id="Bewertungsdatum"
            aria-label="ARIA-LABEL wird nicht übernommen">
          </b-form-datepicker>
        </b-col>
      </b-row>

      <b-row v-if="wep.methode==2" class="mt-2">
        <b-col sm="3">Zinssatz</b-col>
        <b-col sm="4">
          <b-form-input step="0.1" type="number" v-model.number="wep.grunddaten.zinssatz"/>
        </b-col>
        <b-col sm="1">%</b-col>
      </b-row>
      <b-row class="mt-2 mb-1">
        <b-col sm="3">Dateiname</b-col>
        <b-col sm="6"><b-form-input type="text"
                                    :value="getDateiname"
                                    @input="setDateiname" /></b-col>
        <b-col sm="3">
          <b-button variant="primary"
                    block
                    v-on:click="vorschlagDateiname"
                    v-b-tooltip.hover.v-secondary
                    title="Dateiname aus Anlagenname und Parzellennummer zusammensetzen" >
            Vorschlag
          </b-button>
        </b-col>
      </b-row>
      </div>
    </b-container>





    <b-container>
      <h2 id="baulichkeiten">Baulichkeiten</h2>

      <div v-for="(g, gi) in wep.gebaeude" :key="gi">
        <b-row class="mr-0 mt-2">
          <b-col sm="10" class="bg-gradient-secondary p-0">
            <b-button variant="primary"
                      class="mr-2"
                      size="sm"
                      v-on:click="g.einklappen = !g.einklappen">
              <template v-if="g.einklappen">
                <b-icon-caret-right-fill/>Ausklappen
              </template>
              <template v-else>
                <b-icon-caret-down-fill/>Einklappen
              </template>
            </b-button>
            {{ g.art=='Freisitz' ? 'Überdachter Freisitz' : g.art }}
          </b-col>
          <b-col sm="2" class="text-right bg-gradient-secondary p-0">
            <b-button variant="danger" size="sm" v-if="gi > 1"
              v-on:click="wep.gebaeude.splice(gi, 1)">
              <b-icon-x/>Löschen
            </b-button>
          </b-col>
        </b-row>

        <div class="mb-3 bg-light pl-2 pr-2 pt-2" v-if="!g.einklappen">
          <template v-if="g.art=='Freisitz' || g.art=='Renovierung' || g.art=='Schaden'">
            <b-row class="mt-2">
              <b-col sm="3"> Fläche</b-col>
              <b-col sm="2"> <b-form-input type="number" min="0" step="any" v-model.number="g.flaeche"/></b-col>
              <b-col sm="1"> m² </b-col>
              <template v-if="g.art=='Freisitz'">
                <b-col sm="6">
                  Breite = Verlängerung der Außenkante <br/>
                  Länge = Vorderkante Überstand bis Außenkante Laubenwand
                </b-col>
              </template>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3">Baujahr</b-col>
              <b-col sm="2"><b-form-input type="number" min="0" v-model.number="g.baujahr"/></b-col>
              <b-col sm="4">
                (Alter: {{wep.grunddaten.datum.substring(0,4)-g.baujahr}} Jahre)
              </b-col>
            </b-row>

            <template v-if="g.art=='Freisitz'">
              <b-row class="mt-2">
                <b-col sm="3">Dachkonstruktion</b-col>
                <b-col sm="9">
                  <b-form-checkbox v-model="g.einbezogen" value="true" unchecked-value="false">
                    einbezogen in Gartenhaus
                  </b-form-checkbox>
                </b-col>
              </b-row>
            </template>
          </template>

          <template v-else>
            <b-row class="mt-2 mb-1">
              <b-col sm="2"> Grundfläche </b-col>
              <b-col sm="2"> 
                <b-form-input type="number" min="0" step="any" v-model.number="g.flaeche"
                              v-b-tooltip.hover title="Außenkante x Außenkante Wand" />
              </b-col>
              <b-col sm="1"> m² </b-col>
              <b-col sm="2"></b-col>
              <b-col sm="2"> unberücksichtigt </b-col>
              <b-col sm="2"> 
                <b-form-input type="number" min="0" step="any" v-model.number="g.flaecheZuviel"
                              v-b-tooltip.hover title="nur 24m² dürfen berücksichtigt weden" />
              </b-col>
              <b-col sm="1"> m² </b-col>
<!--
              <b-button id="berechnungshilfe">Berechnungshilfe</b-button>
              <b-popover ref="popoverFlaeche" target="berechnungshilfe" triggers="click">
                <div>
                  <b-form-group label="Breite (Außenkante) in m">
                    <b-form-input size="sm" type="number" min="0" step="any" v-model.number="helper_breite" />
                  </b-form-group>
                  <b-form-group label="Länge (Außenkante) in m">
                    <b-form-input size="sm" type="number" min="0" step="any" v-model.number="helper_laenge" />
                  </b-form-group>
                  <b-alert show variant="light">Fläche {{ helper_breite*helper_laenge }} m²</b-alert>
                  <b-button size="sm" variant="primary" @click="g.flaeche=helper_breite*helper_laenge">Übernehmen</b-button>
                  <b-button size="sm" class="ml-2" @click="onBerechnungshilfeClose" variant="primary">Abbrechen</b-button>
                </div>
              </b-popover>
-->
            </b-row>
            <b-alert show variant="danger" v-if="(g.art=='Laube') && warnLaube">
              Warnung: Übergroße Lauben sind mit höchstens 24 m² zu bewerten.
                       Bitte geben Sie nur die tatsächlich zu berücksichtigende Fläche an.
                       Die unberücksichtigte Fläche können Sie im Ergänzungsfeld vermerken.
            </b-alert>
            <b-row class="mt-1 mb-1">
              <b-col sm="2"> Höhe </b-col>
              <b-col sm="2"> <b-form-input type="number" step="any" min="0.0" v-model.number="g.hoehe"/> </b-col>
              <b-col sm="8"> m </b-col>
            </b-row>
            <b-row class="mt-1 mb-1">
              <b-col sm="2"> Baujahr </b-col>
              <b-col sm="2">
                <b-form-input type="number" min="0" v-model.number="g.baujahr"/> </b-col>
              <b-col sm="4">
                (Alter: {{wep.grunddaten.datum.substring(0,4)-g.baujahr}} Jahre)
              </b-col>
            </b-row>

            <b-row class="mt-1 mb-1" v-for="(a, ai) in g.ausstattung" :key="ai">
              <b-col sm="2"> {{ a.name }} </b-col>
              <b-col sm="8">
                <b-form-checkbox-group v-model="a.selected" :options="a.options"/>
              </b-col>
              <b-col sm="2"> <b-form-input v-model="a.ergaenzung"/> </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col sm="2"> Anzahl Fenster</b-col>
              <b-col sm="2"> <b-form-input type="number" min="0" v-model.number="g.fenster"/> </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="2"> Anzahl Türen </b-col>
              <b-col sm="2"> <b-form-input type="number" min="0" v-model.number="g.tueren"/> </b-col>
            </b-row>
          </template>


          <template v-if="custom.ZustandsArray">
            <b-row class="mt-2 pb-2">
              <b-col sm="2"> Zustand</b-col>
              <b-col sm="8">
                <b-form-input v-model="g.zustand"
                              placeholder="Bemerkungen zum Zustand" />
              </b-col>
              <b-col sm="2" class="text-right">
                <b-button variant="primary" size="sm"
                  v-on:click="addGebaeudeZustand(g)">
                  <b-icon-plus />Hinzufügen
                </b-button>
              </b-col>
            </b-row>
            <div> <!-- required to separate the zi keys -->
              <b-row class="pb-1" v-for="(z, zi) in g.zustandArray" :key="zi">
                <b-col sm="2"></b-col>
                <b-col sm="8"> {{ z }} </b-col>
                <b-col sm="2" class="text-right">
                  <b-button variant="danger" size="sm"
                            v-on:click="g.zustandArray.splice(zi, 1)">
                    <b-icon-x />Löschen
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </template>
          <template v-else>
            <b-row class="mt-2 pb-2">
              <b-col sm="2"> Zustand</b-col>
              <b-col sm="8">
                <b-form-input v-model="g.zustand"
                              placeholder="Bemerkungen zum Zustand" />
              </b-col>
            </b-row>
          </template>
        </div>
      </div>

      <template v-if="wep.methode==2"> <!-- nur bei Koch -->
        <b-row class="pt-4">
          <b-col sm="3">
            <b-button block variant="primary" size="md" v-on:click="addGebaeude('Anbau')">
              <b-icon-plus /> Anbau
            </b-button>
          </b-col>
          <b-col sm="3">
            <b-button block variant="primary" size="md" v-on:click="addGebaeude('Nebenbau')">
              <b-icon-plus /> Nebenbau
            </b-button>
          </b-col>
          <b-col sm="3">
            <b-button block variant="primary" size="md" v-on:click="addGebaeude('Renovierung')">
              <b-icon-plus /> Renovierung
            </b-button>
          </b-col>
          <b-col sm="3">
            <b-button block variant="primary" size="md" v-on:click="addGebaeude('Schaden')">
              <b-icon-plus /> Schaden
            </b-button>
          </b-col>
        </b-row>
      </template>
      <template v-else>
        <b-row class="pt-4">
          <b-col sm="4">
            <b-button block variant="primary" size="md" v-on:click="addGebaeude('Anbau')">
              <b-icon-plus /> Anbau-Bewertung hinzufügen
            </b-button>
          </b-col>
          <b-col sm="8">
            Anbauten werden nur separat bewertet, wenn eigenständiger Bauteil der Laube
          </b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col sm="4">
            <b-button block variant="primary" size="md" v-on:click="addGebaeude('Nebenbau')">
              <b-icon-plus /> Nebenbau-Bewertung hinzufügen
            </b-button>
          </b-col>
          <b-col sm="8">
            Nebenbauten werden nur bewertet, wenn zugelassen
          </b-col>
        </b-row>
      </template>




      <!-- --------------------------------------------------------- --
        -- Berechnungsschema Baulichkeiten
        -- --------------------------------------------------------- -->

      <b-row class="bg-gradient-secondary mr-0 mt-5 pt-1 pb-1">
        <b-col sm="1"></b-col>
        <b-col sm="11">Berechnungsschema Baulichkeiten</b-col>
      </b-row>

      <div class="mb-2 bg-light pl-2 pr-2 pt-2 pb-2">
        <b-row class="mt-2">
          <b-col sm="2">Baukostenindex</b-col>
          <b-col sm="3"><b-form-input type="number" min="0" step="any" v-model.number="wep.baukostenindex"/></b-col>
        </b-row>

        <!-- Neuwert -->
        <b-row class="pt-3 mb-2">
          <b-col sm="2"></b-col>
          <b-col sm="3" class="text-center">Normalherstellungswert</b-col>
          <b-col sm="3" class="text-right">Fläche</b-col>
          <b-col sm="2" class="text-right" v-if="preisAnzeigen">Zwischensumme</b-col>
        </b-row>
        <b-row class="mb-2" v-for="(g2, g2i) in wep.gebaeude" :key="g2i">
          <b-col sm="2">
            {{ g2.art }}
          </b-col>
          <b-col sm="3">
            <!-- NHW ist bei Koch unbegrenzt -->
            <template v-if="wep.methode==2">
              <b-form-input type="number" min="0" step="any" v-model.number="g2.normalherstellungswert"/>
            </template>
            <template v-else>
              <b-form-input type="number" min="0" max="26.0" step="any" v-model.number="g2.normalherstellungswert"/>
            </template>
          </b-col>
          <b-col sm="1">€/m²</b-col>
          <b-col sm="2" class="text-right">{{ g2.flaeche }} m²</b-col>
          <b-col sm="2" class="text-right" v-if="preisAnzeigen">
            {{ formatEuro(parseFloat(neuwert(g2))) }}
          </b-col>
          <b-col sm="2" v-if="g2.art=='Freisitz'">
            <b-button variant="primary" size="sm"
              v-b-tooltip.hover.v-secondary title="NHW des Freisitzes auf 1/3 des NHW der Laube setzen"
              v-on:click="g2.normalherstellungswert = Math.floor((wep.gebaeude[0].normalherstellungswert*100)/3)/100">
                <!-- floor to avoid problems with the alert -->
                NHW = 1/3 Laube
            </b-button>
          </b-col>
        </b-row>
      </div>
      <b-alert show variant="danger" v-if="warnFreisitz">
        Warnung: Der Normalherstellungswert des Freisitzes darf 1/3 des Normalherstellungswertes der Laube nicht übersteigen
      </b-alert>
      <b-alert show variant="danger" v-if="warnNHW">
        Warnung: Der Normalherstellungswert darf 26.00 € nicht übersteigen
      </b-alert>

      <!-- Zeitwert -->
      <div class="mb-2 bg-light pl-2 pr-2 pt-2 pb-2">
        <b-row class="pt-2">
          <b-col sm="2"></b-col>
          <b-col sm="3" class="text-center" id="abschreibungssatz">Abschreibung</b-col>
              <b-tooltip target="abschreibungssatz" variant="secondary" triggers="hover">
                <table>
                  <tr><th>Abschreibung</th><th>Zustand</th><th>Mängel/Abnutzung</th></tr>
                  <tr><td>2%</td><td>sehr gut</td><td>keine</td></tr>
                  <tr><td>2-3%</td><td>gut</td><td>leicht</td></tr>
                  <tr><td>3-4%</td><td>mittelmäßig</td><td>deutlich</td></tr>
                  <tr><td>4-5%</td><td>schlecht</td><td>sehr deutlich</td></tr>
                </table>
              </b-tooltip>
          <b-col sm="5">
            <b-row>
              <b-col class="text-right">Satz</b-col>
              <b-col class="text-right">gesamt</b-col>
              <b-col class="text-right" v-if="preisAnzeigen">Zeitwert</b-col>
            </b-row> 
          </b-col>
          <b-col sm="2" class="text-left">
            Methode
          </b-col>
        </b-row>
          <b-row v-for="(g3, g3i) in wep.gebaeude" :key="g3i">
            <b-col sm="2">{{ g3.art }}</b-col>
            <b-col sm="3" class="text-center">
<!--
              <b-input-group>
                <b-form-input type="range" min="2" max="5" step="0.01" v-model="g3.abschreibungssatz"/>
                <b-input-group-append is-text class="text-monospace">
                  {{ Number.parseFloat(g3.abschreibungssatz).
                     toLocaleString("de-DE", {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} %
                </b-input-group-append>
              </b-input-group>
-->
              <b-form-input type="range" min="2" max="5" step="0.01" v-model="g3.abschreibungssatz"/>
            </b-col>
            <b-col sm="5">
              <b-row>
                <b-col class="text-right">
                  {{ Number.parseFloat(g3.abschreibungssatz).toLocaleString("de-DE",
                     {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} %
                </b-col>
                <b-col class="text-right">
                  {{ gesamtAbschreibung(g3.baujahr, g3.abschreibungssatz).
                     toLocaleString("de-DE", {minimumFractionDigits: 2, maximumFractionDigits: 2}) }} %
                </b-col>

                <template v-if="preisAnzeigen">
                  <b-col class="text-right text-muted" v-if="g3.alternativ">
                    {{ formatEuro(parseFloat(zeitwert(g3))) }}
                  </b-col>
                  <b-col class="text-right font-weight-bold" v-else>
                    {{ formatEuro(parseFloat(zeitwert(g3))) }}
                  </b-col>
                </template>
              </b-row>
            </b-col>

            <b-col sm="2">
              <b-form-checkbox v-model="g3.alternativ" v-b-tooltip.hover.v-secondary
                 title="Ein Restwert darf nur angesetzt werden, wenn er durch einen
                   überdurchschnittlich guten Zustand begründbar ist oder das
                   Gebäude vollständig abgeschrieben ist">
                Restwert
              </b-form-checkbox>
            </b-col>
          </b-row>
      </div>

      <!-- Restwert -->
      <div class="mb-2 bg-light pl-2 pr-2 pt-2 pb-2">
        <b-row class="pt-2">
          <b-col sm="2"></b-col>
          <b-col sm="6" class="text-center">prozentualer Restwert</b-col>
          <b-col sm="2" class="text-right">Restwert</b-col>
        </b-row>
        <div v-for="(g4, g4i) in wep.gebaeude" :key="g4i">
          <b-row v-if="g4.alternativ">
            <b-col sm="2">
              {{ g4.art }}
            </b-col>
            <b-col sm="4">
              <b-form-input type="range" min="0" max="100" v-model="g4.prozentualerRestwert"/>
            </b-col>
            <b-col sm="2" class="text-right"> {{ g4.prozentualerRestwert }} % </b-col>
            <b-col sm="2" class="text-right font-weight-bold" v-if="preisAnzeigen">
              {{ formatEuro(parseFloat(restwert(g4))) }}
            </b-col>
          </b-row>
        </div>
      </div>

      <b-row class="pr-3" v-if="preisAnzeigen">
        <b-col sm="8"/>
        <b-col sm="2" class="text-right font-weight-bold bg-light pt-2 pb-2">
            {{ formatEuro(gesamtsummeBau) }}
        </b-col>
        <b-col sm="2" class="text-left bg-light pt-2 pb-2">Summe</b-col>
      </b-row>
    </b-container>







    <!-- ----------------------------------------------------------- --
      -- Gliederung
      -- ----------------------------------------------------------- -->

    <template v-if="custom.EingabeArt==1">
      <b-container :id="'gliederung'+level1i" v-for="(level1, level1i) in gliederung" :key="level1i">
        <h2>{{ level1.name }}</h2>

        <b-row>
          <b-col sm="2">Menge</b-col>

          <!-- Andere Spalten, wenn Grundpreis abgeändet werden kann -->
          <template v-if="wep.methode != 0">
            <b-col sm="4">Bewertungskriterien</b-col>
            <b-col sm="2">Grundpreis</b-col>
            <b-col sm="2">Minderung</b-col>
            <b-col sm="1">
              <template v-if="preisAnzeigen">Preis</template>
            </b-col>
            <b-col sm="1"></b-col>
          </template>

          <template v-else>
            <b-col sm="2">Minderung</b-col>
            <template v-if="preisAnzeigen">
              <b-col sm="5">Bewertungskriterien</b-col>
              <b-col sm="1">Preis</b-col>
            </template>
            <template v-else>
              <b-col sm="6">Bewertungskriterien</b-col>
            </template>
            <b-col sm="2"></b-col>
          </template>
        </b-row>

        <div v-for="(level2, level2i) in level1.sub" :key="level2i">
          <b-row class="mr-0 mt-2">
            <b-col sm="12" class="bg-gradient-secondary p-0">
              <b-button variant="primary"
                        class="mr-2"
                        size="sm"
                        v-on:click="addLevel2(level2, level1i, level2i)">
                <b-icon-plus />Hinzufügen
              </b-button>
              <span v-html="level2.name"/>
                <!-- eigentlich {{ level2.name }}
                     aber so kann man bei den gärtnerischen Kulturen "baumartig"
                     fett markieren -->
            </b-col>
          </b-row>

          <template v-for="(v, vi) in wep.vorhanden[level1i]">
            <div v-if="v.level2i==level2i" class="mb-3 bg-light pl-2 pr-2 pt-2" :key="vi">
              <b-row>
                <b-col sm="12">
                  <b-form-group class="m-1">
                    <b-form-radio-group
                      v-model="v.key"
                      v-on:input="setVorhandenFindL3(v, level1i, level2i, $event)"
                      :options="level2.sub"
                      value-field="key"
                      text-field="name"
                    >
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row align-v="center">
                <b-col sm="2">
                  <b-row align-v="center">
                    <b-col sm="8 pr-0">
                      <b-form-input type="number" min="0" step="any" v-model.number="v.menge"/>
                    </b-col>
                  <b-col sm="4 pl-1 text-left">
                      {{ v.einheit }}
                    </b-col>
                  </b-row>
                </b-col>



                <!-- ----------------------------------------------- --
                  -- Methode Koch / Nebenanlagen: Grundpreis abändern
                  -- ----------------------------------------------- -->
                <template v-if="wep.methode==2">
                  <b-col sm="4">
                    <b-form-input type="text"
                                  v-model="v.kriterien"
                                  :placeholder="level1.kriterien" />
                  </b-col>
                  <b-col sm="2" class="text-center">
                    <b-form-input type="number" v-model.number="v.grundpreis"/>
                  </b-col>
                  <b-col sm="2" class="text-center">
                    {{ v.minderung }} %
                    <b-form-input type="range" min="0" max="100" v-model.number="v.minderung"/>
                  </b-col>
                  <b-col sm="1" class="text-right">
                    <template v-if="preisAnzeigen">
                      {{ (Math.round(v.menge * v.grundpreis * (100-v.minderung))/100).toFixed(2) }}
                    </template>
                  </b-col>

                  <b-col sm="1" class="text-right">
                    <b-button variant="danger" size="sm"
                              v-on:click="wep.vorhanden[level1i].splice(vi, 1)">
                    <b-icon-x />
                    </b-button>
                  </b-col>
                </template>


                <!-- ----------------------------------------------- --
                  -- Methode LBK: Grundpreis in Grenzen ändern
                  -- ----------------------------------------------- -->
                <template v-if="wep.methode==1">
                <b-col sm="4">
                  <b-form-input type="text"
                                v-model="v.kriterien"
                                :placeholder="level1.kriterien" />
                </b-col>
                <b-col sm="2" class="text-center">
                  <template v-if="v.iwmin == v.iwmax">
                    {{ formatEuro(parseFloat(v.iwmax)) }}
                  </template>
                  <template v-else>
                    <b-form-input type="number"
                                  :min="v.iwmin"
                                  :step="v.iwstep"
                                  :max="v.iwmax"
                                  @change="v.grundpreis = Math.min(v.iwmax, Math.max(v.grundpreis, v.iwmin))"
                                  v-model.number="v.grundpreis"/>
                  </template>
                </b-col>
                <b-col sm="2" class="text-center">
                  {{ v.minderung }} %
                  <b-form-input type="range" min="0" max="100" v-model.number="v.minderung"/>
                </b-col>
                <b-col sm="1" class="text-right">
                  <template v-if="preisAnzeigen">
                    {{ formatEuro(wertVorhanden(v)) }}
                  </template>
                </b-col>

                <b-col sm="1" class="text-right">
                  <b-button variant="danger" size="sm"
                            v-on:click="wep.vorhanden[level1i].splice(vi, 1)">
                  <b-icon-x />
                  </b-button>
                </b-col>
                </template>


                <!-- ----------------------------------------------- --
                  -- Methode einfach: fester Grundpreis
                  -- ----------------------------------------------- -->
                <template v-if="wep.methode==0">
                <b-col sm="2 text-center">
                  {{ v.minderung }} %
                  <b-form-input type="range" min="0" max="100" v-model.number="v.minderung"/>
                </b-col>
                <template v-if="preisAnzeigen">
                  <b-col sm="5">
                    <b-form-input type="text"
                                  v-model="v.kriterien"
                                  :placeholder="level1.kriterien" />
                  </b-col>
                  <b-col sm="1" class="text-right">
                    {{ (Math.round(v.menge * v.grundpreis * (100-v.minderung))/100).toFixed(2) }}
                  </b-col>
                </template>
                <template v-else>
                  <b-col sm="6">
                    <b-form-input type="text"
                                  v-model="v.kriterien"
                                  :placeholder="level1.kriterien" />
                  </b-col>
                </template>

                <b-col sm="2 text-right">
                  <b-button variant="danger" size="sm"
                            v-on:click="wep.vorhanden[level1i].splice(vi, 1)">
                  <b-icon-x />Löschen
                  </b-button>
                </b-col>

                </template>
              </b-row>
            </div>
          </template>

          <b-row v-if="vorhandenListe(level1i, level2i).length!=0">
            <b-col sm="5" />
            <b-col cm="2">
              <b-button variant="primary"
                        class="mr-2"
                        size="sm"
                        v-on:click="addLevel2(level2, level1i, level2i)">
                <b-icon-plus />Hinzufügen
              </b-button>
            </b-col>
            <b-col sm="5" />
          </b-row>


          <b-alert show variant="danger" 
                   v-if="(level2.name=='Befestigte Gartenfläche') && warnBefestigt">
            Warnung: Befestigte Gartenflächen werden nur bis zu 10% der
            Gesamtgartenfläche (hier 
            {{ (0.1*wep.grunddaten.parzellenflaeche).
               toLocaleString("de-DE", {minimumFractionDigits: 1, maximumFractionDigits: 1}) }}
            m²) bewertet. Bitte passen Sie die Flächen entsprechend an.
          </b-alert>
          <b-alert show variant="danger" 
                   v-if="(level2.name=='Rasen und Blumenwiesen') & warnRasen">
            Warnung: Rasenflächen werden nur bis zu 1/3 der
            Gesamtgartenfläche (hier 
            {{ (wep.grunddaten.parzellenflaeche/3).
               toLocaleString("de-DE", {minimumFractionDigits: 1, maximumFractionDigits: 1}) }}
            m²) bewertet
          </b-alert>
        </div>
      </b-container>





      <!-- --------------------------------------------------------- --
        -- Berechnungsschema Zierbegrünung
        -- --------------------------------------------------------- -->

      <b-container class="mt-4">
        <b-row class="bg-gradient-secondary mr-0 mt-2 pt-1 pb-1">
          <b-col sm="1"></b-col>
          <b-col sm="11">Berechnungsschema Zierbegrünung</b-col>
        </b-row>
        <div class="mb-3 bg-light pl-2 pr-2 pt-2">
          <b-row class="pt-2" v-if="preisAnzeigen">
            <b-col sm="2"></b-col>
            <b-col sm="2" class="text-right">Zwischensumme</b-col>
            <b-col sm="2" class="text-right">Höchstwert</b-col>
            <b-col sm="2" class="text-right">Wert</b-col>
          </b-row>
          <b-row class="pt-2" v-if="preisAnzeigen">
            <b-col sm="2">Ziergehölze</b-col>
            <b-col sm="2" class="text-right">
              {{ formatEuro(parseFloat(zwischensummeZiergehoelz)) }}
            </b-col>
            <b-col sm="2" class="text-right">
              500,00 €
            </b-col>
            <b-col sm="2" class="text-right">
              {{ formatEuro(Math.min(zwischensummeZiergehoelz, 500.00)) }}
            </b-col>
          </b-row>
          <b-row class="pt-2" v-if="preisAnzeigen">
            <b-col sm="2">Stauden</b-col>
            <b-col sm="2" class="text-right">
              {{ formatEuro(parseFloat(zwischensummeStauden)) }}
            </b-col>
            <b-col sm="2" class="text-right">
              300,00 €
            </b-col>
            <b-col sm="2" class="text-right">
              {{ formatEuro(Math.min(zwischensummeStauden, 300.00)) }}
            </b-col>
          </b-row>
          <b-row class="pt-2" v-if="preisAnzeigen">
            <b-col sm="2">Rasen</b-col>
            <b-col sm="2" class="text-right">
              {{ Number.parseFloat(rasenFlaeche).toLocaleString("de-DE",
                 {minimumFractionDigits: 1, maximumFractionDigits: 1}) }}
               m²
            </b-col>
            <b-col sm="2" class="text-right">
              {{ (wep.grunddaten.parzellenflaeche/3).toLocaleString("de-DE",
                 {minimumFractionDigits: 1, maximumFractionDigits: 1}) }}
              m²
            </b-col>
            <b-col sm="2" class="text-right">
              {{ formatEuro(parseFloat(gedeckeltRasen)) }}
            </b-col>
          </b-row>
          <b-row class="pt-2 pb-4" v-if="preisAnzeigen">
            <b-col sm="4">Summe</b-col>
            <b-col sm="4" class="text-right font-weight-bold">
                {{ formatEuro(parseFloat(gesamtsummeZier)) }}
            </b-col>
          </b-row>
        </div>
      </b-container>
    </template>




    <!-- ----------------------------------------------------------- --
      -- Schnelleingabe
      -- ----------------------------------------------------------- -->

    <template v-if="custom.EingabeArt==2">
      <b-container :id="'gliederung'+i" v-for="(l, i) in gliederung" :key="i">
        <h2>{{ l.name }}</h2>

        <b-row class="bg-gradient-secondary mr-0 mt-2 pt-1 pb-1">
          <b-col sm="1" class="mt-1">
            <b-button variant="primary" size="sm" aria-label="Ein/Ausklappen"
              v-on:click="l.einklappen = !l.einklappen">
              <b-icon-caret-down-fill v-if="!l.einklappen" />
              <b-icon-caret-right-fill v-if="l.einklappen" />
            </b-button>
          </b-col>
          <b-col sm="3" class="mt-1">
            {{ l.name }}
          </b-col>
          <b-col sm="6">
            <b-form-input
              :list="'list-schnell-'+i"
              v-model="l.schnelleingabe"
              placeholder="Bezeichnung auswählen ..."
            ></b-form-input>
            <datalist :id="'list-schnell-'+i">
              <template v-for="ll in l.sub">
                <template v-if="ll.sub">
                  <option v-for="lll in ll.sub" :key="lll.key">{{ lll.key }}</option>
                </template>
                <option v-else :key="ll.key">{{ ll.key }}</option>
              </template>
            </datalist>
          </b-col>
          <b-col sm="2" class="mt-1 text-right">
            <b-button variant="primary"
                      size="sm"
                      v-on:click="addSchnell(i)">
              <b-icon-plus />Hinzufügen
            </b-button>
          </b-col>
        </b-row>

        <div v-if="!l.einklappen">


          <template v-if="wep.methode==2">
            <div v-for="(v, vi) in reverseVorhanden(i)" :key="vi"
              class="mb-3 bg-light pl-2 pr-2 pt-2 pb-2">

              <!-- ----------------------------------------------- --
                -- Methode Koch / vereinfachte Fälle
                -- -----------------------------------------------
                -- bei Nebenanlagen (summentyp 1): Menge, Grundpreis, Minderung
                -- bei Bodenverbesserung (summentyp 1): Menge, Grundpreis, Minderung
                -- bei Rasen / Beet (summentyp 5): Menge, Grundpreis, Minderung, Pflanzung
                -->
              <template v-if="v.summentyp==1 || v.summentyp==5">
                <b-row>
                  <b-col sm="4">
                    <strong>{{ v.key }}</strong>
                  </b-col>
                  <b-col sm="2">
                    <b-row>
                      <b-col sm="8" class="pr-0">
                        <b-form-input type="number" min="0" step="any" v-model.number="v.menge"/>
                      </b-col>
                      <b-col sm="4" class=" pl-1 text-left">
                        {{ v.einheit }}
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="2" class="text-right">Grundpreis</b-col>
                  <b-col sm="2" class="text-center">
                    <b-form-input type="number" v-model.number="v.grundpreis"/>
                  </b-col>
                  <b-col sm="2" class="text-right">
                    <template v-if="preisAnzeigen">
                      {{ formatEuro(sachwertZumStichtag(v)) }}
                    </template>
                  </b-col>
                </b-row>
                <b-row>
                  <template v-if="v.summentyp==5">
                    <b-col sm="2" class="text-right">Pflanzung</b-col>
                    <b-col sm="3" class="text-center">
                      {{ v.pflanzung }} %
                      <b-form-input type="range" min="0" max="100" step="1" v-model.number="v.pflanzung"/>
                    </b-col>
                  </template>
                  <template v-else>
                    <b-col sm="4">
                      <b-form-input type="text" v-model="v.kriterien"/>
                    </b-col>
                    <b-col sm="1">
                    </b-col>
                  </template>
                  <b-col sm="2" class="text-right">Minderung</b-col>
                  <b-col sm="3" class="text-center">
                    {{ v.minderung }} %
                    <b-form-input type="range" min="0" max="100" step="5" v-model.number="v.minderung"/>
                  </b-col>
                  <b-col sm="2" class="text-right">
                    <template v-if="i==0"> <!-- nur bei Nebenanlagen -->
                      <b-button variant="danger" size="sm" aria-label="Löschen"
                                v-on:click="wep.vorhanden[i].splice(wep.vorhanden[i].length-1-vi, 1)">
                        <b-icon-x />Löschen
                      </b-button>
                    </template>
                  </b-col>
                </b-row>
                <template v-if="i!=0"> <!-- bei Nebenanlagen nicht-->
                  <b-row>
                    <b-col sm="10" class="text-right">
                      <b-form-checkbox-group v-model="v.minderungsgruende" :options="textMinderungsgrund"/>
                    </b-col>
                    <b-col sm="2" class="text-right">
                      <b-button variant="danger" size="sm" aria-label="Löschen"
                                v-on:click="wep.vorhanden[i].splice(wep.vorhanden[i].length-1-vi, 1)">
                      <b-icon-x />Löschen
                      </b-button>
                    </b-col>
                  </b-row>
                </template>
              </template>



              <!-- ----------------------------------------------- --
                -- Methode Koch / vollständige Fälle
                -- ----------------------------------------------- -->
              <template v-else>
                <b-row>
                  <b-col sm="4">
                    <strong>{{ v.key }}</strong>
                  </b-col>
                  <b-col sm="2">
                    <b-row>
                      <b-col sm="8" class="pr-0">
                        <b-form-input type="number" min="0" step="any" v-model.number="v.menge"/>
                      </b-col>
                      <b-col sm="4" class=" pl-1 text-left">
                        {{ v.einheit }}
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="2" class="text-right">Grundpreis</b-col>
                  <b-col sm="2" class="text-center">
                    <b-form-input type="number" v-model.number="v.grundpreis"/>
                  </b-col>
                  <b-col sm="2" class="text-right">
                    <template v-if="preisAnzeigen">
                      {{ formatEuro(sachwertZumStichtag(v)) }}
                    </template>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="2" class="text-right">Pflanzung</b-col>
                  <b-col sm="3" class="text-center">
                    {{ v.pflanzung }} %
                    <b-form-input type="range" min="0" max="100" step="5" v-model.number="v.pflanzung"/>
                  </b-col>
                  <b-col sm="2" class="text-right">Anwachsrisiko</b-col>
                  <b-col sm="3" class="text-center">
                    {{ v.anwachsrisiko }} %
                    <b-form-input type="range" min="0" max="20" step="1" v-model.number="v.anwachsrisiko"/>
                  </b-col>
                  <b-col sm="2"></b-col>
                </b-row>
                <b-row>
                  <b-col sm="2" class="text-right">Pflege</b-col>
                  <b-col sm="3" class="text-center">
                    {{ v.pflege }} %
                    <b-form-input type="range" min="0" max="100" step="1" v-model.number="v.pflege"/>
                  </b-col>
                  <b-col sm="2" class="text-right">Alterswertminderung</b-col>
                  <b-col sm="3" class="text-center">
                    {{ v.alterswertminderung }} %
                    <b-form-input type="range" min="0" max="100" step="5" v-model.number="v.alterswertminderung"/>
                  </b-col>
                  <b-col sm="2"></b-col>
                </b-row>
                <b-row>
                  <b-col sm="3" class="text-right">Herstellungsdauer</b-col>
                  <b-col sm="2">
                    <b-row>
                      <b-col sm="8" class="pr-0">
                        <b-form-input type="number" min="0" step="any" v-model.number="v.herstellungsdauer"/>
                      </b-col>
                      <b-col sm="4" class=" pl-1 text-left">Jahre</b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="2" class="text-right">Minderung</b-col>
                  <b-col sm="3" class="text-center">
                    {{ v.minderung }} %
                    <b-form-input type="range" min="0" max="100" step="5" v-model.number="v.minderung"/>
                  </b-col>
                  <b-col sm="2"></b-col>
                </b-row>
                <b-row>
                  <b-col sm="8" class="text-right">
                    <b-form-checkbox-group v-model="v.minderungsgruende" :options="textMinderungsgrund"/>
                  </b-col>
                  <b-col sm="2">
                    <b-form-input type="text" v-model="v.kriterien"/>
                  </b-col>
                  <b-col sm="2" class="text-right">
                    <b-button variant="danger" size="sm" aria-label="Löschen"
                              v-on:click="wep.vorhanden[i].splice(wep.vorhanden[i].length-1-vi, 1)">
                    <b-icon-x />Löschen
                    </b-button>
                  </b-col>
                </b-row>
              </template>



            </div>
          </template>



          <!-- ----------------------------------------------- --
            -- Bewertungsmethode Grundpreisspanne
            -- ----------------------------------------------- -->
          <template v-if="wep.methode==1">
        <div class="mb-3 bg-light pl-2 pr-2 pt-2" v-if="!l.einklappen">
          <b-row v-for="(v, vi) in reverseVorhanden(i)" :key="vi">
            <b-col sm="3">
              {{ v.key }}
            </b-col>
            <b-col sm="2">
              <b-row>
                <b-col sm="8" class="pr-0">
                  <b-form-input type="number" min="0" step="any" v-model.number="v.menge"/>
                </b-col>
                <b-col sm="4" class=" pl-1 text-left">
                  {{ v.einheit }}
                </b-col>
              </b-row>
            </b-col>

            <b-col sm="2 text-center">
              {{ v.minderung }} %
              <b-form-input type="range" min="0" max="100" step="5" v-model="v.minderung"/>
            </b-col>
            <template v-if="preisAnzeigen">
              <b-col sm="3">
                <b-form-input type="text" v-model="v.kriterien"/>
              </b-col>
              <b-col sm="1" class="text-right">
                {{ formatEuro(wertVorhanden(v)) }}
              </b-col>
            </template>
            <template v-else>
              <b-col sm="4">
                <b-form-input type="text" v-model="v.kriterien"/>
              </b-col>
            </template>

            <b-col sm="1">
              <b-button variant="danger" size="sm" aria-label="Löschen"
                        v-on:click="wep.vorhanden[i].splice(wep.vorhanden[i].length-1-vi, 1)">
              <b-icon-x />
              </b-button>
            </b-col>
          </b-row>
        </div>
          </template> 



          <!-- ----------------------------------------------- --
            -- Methode einfach: fester Grundpreis
            -- ----------------------------------------------- -->
          <template v-if="wep.methode==0">
            <b-row v-for="(v, vi) in reverseVorhanden(i)" :key="vi">
              <b-col sm="3">
                {{ v.key }}
              </b-col>
              <b-col sm="2">
                <b-row>
                  <b-col sm="8" class="pr-0">
                    <b-form-input type="number" min="0" step="any" v-model.number="v.menge"/>
                  </b-col>
                  <b-col sm="4" class=" pl-1 text-left">
                    {{ v.einheit }}
                  </b-col>
                </b-row>
              </b-col>

              <b-col sm="2 text-center">
                {{ v.minderung }} %
                <b-form-input type="range" min="0" max="100" step="5" v-model.number="v.minderung"/>
              </b-col>
              <template v-if="preisAnzeigen">
                <b-col sm="3">
                  <b-form-input type="text" v-model="v.kriterien"/>
                </b-col>
                <b-col sm="1" class="text-right">
                  {{ (Math.round(v.menge * v.grundpreis * (100-v.minderung))/100).toFixed(2) }}
                </b-col>
              </template>
              <template v-else>
                <b-col sm="4">
                  <b-form-input type="text" v-model="v.kriterien"/>
                </b-col>
              </template>

              <b-col sm="1">
                <b-button variant="danger" size="sm" aria-label="Löschen"
                          v-on:click="wep.vorhanden[i].splice(wep.vorhanden[i].length-1-vi, 1)">
                <b-icon-x />
                </b-button>
              </b-col>
            </b-row>
          </template>


        </div>
      </b-container>
    </template>


    <b-container>
      <h2 id="ergebnis">Ergebnis</h2>

      <!-- --------------------------------------------------------- --
        -- Nicht bewertet
        -- --------------------------------------------------------- -->

      <b-row class="bg-gradient-secondary mr-0 mt-2 pt-1 pb-1">
        <b-col sm="1"></b-col>
        <b-col sm="11">Nicht bewertete Anlagen</b-col>
      </b-row>
      <div class="mb-3 bg-light pl-2 pr-2 pt-2">
        <b-row class="pb-1">
          <b-col sm="10">
            <b-form-input list="list-nicht" v-model="inputNichtBewertet.name"></b-form-input>
            <b-form-datalist id="list-nicht" :options="vorschlagNichtBewertet"></b-form-datalist>
          </b-col>
          <b-col sm="2" class="text-right">
            <b-button variant="primary" size="sm"
              v-on:click="addNichtBewertet">
              <b-icon-plus />Hinzufügen
            </b-button>
          </b-col>
        </b-row>
        <b-row class="pb-1" v-for="(n, ni) in wep.nichtbewertet" :key="ni">
          <b-col sm="10"> {{ n.name }} </b-col>
          <b-col sm="2" class="text-right">
            <b-button variant="danger" size="sm"
                      v-on:click="wep.nichtbewertet.splice(ni, 1)">
              <b-icon-x />Löschen
            </b-button>
          </b-col>
        </b-row>
      </div>

      <!-- --------------------------------------------------------- --
        -- Auflagen
        -- --------------------------------------------------------- -->

      <b-row class="bg-gradient-secondary mr-0 mt-2 pt-1 pb-1">
        <b-col sm="1"></b-col>
        <b-col sm="11">Auflagen</b-col>
      </b-row>
      <div class="mb-3 bg-light pl-2 pr-2 pt-2">
        <b-row class="pb-1">
          <b-col sm="8">
            <b-form-input list="list-auflagen" v-model="inputAuflagen.name"></b-form-input>
            <b-form-datalist id="list-auflagen" :options="vorschlagAuflagen"></b-form-datalist>
          </b-col>
        <b-col sm="2" class="pr-0">
          <b-form-input type="number" v-model.number="inputAuflagen.preis"/>
        </b-col>
          <b-col sm="2" class="text-right">
            <b-button variant="primary" size="sm"
              v-on:click="addAuflagen">
              <b-icon-plus />Hinzufügen
            </b-button>
          </b-col>
        </b-row>
        <b-row class="pb-1" v-for="(a, ai) in wep.auflagen" :key="ai">
          <b-col sm="8"> {{ a.name }} </b-col>
          <b-col sm="2"> {{ a.preis }} €</b-col>
          <b-col sm="2" class="text-right">
            <b-button variant="danger" size="sm"
                      v-on:click="wep.auflagen.splice(ai, 1)">
              <b-icon-x />Löschen
            </b-button>
          </b-col>
        </b-row>
      </div>

      <!-- --------------------------------------------------------- --
        -- Gesamtbewertung
        -- --------------------------------------------------------- -->

      <b-row class="bg-gradient-secondary mr-0 mt-2 pt-1 pb-1">
        <b-col sm="1"></b-col>
        <b-col sm="11">Gesamtbewertung</b-col>
      </b-row>
      <div class="mb-3 bg-light pl-2 pr-2 pt-2">
        <b-row class="mt-2 mb-2 pb-2">
          <b-col>
            <b-form-textarea placeholder="Gesamtbewertung des Gartens"
                             rows="4"
                             v-model="wep.gesamtbewertung"/>
          </b-col>
        </b-row>
      </div>

      <template v-if="custom.Anmerkungen">
        <b-row class="bg-gradient-secondary mr-0 mt-2 pt-1 pb-1">
          <b-col sm="1"></b-col>
          <b-col sm="11">Anmerkungen</b-col>
        </b-row>
        <div class="mb-3 bg-light pl-2 pr-2 pt-2">
          <b-row class="mt-2 mb-2 pb-2">
            <b-col>
              <b-form-textarea placeholder="nur ausfüllen, falls notwendig"
                               rows="4"
                               v-model="wep.anmerkungen"/>
            </b-col>
          </b-row>
        </div>
      </template>

      <!-- --------------------------------------------------------- --
        -- Warnungen
        -- --------------------------------------------------------- -->

      <b-alert show variant="danger" 
               v-if="warnFlaechensumme">
        Warnung: Die Gesamtsumme der angegebenen Flächen 
        ({{ summeFlaeche }} m²)
        übersteigt die Gesamtgartenfläche
        ({{ wep.grunddaten.parzellenflaeche }} m²)
      </b-alert>
      <b-alert show variant="danger"
               v-if="anzahlWarnungen != 0">
        Warnung: Es gibt noch {{ anzahlWarnungen }} Warnungen wegen Ungereimtheiten in den Angaben
      </b-alert>


      <!-- --------------------------------------------------------- --
        -- Gesamtsumme
        -- --------------------------------------------------------- -->

      <template v-if="wep.methode==2">
        <b-row class="bg-gradient-secondary mr-0 mt-2 pt-1 pb-1">
          <b-col sm="1"></b-col>
          <b-col sm="11">Gesamtsumme</b-col>
        </b-row>
        <div class="mb-3 bg-light pl-2 pr-2 pt-2">
          <b-row class="pt-2">
            <b-col sm="3">Baulichkeiten</b-col>
            <b-col sm="2" class="text-right">{{ formatEuro(gesamtsummeBau) }}</b-col>
          </b-row>
          <b-row class="pt-2">
            <b-col sm="3">Nebenanlagen</b-col>
            <b-col sm="2" class="text-right">{{ formatEuro(summeNebenanlagen) }}</b-col>
          </b-row>
          <b-row class="pt-2">
            <b-col sm="3">Gärtnerische Kulturen</b-col>
            <b-col sm="2" class="text-right">{{ formatEuro(summeKulturenKoch) }}</b-col>
          </b-row>
          <b-row class="pt-2">
            <b-col sm="3">Zierbegrünung</b-col>
            <b-col sm="2" class="text-right">{{ formatEuro(summeZierKoch) }}</b-col>
          </b-row>
          <b-row class="pt-2 pb-2">
            <b-col sm="3">Entschädigung insgesamt</b-col>
            <b-col sm="2" class="text-right font-weight-bold">
              {{ formatEuro(entschaedigungKoch) }}
            </b-col>
          </b-row>
       </div>
      </template>
      <template v-else>

      <b-row class="bg-gradient-secondary mr-0 mt-2 pt-1 pb-1">
        <b-col sm="1"></b-col>
        <b-col sm="11">Gesamtsumme</b-col>
      </b-row>
      <div class="mb-3 bg-light pl-2 pr-2 pt-2">
        <b-row class="pt-2">
          <b-col sm="3"></b-col>
          <b-col sm="2" class="text-right">ungemindert</b-col>
          <b-col sm="3" class="text-center">Minderung</b-col>
          <b-col sm="2" class="text-right">Gesamtsumme</b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col sm="3">Baulichkeiten</b-col>
          <b-col sm="7" class="text-right">{{ formatEuro(gesamtsummeBau) }}</b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col sm="3">Nebenanlagen</b-col>
          <b-col sm="7" class="text-right">{{ formatEuro(summeNebenanlagen) }}</b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col sm="3">Gärtnerische Kulturen</b-col>
          <b-col sm="2" class="text-right">{{ formatEuro(summeKulturen) }}</b-col>
          <b-col sm="2" class="text-center">
            <b-form-input type="range" min="0" max="100" v-model="wep.minderungKulturen"/>
          </b-col>
          <b-col sm="1">
            {{ wep.minderungKulturen }} %
          </b-col>
          <b-col sm="2" class="text-right">
            {{ formatEuro(geminderteKulturen) }}
          </b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col sm="3">Zierbegrünung</b-col>
          <b-col sm="2" class="text-right">{{ formatEuro(gesamtsummeZier) }}</b-col>
          <b-col sm="2">
            <b-form-input type="range" min="0" max="100" v-model="wep.minderungZier" />
          </b-col>
          <b-col sm="1"> {{ wep.minderungZier }} % </b-col>
          <b-col sm="2" class="text-right">{{ formatEuro(geminderteZier) }}</b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col sm="3">Abzug für Auflagen</b-col>
          <b-col sm="7" class="text-right">{{ formatEuro(-summeAuflagen) }}</b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col sm="8">Leistungen für die Erstellung von Gemeinschaftseinrichtungen</b-col>
          <b-col sm="2">
            <b-form-input type="number" v-model.number="wep.leistungen"/>
          </b-col>
        </b-row>
        <b-row class="pt-2 pb-2">
          <b-col sm="3">Entschädigung insgesamt</b-col>
          <b-col sm="7" class="text-right font-weight-bold">
            {{ formatEuro(parseFloat(entschaedigung)) }}
          </b-col>
        </b-row>
     </div>
     </template>
    </b-container>
    <b-container>
      <h2>.</h2>
    </b-container>
  </div>
</template>








<script>
import Vue from 'vue'

// Icons are from npm package vue-material-design-icons
// but `import AccountIcon from 'vue-material-design-icons/Account.vue'` may
// cause the error `ENOSPC: System limit for number of file watchers reached`
import AccountIcon from './icons/Account.vue'
import HomeIcon from './icons/Home.vue'
import WaterPumpIcon from './icons/WaterPump.vue'
import FruitGrapesIcon from './icons/FruitGrapes.vue'
import BarleyIcon from './icons/Barley.vue'
import BikeFastIcon from './icons/BikeFast.vue'
import SigmaIcon from './icons/Sigma.vue'
import ContentSaveIcon from './icons/ContentSave.vue'
import PrinterIcon from './icons/Printer.vue'

import Protokoll from './Protokoll.vue'
import ProtokollKoch from './ProtokollKoch.vue'
import Ueber from '../customize/Ueber.vue'
import Schema from '../assets/schema.json'


export default {
  name: 'Eingabe',

  CustomSchema: Schema,

  components: {
    AccountIcon,
    HomeIcon,
    WaterPumpIcon,
    FruitGrapesIcon,
    BarleyIcon,
    BikeFastIcon,
    SigmaIcon,
    ContentSaveIcon,
    PrinterIcon,

    'CustomUeber': Ueber,
  },

  data() {
    return {
      wepFile: null,
      wepDateiname: "",
      wepDateinameModified: false,
      einstellungenEinklappen: false,
      preisAnzeigen: true,
      result: '',
      helper_breite: 0,
      helper_laenge: 0,
      gliederung: [],

      custom: {
        Konfigurierbar: false,
          // false: Konfiguration ist unveränderlich
          // true:  Konfiguration zur Laufzeit ist möglich
        EingabeArt: 1,
          // 1: hierarchisches Formular
          // 2: Combobox
          // 3: editierbare Liste (TODO)
        AdressEingabe: false,
          // false: Adresse des Eigentümers wird nicht erfasst
          // true:  Adresse des Eigentümers wird erfasst
        ZustandsArray: false,
          // false: Gebäudezustand als einfache Zeichenkette
          // true:  Gebäudezustand als Array
        Anmerkungen: false,
          // false: nur Gesamtbewertung
          // true:  zusätzliche Anmerkungen zur Gesamtbewertung
        Siegel: false,
          // false: Protokoll ohne Siegel
          // true:  Protokoll mit Siegel
      },

      inputNichtBewertet: {name:""},
      inputAuflagen: {name:"", preis:0},
      wep: {
        methode: 0, // 0 fixer Grundpreis, 1 Grundpreisspanne, 2 Koch
        grunddaten: {
          verband: "",
          anlage: "",
          parzellennummer: "",
          parzellenflaeche: 0,
          paechtername: "",
          paechteranwesend: true,
          strasse: "",
          ort: "",
          anwesend: "",
          datum: "",
          zinssatz: 4.0,
        },
        gebaeude: [], /* will be filled with einGebaeude */
        baukostenindex: 0,
        vorhanden: [[], [], [],],
        minderungKulturen: 0,
        minderungZier: 0,
        nichtbewertet: [],
        auflagen: [],
        gesamtbewertung: "",
        anmerkungen: "",
        leistungen: 0,
      },
      vorschlagZustand: [],
      vorschlagNichtBewertet: [],
      vorschlagAuflagen: [],
      textMinderungsgrund: [
        "Art/Standort/Wachstum",
        "Erziehungsfehler",
        "Pflegemängel",
        "weitere",
      ],
      einGebaeude: "",
      templateGebaeude: {
        einklappen: false,
        art: "Laube",
        normalherstellungswert: 0,
        abschreibungssatz: 2.00,
        prozentualerRestwert: 0,
        flaeche: 0,
        flaecheZuviel: "",
        hoehe: 0,
        baujahr: 2000,
        ausstattung: [],
        fenster: 0,
        tueren: 0,
        zustand: "",
        zustandArray: [],
      },
      einFreisitz: `{
        "einklappen": false,
        "art": "Freisitz",
        "normalherstellungswert": 0,
        "abschreibungssatz": 2.00,
        "prozentualerRestwert": 0,
        "flaeche": 0,
        "baujahr": 2000,
        "einbezogen": false,
        "zustand": "",
        "zustandArray": []
      }`,
    }
  },


  mounted() {

    // benutzerdefiniertes Schema einlesen
    this.gliederung             = this.$options.CustomSchema.gliederung;
    this.templateGebaeude.ausstattung = this.$options.CustomSchema.ausstattung;
    this.einGebaeude = JSON.stringify(this.templateGebaeude);
    this.vorschlagZustand       = this.$options.CustomSchema.vorschlagZustand;
    this.vorschlagNichtBewertet = this.$options.CustomSchema.vorschlagNichtBewertet;
    this.vorschlagAuflagen      = this.$options.CustomSchema.vorschlagAuflagen;
    this.custom                 = this.$options.CustomSchema.custom;

    // set datum datepicker to current date
    const today = new Date();
    const mm = today.getMonth() + 1; // getMonth() is zero-based
    const dd = today.getDate();
    const yyyy = today.getFullYear();
    this.wep.grunddaten.datum = [
        yyyy,
        '-',
        (mm>9 ? '' : '0') + mm,
        '-',
        (dd>9 ? '' : '0') + dd
      ].join('');

    // Es gibt immer mindestens eine Laube und einen Freisitz
    this.wep.gebaeude.push(JSON.parse(this.einGebaeude));
    this.wep.gebaeude.push(JSON.parse(this.einFreisitz));
    this.wep.gebaeude[0].baujahr = yyyy - 50;
    this.wep.gebaeude[1].baujahr = yyyy - 50;

    // after refresh, read wep from local storage
    if (localStorage.getItem('wep')) {
      try {
        this.wep = JSON.parse(localStorage.getItem('wep'));
      } catch(e) {
        localStorage.removeItem('wep');
        // delete local storage copy if it was modified
      }
    }

  },


  /* whenever anything within wep changes, write wep  to the local storage */
  watch: {
    wep: {
      deep: true, /* important to watch the whole object tree */
      handler: function(newWep) {
        localStorage.setItem('wep', JSON.stringify(newWep));
      }
    }
  },


  methods: {

    rundeCent: function(x) {
      return Math.round(100*x)/100;
    },

    stepOneOrHalf(min, max) {
        return ((Math.floor(max)!=max) || (Math.floor(min)!=min)) ? 0.5 : 1;
    },

    setDateiname(input) {
      this.wepDateinameModified = true;
      this.wepDateiname = input;
    },

    vorschlagDateiname() {
      this.wepDateinameModified = false;
    },

    setVorhandenFindL3(v, level1, level2, newKey) {
      const s = this.gliederung[level1].sub[level2].sub;
      const level3 = s.findIndex(x => x.key == newKey);
      const f = s[level3];
      v.key = newKey;
      v.einheit = f.einheit;
      v.iwmin = f.iwmin;
      v.iwmax = f.iwmax;
      v.iwstep = this.stepOneOrHalf(f.iwmin, f.iwmax);
      v.grundpreis = f.grundpreis;
      v.summentyp = f.summentyp
      v.level1i = level1;
      v.level2i = level2;
      v.level3i = level3;
    },

    setVorhandenL2(v, level1, level2) {
      const f = this.gliederung[level1].sub[level2];
      v.key = f.key;
      v.einheit = f.einheit;
      v.iwmin = f.iwmin;
      v.iwmax = f.iwmax;
      v.iwstep = this.stepOneOrHalf(f.iwmin, f.iwmax);
      v.grundpreis = f.grundpreis;
      v.summentyp = f.summentyp
      v.level1i = level1;
      v.level2i = level2;
      v.level3i = 0;
    },

    pushEmptyVorhanden : function(index1, index2) {
      return this.wep.vorhanden[index1].push({
        key:"",
        einheit:"",
        iwmin:0,
        iwmax:0,
        iwstep:1,
        grundpreis:0,
        summentyp:0,
        level2i:index2,
        level3i:0,
        menge:1,
        minderung:0,
        kriterien:"",
        pflanzung:35,
        pflege:30,
        anwachsrisiko:5,
        alterswertminderung:0,
        herstellungsdauer:10,
        minderungsgruende:[],
      });
    },

    addSchnell(index1) {
      const newKey = this.gliederung[index1].schnelleingabe;
      if (newKey) {
        this.gliederung[index1].schnelleingabe = "";
        const j = this.pushEmptyVorhanden(index1, -1);
        const l = this.gliederung[index1];
        for (let index2=0; index2<l.sub.length; index2++) {
          const ll = l.sub[index2];
          if (typeof ll.sub === 'undefined') {
            // no 3rd level
            if (ll.key == newKey) {
              this.setVorhandenL2(this.wep.vorhanden[index1][j-1],
                index1, index2);
              return;
            }
          } else {
            for (let iii=0; iii<ll.sub.length; iii++) {
              const lll = ll.sub[iii];
              if (lll.key == newKey) {
                const v = this.wep.vorhanden[index1][j-1];
                v.key = newKey;
                v.einheit = lll.einheit;
                v.iwmin = lll.iwmin;
                v.iwmax = lll.iwmax;
                v.iwstep = this.stepOneOrHalf(lll.iwmin, lll.iwmax);
                v.grundpreis = lll.grundpreis;
                v.summentyp = lll.summentyp
                v.level1i = index1;
                v.level2i = index2;
                v.level3i = iii;
                return;
              }
            }
          }
        }
      }
    },

    addLevel2(level2, index1, index2) {
      if (level2.sub) {
        // If there is another level, don't set the radio button (key="").
        this.pushEmptyVorhanden(index1, index2);
      } else {
        const j = this.pushEmptyVorhanden(index1, -1);
        this.setVorhandenL2(this.wep.vorhanden[index1][j-1],
          index1, index2);
      }
    },

    wertVorhanden(v) {
      return Math.round(v.grundpreis*v.menge*(100-v.minderung)) / 100;
    },

    accVorhanden(acc, v) {
      return acc + this.wertVorhanden(v);
    },

    vorhandenListe : function(i1, i2) {
      return this.wep.vorhanden[i1].filter(v => (v.level2i==i2));
    },

    addGebaeudeZustand(gebaeude) {
        if (gebaeude.zustand) {
            gebaeude.zustandArray.push(gebaeude.zustand);
            gebaeude.zustand = "";
        }
    },

    addNichtBewertet() {
        if (this.inputNichtBewertet.name) {
            this.wep.nichtbewertet.push(this.inputNichtBewertet);
            this.inputNichtBewertet = {name:''};
        }
    },

    addAuflagen() {
        if (this.inputAuflagen.name) {
            this.wep.auflagen.push(this.inputAuflagen);
            this.inputAuflagen = {name:'', preis:0};
        }
    },

    wepLaden(event) {
      this.wepFile = event.target.files[0];
      const fr = new FileReader();

      fr.onload = e => {
        this.wep = JSON.parse(e.target.result);
        this.setDateiname(event.target.files[0].name);
      }
      fr.readAsText(event.target.files[0]);
    },


    wepSpeichern() {

      /* if input fields are not empty, add them to the arrays */
      for (const g of this.wep.gebaeude) {
        this.addGebaeudeZustand(g);
      }
      this.addNichtBewertet();
      this.addAuflagen();

      var dData = JSON.stringify(this.wep, null, 2);
      var blob = new Blob([dData], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', this.getDateiname);
      document.body.appendChild(link);
      link.click();
    },


    /* Clear form by deleting wep in local storage and refresh */
    wepLoeschen() {
      localStorage.removeItem('wep');
      window.location.reload(false);
    },

    addGebaeude(art) {
      let dazu = JSON.parse(this.einGebaeude);
      dazu.art = art;

      // Starte mit 50 Jahre altem Gebäude
      //const today = new Date();
      //dazu.baujahr = today.getFullYear() - 50;

      this.wep.gebaeude.push(dazu)
    },

    wepGenerieren(drucken) {
      const ProtokollClass = Vue.extend(this.wep.methode==2 ? ProtokollKoch
                                                            : Protokoll);

      const rendered = new ProtokollClass({
        propsData: {
          custom: this.custom,
        },
        data: () => {
          return {
            wep: this.wep,
          }
        }
      }).$mount().$el.outerHTML;

      var win = window.open("","Wertermittlungsprotokoll");
      win.document.open();
      win.document.write(rendered);
      win.document.close();
      if (drucken) win.onload = function() { win.print(); }
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
      const r = Math.round(g.prozentualerRestwert * this.neuwert(g)) / 100;
      return (g.art=='Schaden') ? (-r) : r;
    },

    zeitwert: function(g) {
      const neuwert = this.neuwert(g);
      const abschreibung = this.gesamtAbschreibung(g.baujahr, g.abschreibungssatz);
      const r = Math.round(neuwert * (100-abschreibung)) / 100;
      return (g.art=='Schaden') ? (-r) : r;
    },

    onBerechnungshilfeClose() {
      this.$refs.popoverFlaeche.$emit('close');
    },

    reverseVorhanden: function(level1) {
      return this.wep.vorhanden[level1].slice().reverse();
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

    sachwertZumStichtag: function(v) {
        if (v.summentyp==1) /* Nebenanlagen und Bodenverbesserung */
            return (v.menge * v.grundpreis * (100-v.minderung) * 0.01);
        if (v.summentyp==5) /* Rasen und Beete */
            return (v.menge * v.grundpreis * (100+v.pflanzung) * (100-v.minderung) * 0.0001);
      return this.gesamtherstellungskosten(v) - this.preisAlterswertminderung(v) - this.preisMinderung(v);
    }

  },



  computed: {

    getDateiname() {
      if (this.wepDateinameModified) {
        return this.wepDateiname;
      }
      if (this.wep.grunddaten.anlage || this.wep.grunddaten.parzellennummer) {
        return (this.wep.grunddaten.anlage + " " + this.wep.grunddaten.parzellennummer + ".json");
      }
      return "neu.json";
    },

/*
    getDateiname() {
      return this.wepDateinameModified
          ? this.wepDateiname
          : (this.wep.grunddaten.anlage + " " + this.wep.grunddaten.parzellennummer + ".json");
    },
*/

    warnLaube() {
      return (this.wep.gebaeude[0] &&
        (this.wep.gebaeude[0].flaeche > 24));
    },

    warnFreisitz() {
      return (this.wep.gebaeude[0] &&
        (3.0*this.wep.gebaeude[1].normalherstellungswert > this.wep.gebaeude[0].normalherstellungswert));
    },

    warnNHW() {
      if (this.wep.methode == 2) return false; // bei Koch ist NHW nicht begrenzt
      return this.wep.gebaeude.reduce(
        (acc, g) => acc || g.normalherstellungswert>26.0,
        false);
    },

    befestigteFlaeche() {
      let sum = 0;
      for (const v of this.wep.vorhanden[0]) {
        if (v.key.substring(0, 17)=="Befestigte Fläche") {
          sum = sum + v.menge;
        }
      }
      return sum;
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

    warnRasen() {
      return (3*this.rasenFlaeche > this.wep.grunddaten.parzellenflaeche);
    },

    summeFlaeche() {
      // alle Gebäude
      let sum = this.wep.gebaeude.reduce((acc, g) => acc + g.flaeche, 0);

      // alle Nebenanlagen, Kulturen und Zierpflanzen mit Flächenangabe
      for (const k of this.wep.vorhanden) {
        for (const v of k) {
          if (v.einheit=="m²") {
            sum = sum + v.menge;
          }
        }
      }
      return sum;
    },

    warnFlaechensumme() {
      return (this.summeFlaeche > this.wep.grunddaten.parzellenflaeche);
    },

    anzahlWarnungen() {
        let sum = 0;
        if (this.warnLaube) sum = sum + 1;
        if (this.warnFreisitz) sum = sum + 1;
        if (this.warnBefestigt) sum = sum + 1;
        if (this.warnRasen) sum = sum + 1;
        if (this.warnFlaechensumme) sum = sum + 1;
        return sum;
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
        + this.summeZierKoch;
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  padding-top: 80px;
  text-align: center;
}
b-form-file {
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
