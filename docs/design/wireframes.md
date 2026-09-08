# Wireframes — arquétipos de página

Cinco arquétipos cobrem o site. Página nova escolhe um deles em vez de inventar
estrutura. Tokens e escalas em [`tokens.md`](tokens.md).

## Moldura comum

Definida em [`app/layout.jsx`](../../app/layout.jsx). Toda página herda:

```
┌──────────────────────────────────────────────────────┐
│ AnnouncementBar        faixa fina, dispensável       │
├──────────────────────────────────────────────────────┤
│ SiteHeader             marca · nav · ação            │  ≥768px
│ MobileShell            barra inferior fixa           │  <768px
├──────────────────────────────────────────────────────┤
│                                                      │
│   [ conteúdo do arquétipo ]                          │
│                                                      │
├──────────────────────────────────────────────────────┤
│ SiteFooter             navegação e fechamento        │
└──────────────────────────────────────────────────────┘
```

Largura: `.wrap` = `--maxw` 1280 com calha `--gut`.
`.wrap--wide` sobe para 1320; `.wrap--narrow` desce para 760.

---

## 1. Coleção

Destinos, estradas, eventos, guias, fotógrafos, desafios.
Abre com fotografia; cards sobre `--pv-offwhite`.

```
┌──────────────────────────────────────────────────────┐
│ PageIntro  (pv-intro--photo)                         │
│   ┌────────────────────────────────────────────┐     │
│   │ fotografia de largura total                │     │
│   │  eyebrow  --mono                           │     │
│   │  H1       --display                        │     │
│   │  lead     --font                           │     │
│   │                        [ ação primária ↗ ] │     │
│   └────────────────────────────────────────────┘     │
├──────────────────────────────────────────────────────┤  --sec-y
│ grade de cards, fundo --pv-offwhite                  │
│  ┌───────┐ ┌───────┐ ┌───────┐                       │
│  │ foto  │ │ foto  │ │ foto  │   3 col ≥900          │
│  │ título│ │ título│ │ título│   2 col ≤900          │
│  │ meta  │ │ meta  │ │ meta  │   1 col ≤640          │
│  └───────┘ └───────┘ └───────┘                       │
├──────────────────────────────────────────────────────┤  --sec-y-sm
│ .ph-cta   chamada de fechamento                      │
└──────────────────────────────────────────────────────┘
```

Regras: card usa `--pv-radius`; meta em `--mono`; nunca sombra.

---

## 2. Detalhe

Um destino, uma estrada, um evento, um desafio, um fotógrafo.

```
┌──────────────────────────────────────────────────────┐
│ capa fotográfica + título sobreposto                 │
├──────────────────────────────────────────────────────┤  --sec-y
│ ┌────────────────────────────┐ ┌──────────────────┐  │
│ │ corpo                      │ │ lateral          │  │
│ │  descrição, listas, mapa   │ │  dados, ações,   │  │
│ │  .wrap--narrow no texto    │ │  compartilhar    │  │
│ └────────────────────────────┘ └──────────────────┘  │
│        ≤900px: lateral desce para baixo do corpo     │
├──────────────────────────────────────────────────────┤  --sec-y-sm
│ relacionados — mesma grade da coleção                │
└──────────────────────────────────────────────────────┘
```

Sem imagem disponível: superfície chapada `--pv-black-2`. Não inventar paisagem.

---

## 3. Ferramenta

Comboio, planejador, FIPE, mapa do parque, criador de eventos.
Abertura compacta: o controle aparece cedo.

```
┌──────────────────────────────────────────────────────┐
│ SpaIntro  (pv-intro--compact, sem foto)              │
│   eyebrow · H1 · lead curto                          │
├──────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────┐ │
│ │ painel escuro --pv-black-2                       │ │
│ │  [ controles ]  campos --pv-radius-sm, alvo 44px │ │
│ └──────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────┐ │
│ │ área de trabalho: mapa, resultado, tabela        │ │
│ └──────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────┤  --sec-y
│ SeoContent   seções h2 + parágrafos + FAQ            │
└──────────────────────────────────────────────────────┘
```

Regras: todo controle tem label; foco visível; alvo mínimo 44px de altura.
Cor de legenda de mapa vem de `PV.map*`, nunca do laranja de marca.

---

## 4. Artigo

Blog e guias. A leitura manda.

```
┌──────────────────────────────────────────────────────┐
│ ReadingProgress   fio de 2px no topo                 │
├──────────────────────────────────────────────────────┤
│ capa + eyebrow + H1 + autoria/data em --mono         │
├──────────────────────────────────────────────────────┤  --sec-y
│            ┌────────────────────────┐                │
│            │ coluna de leitura      │                │
│            │ .wrap--narrow (760)    │                │
│            │ h2/h3, parágrafos,     │                │
│            │ citação, checklist     │                │
│            └────────────────────────┘                │
├──────────────────────────────────────────────────────┤  --sec-y-sm
│ AffiliateGear (quando houver) · relacionados         │
└──────────────────────────────────────────────────────┘
```

Corpo em `--font`; título em `--display`; metadado em `--mono`.

---

## 5. Home

Ordem editorial fixa: inspirar → escolher → destacar → experimentar → ler → produtos.

```
┌──────────────────────────────────────────────────────┐
│ HomeDiscover      abertura fotográfica, uma frase    │  --sec-y-lg
├──────────────────────────────────────────────────────┤
│ HomeNextRide      destino · evento · desafio         │  --sec-y
├──────────────────────────────────────────────────────┤
│ HomeBanner        campanha, quando houver            │
├──────────────────────────────────────────────────────┤
│ home-agenda       eyebrow/H2/lead + EventsRail       │  --sec-y
├──────────────────────────────────────────────────────┤
│ CommunityRail     faixa fina de comunidade           │  --sec-y-xs
├──────────────────────────────────────────────────────┤
│ HomeExperiences   blocos --pv-forest, 50/50          │  --sec-y
├──────────────────────────────────────────────────────┤
│ ig-news           matéria de capa 50/50 + 3 do grid  │  --sec-y
├──────────────────────────────────────────────────────┤
│ AffiliateGear     carrossel no celular, grade acima  │  --sec-y
├──────────────────────────────────────────────────────┤
│ ig-band           fechamento                         │  --sec-y-lg
└──────────────────────────────────────────────────────┘
```

Cada seção usa um dos quatro degraus `--sec-y*`. Seção nova não cria `clamp` próprio.

---

## Cabeçalho de seção

Repetido em coleção, detalhe e home — a mesma peça:

```
eyebrow   .ig-eyebrow   --mono, caixa alta, --pv-orange
título    .ig-title     --display
lead      <p>           --font, --pv-muted-light sobre escuro
ações     à direita ≥768px, abaixo do lead ≤768px
```

## Estados

| Estado | Tratamento |
| --- | --- |
| Carregando | superfície chapada, sem spinner de marca |
| Vazio | frase curta + uma ação; nunca ilustração inventada |
| Erro | `--pv-danger` no texto, ação de repetir |
| Sucesso | `--pv-success` com tinta `--pv-success-ink` |

## Acessibilidade

Alvo de toque ≥44px · foco sempre visível · label em todo campo ·
`prefers-reduced-motion:reduce` desliga transição e animação ·
laranja nunca é o único portador de significado.
