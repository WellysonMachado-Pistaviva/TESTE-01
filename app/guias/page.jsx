import PageIntro from '../components/PageIntro';
import Link from 'next/link';
import { GUIAS } from '../lib/guias';

const BASE = 'https://www.pistavivamototurismo.com.br';
export const revalidate = 3600;

export const metadata = {
  title: 'Guias de Mototurismo — Dicas para Viajar de Moto',
  description: 'Guias práticos de mototurismo: primeira viagem, o que levar, preparar a moto, equipamento, planejar rota, rodar na chuva, segurança e comboio. Tudo pra cair na estrada preparado.',
  alternates: { canonical: '/guias' },
  openGraph: { title: 'Guias de Mototurismo · Pistaviva', description: 'Dicas práticas pra planejar e fazer sua viagem de moto.', url: `${BASE}/guias`, type: 'website' },
};

export default function GuiasIndex() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Guias de Mototurismo', url: `${BASE}/guias`,
    isPartOf: { '@type': 'WebSite', name: 'Pistaviva', url: BASE },
    mainEntity: {
      '@type': 'ItemList', numberOfItems: GUIAS.length,
      itemListElement: GUIAS.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.titulo, url: `${BASE}/guias/${g.slug}` })),
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Guias', item: `${BASE}/guias` },
    ],
  };

  return (
    <div className="ignis ph-list">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="crumb" aria-label="Trilha">
        <div className="wrap">
          <Link href="/">Início</Link><span className="sep">/</span>
          <span className="here">Guias</span>
        </div>
      </nav>

      <PageIntro eyebrow="Antes da partida" title="A aventura começa no preparo." image="/motosul/mantiqueira.jpg" imageAlt="Serras e paisagem da Mantiqueira" action={{ href: "/guias/primeira-viagem-de-moto", label: "Minha primeira viagem" }}>
        Planejamento, equipamento e dicas práticas para viajar de moto. Do primeiro bate-volta à viagem que você sempre quis fazer.
      </PageIntro>

      <div className="wrap">
        <div className="ph-grid pv-collection-grid">
          {GUIAS.map((g) => (
            <Link className="ph-card" key={g.slug} href={`/guias/${g.slug}`}>
              <div className="body" style={{ padding: '16px 18px' }}>
                <span className="eyebrow" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--clay)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{g.categoria}</span>
                <h2 style={{ margin: '4px 0 6px' }}>{g.h1}</h2>
                <p className="desc">{g.resumo}</p>
                <span className="pv-card-action">Abrir guia <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          ))}
        </div>

        <section className="ph-cta" style={{ marginTop: 30 }}>
          <div className="inner">
            <h2>Pronto pra rodar?</h2>
            <p>Planeje a rota no modo curvas, veja paradas da comunidade e monte um comboio pra ir em grupo com rastreamento ao vivo.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <Link className="ig-btn ig-btn--primary" href="/rotas">Planejar rota</Link>
              <Link className="ig-btn ig-btn--ghost" href="/estradas">Estradas icônicas</Link>
              <Link className="ig-btn ig-btn--ghost" href="/comboio">Criar comboio</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
