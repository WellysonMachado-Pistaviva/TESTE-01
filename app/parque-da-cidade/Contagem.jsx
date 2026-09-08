'use client';

import { useEffect, useState } from 'react';

// Contagem até o início da data do festival, sem pressupor horário dos portões.
const ALVO = Date.UTC(2027, 3, 10, 3, 0, 0); // 10 de abril de 2027, 00h (UTC-3)

const partes = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { v: Math.floor(s / 86400), l: 'dias' },
    { v: Math.floor((s % 86400) / 3600), l: 'horas' },
    { v: Math.floor((s % 3600) / 60), l: 'min' },
    { v: s % 60, l: 'seg' },
  ];
};

export default function Contagem() {
  // Só calcula no cliente: o servidor não tem "agora" igual ao do visitante.
  const [restante, setRestante] = useState(null);

  useEffect(() => {
    const tick = () => setRestante(ALVO - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pq-contagem">
      <p className="pq-contagem__label">Próxima grande data no parque</p>
      <ol className="pq-contagem__grid" aria-label="Contagem regressiva aproximada">
        {(restante === null ? [{ v: '–', l: 'dias' }, { v: '–', l: 'horas' }, { v: '–', l: 'min' }, { v: '–', l: 'seg' }] : partes(restante)).map((p) => (
          <li key={p.l}>
            <strong>{typeof p.v === 'number' ? String(p.v).padStart(2, '0') : p.v}</strong>
            <span>{p.l}</span>
          </li>
        ))}
      </ol>
      <p className="pq-contagem__nota">
        Motosul Festival · 10 e 11 de abril de 2027 — programação completa ainda será divulgada.
      </p>
    </div>
  );
}
