import ProductShowcase from '../components/ProductShowcase';
import SpaPage from '../components/SpaPage';
import SpaIntro from '../components/SpaIntro';

export const metadata = {
  title: 'Loja Pistaviva',
  description: 'Vestuário técnico e casual para quem vive sobre duas rodas.',
  alternates: { canonical: '/loja' },
  // Vitrine externa (redireciona pra loja própria) — sem conteúdo próprio pra indexar.
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <SpaIntro image="/products/community/casal-moto-real.jpg" imageAlt="Casal motociclista da comunidade Pistaviva" eyebrow="Vista a comunidade" title="Loja Pistaviva">
        Vestuário técnico e casual para quem vive sobre duas rodas. Produtos e itens da comunidade de mototurismo Pistaviva.
      </SpaIntro>
      <ProductShowcase />
      <SpaPage name="loja" />
    </>
  );
}
