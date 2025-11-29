import React from 'react';
import { Database, Calendar, AlertCircle, FileText, ExternalLink, Info } from 'lucide-react';
import ds from '../../styles/designSystem';

const Section = ({ icon: Icon, title, children }) => (
  <div className={ds.cn('bg-white border', ds.cardPadding.lg, ds.radius.lg, ds.shadows.card, ds.animations.normal)} style={{ borderColor: ds.colors.slate[200] }}>
    <div className={ds.cn('flex items-center mb-4', ds.spacing.md)}>
      <div className={ds.cn('p-2', ds.radius.md)} style={{ backgroundColor: ds.colors.primary[50] }}>
        <Icon className={ds.cn(ds.iconSizes.md)} style={{ color: ds.colors.primary[600] }} />
      </div>
      <h3 className={ds.cn('font-serif text-slate-900', ds.typography.sizes.xl, ds.typography.weights.semibold)}>{title}</h3>
    </div>
    <div className={ds.cn('text-slate-600 space-y-3', ds.typography.sizes.sm, ds.typography.leading.relaxed)}>
      {children}
    </div>
  </div>
);

const DataSource = ({ name, url, description }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={ds.cn('flex items-start p-3 border group', ds.spacing.md, ds.radius.md, ds.animations.normal, 'hover:bg-slate-50')} style={{ borderColor: ds.colors.slate[100] }}
  >
    <ExternalLink className={ds.cn(ds.iconSizes.sm, 'text-slate-400 mt-0.5 flex-shrink-0', ds.animations.normal)} style={{ color: ds.colors.primary[500] }} />
    <div>
      <div className={ds.cn('text-slate-900', ds.typography.weights.medium, ds.animations.normal)} style={{ color: ds.colors.primary[700] }}>{name}</div>
      <div className={ds.cn('text-slate-500 mt-0.5', ds.typography.sizes.xs)}>{description}</div>
    </div>
  </a>
);

const AboutDataView = () => {
  return (
    <div className={ds.cn('space-y-8 animate-fade-in')}>

      {/* Header */}
      <div className={ds.cn('bg-gradient-to-br p-8 md:p-12 text-white relative overflow-hidden', ds.radius.lg, ds.shadows.strong, ds.gradients.primary)}>
        <div className={ds.cn('relative z-10', ds.containers.content)}>
          <div className={ds.cn('inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white uppercase tracking-wider mb-4', ds.spacing.sm, ds.radius.full, ds.typography.sizes.xs, ds.typography.weights.bold)}>
            <Database className="w-3.5 h-3.5" />
            Metodologi
          </div>
          <h2 className={ds.cn('font-serif mb-4', ds.typography.sizes['3xl'], 'md:text-4xl', ds.typography.weights.bold)}>Om Data & Källor</h2>
          <p className={ds.cn('text-primary-50', ds.typography.sizes.lg, ds.typography.leading.relaxed)}>
            Transparent information om datakällor, uppdateringsfrekvens, metodik och definitioner för Sveriges Myndighetsregister.
          </p>
        </div>
        <div className={ds.cn('absolute right-0 top-0 w-96 h-96 bg-white/10 blur-3xl transform translate-x-1/2 -translate-y-1/2', ds.radius.full)}></div>
      </div>

      {/* Main Content Grid */}
      <div className={ds.cn('grid grid-cols-1 lg:grid-cols-2', ds.spacing.lg)}>

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
          <div className={ds.cn('mt-4 p-3 border', ds.radius.md)} style={{ backgroundColor: ds.colors.slate[50], borderColor: ds.colors.slate[100] }}>
            <div className={ds.cn('text-slate-500 uppercase tracking-wider mb-1', ds.typography.sizes.xs, ds.typography.weights.bold)}>Senast uppdaterad</div>
            <div className={ds.cn('text-slate-900', ds.typography.weights.semibold)}>December 2024</div>
          </div>
        </Section>

        {/* Metodik */}
        <Section icon={FileText} title="Metodik & Beräkningar">
          <p><strong>Indexerad utveckling:</strong> Alla serier normaliseras till basåret (valbart), där basår = 100.
          Formeln är: <code className={ds.cn('px-1.5 py-0.5 font-mono', ds.radius.sm, ds.typography.sizes.xs)} style={{ backgroundColor: ds.colors.slate[100] }}>Värde(år) / Värde(basår) × 100</code></p>

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
              <dt className={ds.cn('text-slate-900', ds.typography.weights.semibold)}>Myndighet</dt>
              <dd className={ds.cn('text-slate-600 mt-1', ds.typography.sizes.sm)}>
                Statlig förvaltningsmyndighet under regeringen enligt Regeringsformen.
                Inkluderar ej affärsverk eller bolag.
              </dd>
            </div>
            <div>
              <dt className={ds.cn('text-slate-900', ds.typography.weights.semibold)}>Anställda</dt>
              <dd className={ds.cn('text-slate-600 mt-1', ds.typography.sizes.sm)}>
                Totalt antal anställda (heltid + deltid) per den 31 december varje år.
              </dd>
            </div>
            <div>
              <dt className={ds.cn('text-slate-900', ds.typography.weights.semibold)}>FTE (Årsarbetskrafter)</dt>
              <dd className={ds.cn('text-slate-600 mt-1', ds.typography.sizes.sm)}>
                Full-Time Equivalent - antal heltidstjänster efter omräkning av deltider.
              </dd>
            </div>
            <div>
              <dt className={ds.cn('text-slate-900', ds.typography.weights.semibold)}>Nedlagd myndighet</dt>
              <dd className={ds.cn('text-slate-600 mt-1', ds.typography.sizes.sm)}>
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

          <div className={ds.cn('mt-4 p-3 border', ds.radius.md)} style={{ backgroundColor: ds.colors.status.warning.light, borderColor: ds.colors.status.warning.main }}>
            <div className={ds.cn('flex items-start', ds.spacing.sm)}>
              <AlertCircle className={ds.cn(ds.iconSizes.sm, 'mt-0.5 flex-shrink-0')} style={{ color: ds.colors.status.warning.dark }} />
              <p className={ds.cn(ds.typography.sizes.xs)} style={{ color: ds.colors.status.warning.dark }}>
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
              className={ds.cn('flex items-center px-4 py-2.5 text-white', ds.spacing.sm, ds.radius.md, ds.animations.normal, ds.typography.sizes.sm, ds.typography.weights.medium, ds.buttons.variants.primary)}
            >
              <ExternalLink className={ds.cn(ds.iconSizes.sm)} />
              Rapportera problem på GitHub
            </a>

            <div className={ds.cn('p-3 border', ds.radius.md, ds.typography.sizes.xs)} style={{ backgroundColor: ds.colors.slate[50], borderColor: ds.colors.slate[100] }}>
              <p className="text-slate-600">
                Detta är ett öppet projekt skapat av <strong>Isak Skogstad</strong>.
                All källkod finns tillgänglig på GitHub under MIT-licens.
              </p>
            </div>
          </div>

          <div className={ds.cn('mt-6 pt-4 border-t')} style={{ borderColor: ds.colors.slate[200] }}>
            <p className={ds.cn('text-slate-500', ds.typography.sizes.xs)}>
              <strong>Version:</strong> 10.0 • <strong>Senast uppdaterad:</strong> {new Date().toLocaleDateString('sv-SE')}
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default AboutDataView;
