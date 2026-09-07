import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Cover from './Cover';

export default function HomeExperiences() {
  return (
    <section className="ride-experiences" aria-labelledby="ride-experiences-title">
      <div className="wrap">
        <header className="ride-section-head">
          <div>
            <span className="ride-kicker">O destino é só o começo</span>
            <h2 id="ride-experiences-title">Viva além<br />do caminho.</h2>
          </div>
          <p>A estrada aproxima. A música, a comida e as pessoas dão mais motivos para ficar.</p>
        </header>
        <div className="ride-experience-grid">
          <Link href="/motosul" className="ride-experience ride-experience--festival">
            <Cover src="/motosul/hero-publico.jpg" alt="Público e motocicletas reunidos no Motosul Festival" sizes="(max-width: 760px) 100vw, 65vw" />
            <span className="ride-experience-shade" aria-hidden="true" />
            <span className="ride-experience-top"><span>Encontro de quem vive a estrada</span><ArrowUpRight aria-hidden="true" /></span>
            <span className="ride-experience-body">
              <span className="ride-place"><MapPin size={15} aria-hidden="true" /> Itajubá · Minas Gerais</span>
              <strong>Motosul<br /><em>Festival.</em></strong>
              <span>Motos, rock e sabores da Mantiqueira.</span>
              <span className="ride-experience-cta">Conheça a experiência <ArrowUpRight size={18} aria-hidden="true" /></span>
            </span>
          </Link>
          <Link href="/guias/primeira-viagem-de-moto" className="ride-experience ride-experience--guide">
            <Cover src="/motosul/mantiqueira.jpg" alt="Paisagem da Serra da Mantiqueira" sizes="(max-width: 760px) 100vw, 35vw" />
            <span className="ride-experience-shade" aria-hidden="true" />
            <span className="ride-experience-top"><span>Seu primeiro horizonte</span><ArrowUpRight aria-hidden="true" /></span>
            <span className="ride-experience-body">
              <span className="ride-place">Guia de viagem</span>
              <strong>A vontade<br />vira viagem.</strong>
              <span>Prepare sua primeira aventura sobre duas rodas.</span>
              <span className="ride-experience-cta">Comece por aqui <ArrowUpRight size={18} aria-hidden="true" /></span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
