'use client';

export default function ParqueDaCidadeError({ reset }) {
  return (
    <section style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: 32, textAlign: 'center' }}>
      <div>
        <strong style={{ display: 'block', fontSize: 24 }}>Guia indisponível agora.</strong>
        <p>Falha temporária ao carregar informações.</p>
        <button className="pv-action pv-action--primary" type="button" onClick={reset}>Tentar novamente</button>
      </div>
    </section>
  );
}
