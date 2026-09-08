'use client';

import { useId, useState } from 'react';

// Fita de fotos em deriva contínua.
//
// A referência (travelersevent.pt) usa Swiper com autoplay_speed próximo de
// zero e transição de 5s a 10s: o efeito não é passar slide a slide, é uma
// esteira que nunca para. Aqui isso sai de animação CSS — sem biblioteca
// nova, funciona sem JS e é trivial de desligar em movimento reduzido.
//
// A lista é duplicada e a animação desloca exatamente 50%, então a emenda
// cai sempre num ponto idêntico e o laço fica invisível.
export default function PhotoRibbon({
  items = [],
  duration = 60,
  reverse = false,
  bleed = false,
  label = 'Fotos das edições anteriores',
}) {
  const [paused, setPaused] = useState(false);
  const id = useId();

  if (!items.length) return null;

  const doubled = [...items, ...items];

  return (
    <div className={`pv-fita${bleed ? ' pv-fita--sangra' : ''}`}>
      <div
        className="pv-fita__janela"
        role="group"
        aria-roledescription="fita de fotos"
        aria-label={label}
      >
        <ul
          id={id}
          className={`pv-fita__trilho${reverse ? ' pv-fita__trilho--reverso' : ''}`}
          style={{ '--fita-dur': `${duration}s` }}
          data-pausada={paused ? 'sim' : 'nao'}
        >
          {doubled.map((item, i) => (
            <li
              className="pv-fita__item"
              key={`${item.src}-${i}`}
              /* A segunda volta é cópia visual: fica fora da árvore acessível
                 para o leitor de tela não anunciar cada foto duas vezes. */
              aria-hidden={i >= items.length ? 'true' : undefined}
            >
              <img
                src={item.src}
                alt={i >= items.length ? '' : item.alt}
                /* width/height são opcionais: a caixa do item já fixa a
                   proporção, então a ausência não gera salto de layout. */
                width={item.width || undefined}
                height={item.height || undefined}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* WCAG 2.2.2: movimento acima de 5s precisa de parada explícita.
          Pausa no hover não serve para quem navega por teclado. */}
      <button
        type="button"
        className="pv-fita__pausa"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-controls={id}
      >
        {paused ? 'Retomar' : 'Pausar'}
      </button>
    </div>
  );
}
