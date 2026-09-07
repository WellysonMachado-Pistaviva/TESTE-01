// Header server-side (H1 + texto) renderizado no HTML inicial, ACIMA das views SPA
// que sobem com ssr:false. Garante que o Google encontre H1 + conteúdo indexável
// mesmo antes do JS rodar. Componente de servidor (sem 'use client').
import PageIntro from './PageIntro';

export default function SpaIntro(props) {
  return <PageIntro compact {...props} />;
}
