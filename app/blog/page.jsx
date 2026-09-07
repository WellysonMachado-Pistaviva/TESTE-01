import PageIntro from '../components/PageIntro';
import Link from 'next/link';
import Cover from '../components/Cover';
import { getPublishedPosts } from '../lib/blog';

export const revalidate = 300;

export const metadata = {
  title: 'Matérias de Mototurismo',
  description: 'Reportagens, guias de rotas, preparação de viagem, eventos e cultura do mototurismo brasileiro. Conteúdo Pistaviva.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'Matérias Pistaviva — Mototurismo', description: 'Reportagens, guias, rotas e cultura sobre duas rodas.' },
};

export default async function BlogList() {
  const posts = await getPublishedPosts(60);

  return (
    <div className="ignis ph-list">
      <PageIntro eyebrow="Caderno de bordo" title="Histórias que dão vontade de ir." image="/motosul/g-chegada.jpg" imageAlt="Motociclistas chegando ao Motosul Festival" action={{ href: "/comunidade", label: "Conhecer a comunidade" }}>
        Reportagens, relatos e cultura do mototurismo. A estrada contada por quem vive cada quilômetro.
      </PageIntro>

      <div className="wrap">
        {posts.length === 0 ? (
          <p style={{ color: 'var(--ink-soft)', padding: '10px 0 30px' }}>Ainda não há posts publicados. Volte em breve — conteúdo novo toda semana.</p>
        ) : (
          <div className="ph-grid pv-collection-grid">
            {posts.map(p => (
              <Link className="ph-card" key={p.id} href={`/blog/${p.slug}`}>
                <div className="pic">
                  {p.tags?.[0] && <span className="spot">{p.tags[0]}</span>}
                  {p.cover_url ? <Cover src={p.cover_url} alt={p.title} sizes="(max-width:600px) 100vw, 380px" /> : <span className="pic-ph">PISTAVIVA</span>}
                </div>
                <div className="body">
                  <h3 style={{ fontSize: 22 }}>{p.title}</h3>
                  <p className="desc">{p.excerpt || ''}</p>
                  <div className="foot">
                    <span className="loc">{p.author || 'Pistaviva'}</span>
                    {p.published_at && <span className="loc">{new Date(p.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' })}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div style={{ height: 'clamp(40px,6vw,72px)' }} />
    </div>
  );
}
