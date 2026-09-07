import PageIntro from '../../components/PageIntro';
import EventBuilder from './EventBuilder';

export const metadata = {
  title: 'Criar evento',
  description: 'Construtor de eventos da comunidade Pistaviva.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/eventos/criar' },
};

export default function Page() {
  return <>
    <PageIntro eyebrow="Reúna sua turma" title="Seu encontro começa aqui." compact>
      Conte onde, quando e o que vai acontecer. Prepare a página do seu evento e convide a comunidade.
    </PageIntro>
    <EventBuilder />
  </>;
}
