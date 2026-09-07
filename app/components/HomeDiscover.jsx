import Link from 'next/link';
import { ArrowDown, ArrowUpRight, CalendarDays, Compass, Route } from 'lucide-react';
import Cover from './Cover';

const journeys = [
  { href: '/destinos', icon: Compass, title: 'Encontrar meu destino', text: 'Lugares que fazem a viagem valer a pena.', step: '01' },
  { href: '/rotas', icon: Route, title: 'Planejar minha rota', text: 'Organize o caminho e estime os custos.', step: '02' },
  { href: '/eventos', icon: CalendarDays, title: 'Encontrar a turma', text: 'Encontros e eventos para sair da rotina.', step: '03' },
];

export default function HomeDiscover({ destination }) {
  return (
    <>
      <section className="ride-hero" aria-labelledby="ride-hero-title">
        <div className="ride-hero-photo">
          <Cover src={destination?.image_url || '/materias/bmw-motorrad-fest-2026/comboio-serra.jpg'} alt={destination?.nome || 'Motociclistas viajando em grupo por Campos do Jordão'} priority />
        </div>
        <div className="ride-hero-shade" aria-hidden="true" />
        <div className="wrap ride-hero-inner">
          <span className="ride-kicker"><span /> Mototurismo pelo Brasil</span>
          <h1 id="ride-hero-title">Vá pelo caminho.<br /><em>Volte pela história.</em></h1>
          <p>Estradas que surpreendem. Encontros que ficam. Descubra seu próximo motivo para viajar de moto.</p>
          <div className="ride-hero-actions">
            <Link href="/destinos" className="ride-button">Explorar destinos <ArrowUpRight aria-hidden="true" /></Link>
            <Link href="/rotas" className="ride-button ride-button--outline">Planejar minha viagem <Route aria-hidden="true" /></Link>
          </div>
          <div className="ride-hero-bottom">
            <a href="#proxima-saida">Encontre sua próxima saída <ArrowDown size={16} aria-hidden="true" /></a>
            <span>{destination?.nome || 'Pelo caminho, novas histórias.'}</span>
          </div>
        </div>
      </section>
      <nav className="ride-journeys wrap" aria-label="Como você quer começar?">
        {journeys.map(({ href, icon: Icon, title, text, step }) => (
          <Link href={href} key={href} className="ride-journey">
            <span className="ride-journey-icon"><Icon aria-hidden="true" /></span>
            <span className="ride-journey-copy"><small>{step} / SUA PRÓXIMA VIAGEM</small><strong>{title}</strong><span>{text}</span></span>
            <ArrowUpRight className="ride-journey-arrow" aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </>
  );
}
