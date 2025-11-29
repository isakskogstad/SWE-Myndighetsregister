import React from 'react';
import { Database, Calendar, AlertCircle, FileText, ExternalLink, Info } from 'lucide-react';

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-primary-50 rounded-lg">
        <Icon className="w-5 h-5 text-primary-600" />
      </div>
      <h3 className="font-serif text-xl text-slate-900 font-semibold">{title}</h3>
    </div>
    <div className="text-slate-600 space-y-3 text-sm leading-relaxed">
      {children}
    </div>
  </div>
);

const DataSource = ({ name, url, description }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-slate-100"
  >
    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary-500 mt-0.5 flex-shrink-0" />
    <div>
      <div className="font-medium text-slate-900 group-hover:text-primary-700 transition-colors">{name}</div>
      <div className="text-xs text-slate-500 mt-0.5">{description}</div>
    </div>
  </a>
);

const AboutDataView = () => {
  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-bold text-white uppercase tracking-wider mb-4">
            <Database className="w-3.5 h-3.5" />
            Metodologi
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Om Data & Källor</h2>
          <p className="text-primary-50 text-lg leading-relaxed">
            Transparent information om datakällor, uppdateringsfrekvens, metodik och definitioner för Sveriges Myndighetsregister.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Datakällor */}
        <Section icon={Database} title="Datakällor">
          <p>
            Myndighetsdata samlas från flera officiella svenska källor för att säkerställa noggrannhet och reliabilitet:
          </p>
          <div className="space-y-2 mt-4">
            <DataSource
              name="Ekonomistyrningsverket (ESV)"
              url="https://www.esv.se/"
              description="Primär källa för myndighetsdata, budgetunderlag och anställningsstatistik"
            />
            <DataSource
              name="Statistiska centralbyrån (SCB)"
              url="https://www.scb.se/"
              description="Befolkningsstatistik, BNP-data och historiska tidsserier"
            />
            <DataSource
              name="Regeringskansliet"
              url="https://www.regeringen.se/"
              description="Organisationsförändringar, regeringsbeslut och departementsindelning"
            />
            <DataSource
              name="Civic Tech Sweden"
              url="https://github.com/civictechsweden/myndighetsdata"
              description="Öppen myndighetsdata i maskinläsbart format"
            />
          </div>
        </Section>

        {/* Uppdateringar */}
        <Section icon={Calendar} title="Uppdateringsfrekvens">
          <p>Data uppdateras enligt följande schema:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li><strong>Myndighetsregister:</strong> Månadsvis, baserat på ESV:s offentliggöranden</li>
            <li><strong>Anställningsdata:</strong> Kvartalsvis, när ny data publiceras av ESV</li>
            <li><strong>Könsfördelning:</strong> Årligen, baserat på SCB:s officiella statistik</li>
            <li><strong>Befolkning & BNP:</strong> Årligen, från SCB:s nationalräkenskaper</li>
          </ul>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Senast uppdaterad</div>
            <div className="text-slate-900 font-semibold">December 2024</div>
          </div>
        </Section>

        {/* Metodik */}
        <Section icon={FileText} title="Metodik & Beräkningar">
          <p><strong>Indexerad utveckling:</strong> Alla serier normaliseras till basåret (valbart), där basår = 100.
          Formeln är: <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono">Värde(år) / Värde(basår) × 100</code></p>

          <p><strong>Per capita:</strong> Värden divideras med Sveriges befolkning och multipliceras med 100 000 för att visa "per 100 000 invånare".</p>

          <p><strong>Könsfördelning:</strong> Beräknas som andel kvinnor/män av totalt antal anställda.
          Historiska data före 1990 är delvis estimerade baserat på linjär interpolation mellan kända datapunkter.</p>

          <p><strong>Percentilrankning:</strong> Varje myndighets position jämfört med alla andra aktiva myndigheter,
          baserat på antal anställda. Top 10% = 90:e percentilen.</p>
        </Section>

        {/* Definitioner */}
        <Section icon={Info} title="Definitioner">
          <dl className="space-y-3">
            <div>
              <dt className="font-semibold text-slate-900">Myndighet</dt>
              <dd className="text-slate-600 text-sm mt-1">
                Statlig förvaltningsmyndighet under regeringen enligt Regeringsformen.
                Inkluderar ej affärsverk eller bolag.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Anställda</dt>
              <dd className="text-slate-600 text-sm mt-1">
                Totalt antal anställda (heltid + deltid) per den 31 december varje år.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">FTE (Årsarbetskrafter)</dt>
              <dd className="text-slate-600 text-sm mt-1">
                Full-Time Equivalent - antal heltidstjänster efter omräkning av deltider.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Nedlagd myndighet</dt>
              <dd className="text-slate-600 text-sm mt-1">
                Myndighet som upphört genom regeringsbeslut. Uppgifter sparas för historisk analys.
              </dd>
            </div>
          </dl>
        </Section>

        {/* Datakvalitet */}
        <Section icon={AlertCircle} title="Datakvalitet & Begränsningar">
          <p><strong>Täckning:</strong> Data sträcker sig från 1978 till nutid.
          Tidigare perioder saknas på grund av bristfällig digital tillgång.</p>

          <p><strong>Luckor i data:</strong> Vissa myndigheter saknar komplett historik för anställda eller könsfördelning.
          Dessa markeras med <em>"Data ej tillgänglig"</em> eller estimeras baserat på närliggande år.</p>

          <p><strong>Organisationsförändringar:</strong> Vid sammanslagningar eller delningar spåras myndigheter
          som separata enheter före/efter ändringen. Detta kan skapa diskontinuitet i tidsserier.</p>

          <p><strong>Könsdata:</strong> Könsfördelning före 1995 är delvis rekonstruerad från aggregerad statistik
          och kan ha lägre precision.</p>

          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex gap-2 items-start">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-amber-900 text-xs">
                <strong>Obs:</strong> Data är avsedd för analys och översikt.
                För exakta siffror och juridiska beslut, kontakta respektive myndighet eller ESV.
              </p>
            </div>
          </div>
        </Section>

        {/* Kontakt & Feedback */}
        <Section icon={ExternalLink} title="Kontakt & Feedback">
          <p>Hittade du ett fel i datan eller har förslag på förbättringar?</p>

          <div className="space-y-3 mt-4">
            <a
              href="https://github.com/isakskogstad/myndigheter/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Rapportera problem på GitHub
            </a>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
              <p className="text-slate-600">
                Detta är ett öppet projekt skapat av <strong>Isak Skogstad</strong>.
                All källkod finns tillgänglig på GitHub under MIT-licens.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              <strong>Version:</strong> 10.0 • <strong>Senast uppdaterad:</strong> {new Date().toLocaleDateString('sv-SE')}
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default AboutDataView;
