'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from './AuthProvider';

const Spinner = () => (
  <div className="wrap section" role="status" aria-label="Carregando ferramenta" style={{ paddingTop: 'clamp(24px,4vw,48px)' }}>
    <div className="skel-grid">
      {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton skel-card" />)}
    </div>
  </div>
);

// Hub único de rota/pilotagem — funde Planejador, Minhas rotas, Trechos e Expedições
// num só lugar (antes eram 4 rotas separadas). Reaproveita as views existentes.
const TABS = [
  { id: 'planejar',   label: 'Planejar',     comp: dynamic(() => import('../../src/views/Planner'), { ssr: false, loading: Spinner }) },
  { id: 'rotas',      label: 'Rotas cadastradas', comp: dynamic(() => import('../../src/views/MyRoutes'), { ssr: false, loading: Spinner }) },
  { id: 'expedicoes', label: 'Expedições',   comp: dynamic(() => import('../../src/views/Expeditions'), { ssr: false, loading: Spinner }) },
];

export default function RotasHub({ initial = 'planejar' }) {
  const auth = useAuth();
  const [tab, setTab] = useState(TABS.some(t => t.id === initial) ? initial : 'planejar');
  const Active = (TABS.find(t => t.id === tab) || TABS[0]).comp;

  const onTabKeyDown = (event, index) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % TABS.length
      : event.key === 'ArrowLeft' ? (index + TABS.length - 1) % TABS.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setTab(TABS[next].id);
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next].focus();
  };

  return (
    <div className="rotas-hub">
      <div className="rotas-tabs" role="tablist" aria-label="Rotas e planejamento">
        {TABS.map((t, index) => (
          <button
            key={t.id}
            role="tab"
            id={`rotas-tab-${t.id}`}
            aria-controls="rotas-panel"
            aria-selected={tab === t.id}
            tabIndex={tab === t.id ? 0 : -1}
            className={`rotas-tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
            onKeyDown={event => onTabKeyDown(event, index)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id="rotas-panel" role="tabpanel" aria-labelledby={`rotas-tab-${tab}`} tabIndex={0}>
        <Active
        user={auth?.user}
        openAuthModal={auth?.openAuthModal}
        promptIdentity={auth?.promptIdentity}
        identity={auth?.identity}
        deviceId={auth?.deviceId}
        isAdmin={auth?.isAdmin}
        />
      </div>
    </div>
  );
}
