import PageIntro from '../components/PageIntro';
import FipeSearch from './FipeSearch';

export const metadata = {
  title: 'Tabela FIPE de Motos — consulte o valor da sua moto',
  description: 'Consulte o preço da Tabela FIPE da sua moto: escolha marca, modelo e ano e veja o valor atualizado. Buscador FIPE de motos grátis da comunidade Pistaviva.',
  alternates: { canonical: '/fipe' },
  openGraph: { title: 'Tabela FIPE de Motos · Pistaviva', description: 'Consulte o valor FIPE da sua moto — grátis.' },
};

export default function FipePage() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'Tabela FIPE de Motos · Pistaviva', applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    description: 'Consulta gratuita do valor FIPE de motos por marca, modelo e ano.',
  };
  return (
    <div className="ignis fipe-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageIntro eyebrow="Antes de negociar" title="Conheça o valor da sua moto." compact>
        Selecione marca, modelo e ano para consultar a referência FIPE. Grátis e sem cadastro.
      </PageIntro>
      <section className="pg-main">
        <div className="wrap" style={{ maxWidth: 760, marginInline: 'auto' }}>
          <FipeSearch />
        </div>
      </section>
    </div>
  );
}
