import Link from 'next/link';
import { DESTINOS } from '../lib/destinos';
import { ESTRADAS } from '../lib/estradas';
import { GUIAS } from '../lib/guias';
import { DESAFIOS } from '../lib/desafios';

// Índice do que existe no site, com o número real de cada coleção.
//
// A referência (travelersevent.pt) usa um bloco de números logo depois da
// dobra para dar densidade — mas os dela são de escala do evento ("18+
// edições"). Aqui os números saem de contagem do próprio conteúdo, então
// não há estatística nova nem alegação sobre o mundo: cada um é quantos
// itens a coleção tem hoje, e cada bloco leva à coleção.
//
// Por isso é índice, não vitrine de números: com este acervo, a leitura
// honesta é "onde ir a seguir", não "veja como somos grandes".
const COLECOES = [
  { total: DESTINOS.length, rotulo: 'Destinos', nota: 'Viagens que valem o ano', href: '/destinos' },
  { total: ESTRADAS.length, rotulo: 'Estradas', nota: 'Trechos que pedem moto', href: '/estradas' },
  { total: GUIAS.length, rotulo: 'Guias', nota: 'O que saber antes de sair', href: '/guias' },
  { total: DESAFIOS.length, rotulo: 'Desafios', nota: 'Rodar com meta na mão', href: '/desafios' },
];

export default function ContentIndex() {
  return (
    <section className="pv-indice" aria-labelledby="pv-indice-title">
      <div className="wrap">
        <h2 className="pv-indice__title" id="pv-indice-title">
          Já tem caminho mapeado aqui.
        </h2>

        <ul className="pv-indice__grade">
          {COLECOES.map((c) => (
            <li className="pv-indice__item" key={c.href}>
              <Link href={c.href} className="pv-indice__link">
                <span className="pv-indice__num">{c.total}</span>
                <span className="pv-indice__rotulo">{c.rotulo}</span>
                <span className="pv-indice__nota">{c.nota}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
