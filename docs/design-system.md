# Casa SOL — Base do Design System

> Documento-base para a recriação das páginas da Casa Universalista Sol do Oriente com Tailwind CSS e shadcn/ui.
> Fonte visual analisada: `_old/` (HTML, `css/style.css`, logotipos, banners, imagens de projetos e ícones).

## 1. Direção do produto

O novo site deve comunicar **acolhimento, espiritualidade, serviço comunitário, clareza e confiança**. A experiência deve parecer contemporânea e serena, sem apagar a memória visual da Casa SOL.

Princípios:

1. **A luz vem da marca:** amarelo solar, laranja e azul do símbolo são as cores identitárias.
2. **O conteúdo vem primeiro:** páginas institucionais e documentos longos precisam de leitura confortável.
3. **Fotografia é presença:** imagens reais da Casa, rituais e projetos têm prioridade sobre ilustrações genéricas.
4. **Espiritual sem ser esotérico genérico:** evitar excesso de brilhos, roxos, gradientes artificiais e ornamentos místicos sem origem na marca.
5. **Acolhedor, não infantil:** formas suaves e cores quentes, equilibradas por azul profundo, boa hierarquia e bastante espaço.
6. **Acessível por padrão:** contraste, foco visível, linguagem direta, alvos de toque e navegação por teclado.

Controle de qualidade das imagens:

- Heroes e imagens de carrossel em tela cheia devem usar fonte com pelo menos 1500 px de largura; priorizar 2000–2400 px quando houver original disponível.
- Não ampliar imagens pequenas para preencher heroes. Se o original em alta não existir, substituir por fotografia aprovada ou realizar restauração conservadora antes do uso.
- Cards e avatares podem usar arquivos menores quando a dimensão intrínseca continuar igual ou superior ao dobro da dimensão CSS exibida em telas de alta densidade.
- Favicons e ícones de instalação usam o símbolo oficial em recorte circular, com margem externa transparente para evitar aparência quadrada ou corte nas abas e atalhos do navegador.

## 2. O que preservar e o que evoluir

### Preservar da versão antiga

- O logotipo original e sua combinação de **sol amarelo**, **chama/pele laranja**, **casa azul** e **coração branco**.
- Banners com fotografia documental e títulos brancos sobre uma camada escura.
- A estrutura editorial: início, história, estatuto, regimento, ritualística, projetos, inscrições e calendário.
- Títulos diretos, blocos de perguntas e respostas, cartões de projetos e chamadas para participação.
- O tom de serviço: “expansão da consciência, altruísmo e não violência”.

### Evoluir

- Substituir Bootstrap, jQuery e componentes do template por shadcn/ui.
- Trocar o roxo `#635CDB`, dominante no CSS antigo, pelas cores da marca. Esse roxo pertence ao template original e **não deve ser tratado como cor institucional**.
- Reduzir textos inteiros em caixa alta; reservar uppercase para labels curtos.
- Trocar botões quadrados e muito largos por botões de altura consistente e cantos suaves.
- Melhorar ritmo vertical, largura de leitura e hierarquia de documentos extensos.
- Usar menu mobile em `Sheet`, FAQ em `Accordion` e menus desktop com `NavigationMenu`.

## 3. Identidade cromática

Os valores abaixo são a base operacional extraída visualmente dos arquivos antigos. Antes da publicação final, podem ser refinados com o arquivo vetorial oficial da marca, se disponível.

### Paleta de marca

| Token | Hex | Uso |
|---|---:|---|
| `brand-sun` | `#FFB100` | acento principal, raios, destaques e indicadores |
| `brand-gold` | `#E99A00` | hover/pressed do amarelo e texto dourado sobre fundo claro |
| `brand-orange` | `#FF8902` | chama, detalhes calorosos e destaques secundários |
| `brand-blue` | `#2E6F97` | casa do símbolo, links e superfícies institucionais |
| `brand-blue-deep` | `#174B68` | CTA principal, rodapé e contraste forte |
| `brand-sky` | `#53A0FD` | acento informativo pontual; não usar em grandes áreas |
| `brand-cream` | `#FFF8E8` | fundos quentes e seções de acolhimento |
| `brand-white` | `#FFFFFF` | coração, cards e superfícies elevadas |

### Neutros semânticos

| Token | Hex | Uso |
|---|---:|---|
| `ink` | `#1D292F` | texto principal |
| `muted-ink` | `#66757A` | texto secundário |
| `canvas` | `#FCFCF9` | fundo geral |
| `surface` | `#FFFFFF` | cards, menus e diálogos |
| `surface-warm` | `#FFF8E8` | seção alternada |
| `border` | `#E4E7E4` | divisores e bordas |
| `focus` | `#2E6F97` | anel de foco |
| `destructive` | `#B42318` | erros e ações destrutivas |

### Regras de uso

- Azul profundo é a cor primária de interface; amarelo solar é o acento de marca.
- Amarelo não deve receber texto branco. Usar `#3A2600` ou `ink` sobre amarelo.
- Em fundos fotográficos, aplicar overlay `rgba(8, 24, 30, 0.58–0.72)` conforme a luminosidade.
- Não usar mais de duas cores de marca fortes no mesmo componente.
- Laranja é destaque secundário; nunca competir com o CTA principal.
- Categorias do calendário podem ter cores próprias, mas devem manter contraste AA e não depender apenas de cor: incluir rótulo ou ícone.

## 4. Tokens shadcn/ui

Aplicar estes tokens em `:root`. A nomenclatura acompanha shadcn/ui; valores em hex são válidos e preservam a correspondência direta com a marca.

```css
:root {
  --radius: 0.75rem;

  --background: #fcfcf9;
  --foreground: #1d292f;
  --card: #ffffff;
  --card-foreground: #1d292f;
  --popover: #ffffff;
  --popover-foreground: #1d292f;

  --primary: #174b68;
  --primary-foreground: #ffffff;
  --secondary: #fff1c7;
  --secondary-foreground: #3a2600;
  --accent: #ffb100;
  --accent-foreground: #3a2600;

  --muted: #f2f4f1;
  --muted-foreground: #66757a;
  --border: #e4e7e4;
  --input: #d9dedb;
  --ring: #2e6f97;
  --destructive: #b42318;
  --destructive-foreground: #ffffff;

  --brand-sun: #ffb100;
  --brand-gold: #e99a00;
  --brand-orange: #ff8902;
  --brand-blue: #2e6f97;
  --brand-blue-deep: #174b68;
  --brand-sky: #53a0fd;
  --brand-cream: #fff8e8;
}
```

Tema escuro não é prioridade para a primeira versão. Se for criado, deve ser desenhado e testado separadamente; não usar inversão automática.

## 5. Tipografia

### Família

- **Interface e corpo:** `DM Sans`, via `--font-sans`, fallback `system-ui, sans-serif`.
- **Títulos editoriais visíveis:** `Georgia`, fallback `"Times New Roman", serif`.
- **Watermarks tipográficos das heroes:** `Cormorant Garamond` itálico, via `--font-display`, fallback `Georgia, serif`.
- Não introduzir uma terceira família. Se futuramente os títulos editoriais migrarem para Cormorant Garamond, a alteração deve ser global e validada em todas as páginas, não feita isoladamente.

### Escala

| Estilo | Desktop | Mobile | Peso / entrelinha |
|---|---:|---:|---|
| `hero h1` | 76–108 px | 44–56 px | 600 / 0.88–0.92 |
| `hero watermark` | 88–200 px | 38–76 px | 600 itálico / 0.80 |
| `section h2` | 40–52 px | 30–38 px | 600 / 1.05 |
| `content h3` | 28 px | 26–28 px | 600 / 1.15 |
| `card title` | 22 px | 22 px | 600 / 1.08–1.15 |
| `h4` | 22 px | 20 px | 600 / 1.25 |
| `hero description` | 18 px | 16 px | 400 / 1.65 |
| `section intro` | 17 px | 16–17 px | 400 / 1.70 |
| `body` | 16 px | 16 px | 400 / 1.70–1.78 |
| `small` | 14 px | 14 px | 400 / 1.50 |
| `label` | 12 px | 12 px | 700 / 1.25; tracking 0.08em |

Regras:

- Corpo de texto nunca abaixo de 16 px em páginas de conteúdo.
- No mobile, nenhum texto visível pode ficar abaixo de 12 px. Metadados secundários usam 12 px; datas, categorias e informações compactas usam preferencialmente 13 px; controles e ações usam no mínimo 14 px; textos corridos permanecem em 16 px ou mais.
- Parágrafos longos: largura máxima de `68ch`.
- Labels podem usar uppercase; headings e botões devem usar capitalização natural em português.
- Sublinhado deve permanecer visível em links dentro de textos longos.
- Títulos principais de hero usam a escala `display`, com presença editorial ampla e entrelinha compacta.
- No mobile, todas as heroes usam exatamente o mesmo token fluido `clamp(44px, 12vw, 56px)`, independentemente do comprimento do título. Títulos longos quebram em linhas com `text-wrap: balance`; não criar reduções específicas por página.
- Watermarks das heroes usam `right: 0` e `bottom: 0`, sem `overflow` interno. Como a fonte é itálica e ultrapassa sua caixa tipográfica, aplicar compensação interna de `.08em` à direita e `.06em` abaixo; assim o container permanece ancorado às bordas e nenhuma letra é cortada.
- Títulos `h2` de seção, chamadas e blocos editoriais usam no mobile o token único `clamp(30px, 9vw, 38px)`.
- Eyebrows e labels que antecedem títulos são exclusivamente tipográficos: não adicionar ícones decorativos antes do texto.
- Em fundos claros, labels editoriais usam dourado escuro acessível (`#9A6100`); em fundos fotográficos escuros, usam amarelo solar ou branco conforme a hierarquia.

## 6. Layout, grid e espaçamento

- Container máximo: `1200px`.
- Container de leitura: `760px` ou `68ch`.
- Margem lateral: `24px` mobile, `32px` tablet, `48px` desktop.
- Grid desktop: 12 colunas; tablet: 8; mobile: 4.
- Nas seções internas abaixo da hero, conteúdo editorial, cabeçalhos, accordions, avisos e cards diretamente relacionados ao texto ocupam as 8 colunas centrais do grid de 12. No mobile, todos ocupam as 4 colunas disponíveis.
- Grids editoriais usam no máximo 3 cards por linha no desktop, 2 no tablet e 1 no mobile. Uma última linha incompleta permanece alinhada à esquerda; não esticar cards para preencher o espaço.
- Gap padrão: `24px`; cards compactos e listas densas usam `16px`.
- Espaço entre seções: `64px` mobile, `96px` desktop.

Escala de espaçamento permitida:

`4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px`.

Evitar valores arbitrários quando um token atender ao layout.

### Breakpoints

- Mobile: `< 640px`
- Tablet: `640–1023px`
- Desktop: `≥ 1024px`
- Wide: `≥ 1280px`

O conteúdo deve funcionar em `320px` sem rolagem horizontal.

## 7. Forma, borda, sombra e ícones

### Raios

- `sm`: 8 px — badges, inputs compactos.
- `md`: 12 px — botões, cards e accordions.
- `lg`: 16 px — painéis, modais e imagens editoriais.
- `full`: pills, avatares e botões de ícone circulares.

### Sombras

```css
--shadow-sm: 0 1px 2px rgb(23 75 104 / 0.06);
--shadow-md: 0 8px 28px rgb(23 75 104 / 0.10);
--shadow-lg: 0 20px 50px rgb(8 24 30 / 0.18);
```

Usar sombra apenas para comunicar elevação. Cards de conteúdo comuns preferem borda suave.

### Ícones

- Biblioteca: Lucide React.
- Tamanhos: 16 px inline, 20 px controles, 24 px destaques.
- Traço padrão: 1.75–2 px.
- Ícone nunca substitui sozinho um rótulo importante.
- Preservar imagens autorais dos ícones terapêuticos antigos quando tiverem qualidade suficiente; não redesenhá-los como Lucide se isso apagar seu significado.
- Ícones de cards de Musicalidade usam círculo amarelo solar de 44 px com símbolo branco, sem caixa quadrada.
- Cards do índice de Projetos repetem o mesmo padrão: círculo amarelo solar de 44 px com ícone Lucide branco de 24 px. Reutilizar os símbolos já adotados no calendário para manter unidade semântica e visual.
- No índice de Projetos, “Pão solidário da Vó Margarida” usa trigo, “Firmando os trabalhos” usa pasta de trabalho, “A vida continua” usa margarida e “Apometria” usa cadeira. Hospital Terapêutico mantém o símbolo de atividade terapêutica.
- Terapias usam imagens ou ícones dentro de círculos; não usar contêiner quadrado amarelo.
- Não usar `Handshake` nem `HeartHandshake`: esses símbolos foram rejeitados por ambiguidade visual. Para colaboração, preferir `UsersRound`; para acolhimento ao luto, `Flower2`; para altruísmo, `Heart`; para não violência, `Hand`.
- Quando não houver um ícone semanticamente correto, perguntar antes de escolher. Um ícone customizado simples pode ser usado quando preservar o significado, como o atabaque sem baquetas em Musicalidade.

## 8. Componentes base

### Header

- Altura: 88 px desktop, 72 px mobile.
- Fundo azul profundo `#0D3348`, fixo no topo, com blur e sombra suave; não usar divisor branco entre header e hero.
- Logotipo completo com altura visual de 44–48 px.
- Desktop: `NavigationMenu`; mobile: botão de menu + `Sheet`.
- No mobile, o botão hambúrguer fica à esquerda do logotipo completo.
- Item ativo: texto branco e linha inferior `brand-sun` de 2 px.

### Skeleton de transição

- O skeleton deve espelhar a arquitetura da página de destino, e não usar uma contagem genérica: navbar com todos os itens atuais, hero com label, título e descrição, seguida pela quantidade e pelas colunas reais do primeiro grupo de cards ou blocos.
- No mobile, a estrutura muda para menu, logotipo e dois botões de ícone; cards e blocos passam para uma coluna, mantendo a mesma quantidade da página de destino.

### WhatsApp flutuante

- Exibir somente o botão circular verde com o símbolo do WhatsApp, sem rótulo textual visível.
- Manter `aria-label` descritivo para tecnologias assistivas.
- Usar sombra suave e posição fixa no canto inferior direito, sem painel, legenda ou ornamentos adicionais.

### Buttons

- Altura: 44 px padrão, 48 px CTA principal.
- `default`: azul profundo, texto branco.
- `secondary`: creme/dourado claro, texto escuro.
- `outline`: fundo transparente, borda azul.
- `ghost`: navegação e ações de baixa ênfase.
- `destructive`: apenas ações irreversíveis.
- Estados obrigatórios: hover, active, disabled, loading e focus-visible.
- Chamadas curtas antes do footer usam faixa azul profunda, título editorial, texto complementar e botão amarelo; não estilizar esse conteúdo como alerta quando a ação for o objetivo principal.

### Cards

- `Card` com fundo branco, borda `border`, raio 16 px e padding 24 px.
- Imagem em proporção `4:3` para projetos e `16:9` para destaques.
- Card clicável inteiro deve ter um único alvo sem links aninhados.
- Hover discreto: borda azul com baixa opacidade e `translateY(-2px)`; respeitar `prefers-reduced-motion`.
- Cards de perfis institucionais usam apenas a elevação discreta do card. As fotografias circulares permanecem estáticas, sem zoom ou transformação.
- Cards de perfis com informações complementares são empilhados e horizontalizados no desktop: fotografia à esquerda, nome e trajetória à direita. Um divisor interno curto, com 12 px de respiro lateral, introduz a lista complementar em duas colunas com bullets dourados explícitos. No mobile, o card volta ao fluxo vertical e a lista usa uma coluna. Texto principal e lista permanecem com no mínimo 16 px; somente o label pode usar 14 px.
- Card editorial compacto: padding 20 px, raio 16 px, borda suave, título serifado de 22 px, texto de 14 px/1.65 e gap de 16 px.
- Grupos de 3 cards devem começar na mesma coluna do parágrafo que os apresenta e ocupar as mesmas 8 colunas centrais.
- Musicalidade: playlists e videoaulas usam até 3 cards por linha; ícone circular, tipo de mídia em label, título, descrição e ação textual no rodapé do card.
- Cada seção distinta de mídia externa usa uma nota de créditos antes do respectivo grid, evitando repetir avisos em cada card. A nota deve informar que o material é referência, que autoria e créditos pertencem aos canais de origem e que a Casa apenas organiza os links de acesso.

### Formulários

- Usar `Label`, `Input`, `Textarea`, `Select`, `Checkbox` e `Form` do ecossistema shadcn.
- Controle mínimo de 44 px de altura.
- Label sempre visível; placeholder não substitui label.
- Erro abaixo do campo, com texto e ícone, não apenas cor.

### Conteúdo expansível e navegação

- Itens principais que agrupam subpáginas, como Projetos e Ingresso, usam o mesmo menu expansível no desktop e no mobile.
- Documentos institucionais obrigatórios são apresentados em cards na página de entrada e possuem páginas próprias com resumo, download e visualização incorporada do PDF oficial.

- FAQ: `Accordion` centralizado no container de leitura, um item aberto por vez em mobile. Não usar caixas ao redor dos itens: apenas divisor inferior. Toda pergunta deve exibir chevron à direita, apontando para baixo quando fechada e rotacionando suavemente para cima quando aberta.
- Submenus: `NavigationMenu` no desktop e accordions dentro do `Sheet` no mobile.
- No submenu mobile de Projetos, o rótulo principal e o chevron permanecem visíveis nos estados fechado, aberto, ativo, hover e focus; usar texto azul profundo sobre branco/creme e nunca herdar o branco da navegação desktop.
- Documentos extensos: sumário lateral sticky no desktop; `Select` ou `Sheet` no mobile.
- Modais: `Dialog`; confirmações críticas: `AlertDialog`.
- Avisos: `Alert`; mensagens transitórias: `Sonner`/toast.

### Badges

- Informativos e categorias: fundo tonal claro + texto escuro.
- Pill apenas para metadados curtos: “Aberto ao público”, data, categoria.
- Não usar badge para parágrafos ou ações.

## 9. Padrões de página

### Página inicial

1. Header azul profundo e fixo, com logotipo horizontal completo.
2. Hero fotográfica de ponta a ponta; texto e ações do projeto ficam sobre a imagem, enquanto a navegação numerada do carrossel ocupa a faixa inferior.
3. Bloco breve “Sobre a Casa”.
4. Projetos e iniciativas em grid de cards.
5. Próximos eventos/calendário.
6. Chamada para participação, inscrição ou voluntariado.
7. Localização, contato e footer.

- Nos slides de projetos com agenda recorrente, como Hospital Terapêutico e Grupo de Apoio ao Luto, a hero mostra um status não clicável “Próxima data” alimentado automaticamente pelo Google Agenda. Se existir qualquer ocorrência futura cadastrada dentro do horizonte consultado, exibir sua data mesmo quando estiver em outro mês; se não houver ocorrência futura após a agenda carregar, exibir “Aguardando nova data”. Durante carregamento ou falha de sincronização, não inferir indisponibilidade. O antigo botão para o calendário não é exibido; “Conheça o projeto” permanece como ação principal do slide.

#### Depoimentos do Google

- Posicionar a seção entre a última chamada da home e o footer.
- Usar até 3 cards por linha no desktop e 1 por linha no mobile, com depoimentos públicos curtos, autoria e atribuição explícita ao Google.
- Exibir cinco estrelas em amarelo solar, citação serifada e ação externa “Ver avaliações no Google”.
- Os textos são uma curadoria estática: não inventar, reescrever ou publicar depoimentos sem origem verificável no perfil oficial da Casa.

### Página institucional / História

- Heroes fixas de História, Ritualística, Hospital Terapêutico e Calendário usam a mesma composição editorial da home, sem controles de carrossel: fotografia de ponta a ponta, overlay escuro, conteúdo alinhado ao container de 1320 px e altura de aproximadamente 700 px no desktop e 620 px no mobile.
- Breadcrumb, título e introdução.
- Hierarquia da hero: eyebrow em 12 px uppercase, título serifado entre 76–108 px no desktop e 44–56 px no mobile, seguido por introdução de 18 px no desktop e 16 px no mobile.
- Todas as páginas internas usam o mesmo container de 1200 px e iniciam títulos, introduções e conteúdo editorial na mesma coluna esquerda.
- Cabeçalhos e blocos de leitura têm largura máxima de 760 px; grids de cards podem ocupar as colunas restantes sem alterar o alinhamento inicial do texto.
- Grids de cards editoriais usam no máximo 3 colunas no desktop, 2 no tablet e 1 no mobile, alinhados às mesmas 8 colunas do texto, com `gap` de 16 px.
- Corpo editorial alinhado à coluna inicial do container, com fotos e citações intercaladas.
- CTA contextual ao final; evitar becos sem saída.

### Estatuto e Regimento

- Cabeçalho compacto, metadados e botão para baixar PDF.
- Sumário navegável por títulos.
- Conteúdo em `68ch`, com `h2/h3` numerados e âncoras copiáveis.
- Barra de progresso de leitura é opcional; busca no documento é preferível se houver demanda real.

### Ritualística / Gira / Amalá

- Introdução acolhedora e objetiva.
- Passo a passo ou orientações em blocos numerados.
- FAQ em `Accordion`.
- Aviso explícito sobre horário, inscrição e o que levar.
- Amalá é uma subpágina de Ritualística. A seção que introduz os itens por Orixá usa o título “Compondo o Amalá” e uma descrição breve antes do accordion.

### Musicalidade

- Hero interna padrão com título estático “Musicalidade”.
- Playlists em grid central de até 3 cards por linha.
- “Materiais de apoio” apresenta a Apostila do Terreiro em um único card abaixo do texto introdutório.
- “Toques básicos usados na Casa” é uma seção independente, com uma videoaula por card e links diretos para o YouTube.
- Usar ícone de atabaque sem baquetas, nunca tambor de bateria com baquetas.

### Hospital Terapêutico

- Hero e introdução do projeto.
- “Como funciona” em 3–4 passos.
- Terapias em grid com ícones autorais existentes.
- Informações reconhecidas/oficiais em `Alert` neutro.
- CTAs separados para atendimento e voluntariado.

### Calendário

- Desktop: calendário ou lista com filtros claros.
- Mobile: lista/agenda por data; não comprimir grade de sete colunas.
- Na agenda mobile, títulos de evento usam 14 px, horários e informações usam 13 px e badges/status usam no mínimo 12 px. Filtros usam 13 px e alvos de toque de pelo menos 40 px, preferencialmente 44 px.
- Informações funcionais do calendário — mês, números das datas e dias da semana — usam DM Sans em peso 700. A fonte display serifada fica reservada à hero e aos títulos editoriais.
- O marcador “Hoje” da agenda mobile usa uma faixa em azul profundo da navbar (`#0D3348`), texto branco e divisor branco translúcido, destacando a data atual sem competir com as cores das categorias.
- Evento abre `Dialog`/`Drawer` com data, horário, local, acesso e orientações.
- O calendário separa cursos em três filtros semânticos: laranja “Cursos gratuitos”, marrom “Cursos pagos” e verde “Desenvolvimento mediúnico interno”.
- O filtro “Datas comemorativas” inclui todas as ocorrências retornadas pelo calendário oficial “Feriados no Brasil” do Google, sem limitar a lista a datas específicas.
- “Curso de Umbanda I” (aceitando também o numeral `1`) e “Café com Macumba” pertencem a “Desenvolvimento mediúnico interno”: usam verde acessível `#17613C` no filtro, no card e no detalhe e exibem “Evento interno” no acesso.
- “Curso Sementes Espirituais com Prof. Wagner Borges” é uma parceria paga: usa marrom acessível `#6B3F24`, pertence ao filtro marrom “Cursos pagos”, exibe “Curso pago” e informa no detalhe que inscrições e informações complementares são administradas exclusivamente pela Editora KOI. A ação externa aponta diretamente para `https://wagnerborges.koieditora.com.br/`.
- A palestra gratuita “Estudos Anímicos e Mediúnicos com Prof. Wagner Borges” permanece laranja, no filtro “Cursos gratuitos”, e aberta ao público. Seu detalhe esclarece sucintamente que a Editora KOI administra o evento, a Casa SOL apenas cede o espaço e não realiza reservas nem fornece informações adicionais; sua ação também aponta para a página da KOI.
- Estado vazio, carregando, erro e calendário não configurado devem ser desenhados.

## 10. Fotografia e mídia

- Reutilizar imagens de `_old/images/banner/` e `_old/images/projetos/` após seleção de qualidade e otimização para WebP/AVIF.
- Não esticar imagens nem alterar proporção.
- `object-fit: cover`; definir `object-position` individualmente para preservar o assunto.
- Hero: imagem responsiva com largura mínima de 1600 px quando disponível.
- Cards: gerar variantes otimizadas, não carregar o banner original inteiro.
- Toda imagem informativa precisa de `alt` descritivo; imagens decorativas usam `alt=""`.
- Não incorporar texto importante dentro de imagens.

## 11. Movimento

- Duração rápida: 120–160 ms; padrão: 180–240 ms; entrada de modal: até 280 ms.
- Easing padrão: `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Animações devem explicar estado, não decorar continuamente.
- Respeitar `prefers-reduced-motion: reduce`.
- Evitar parallax em banners e animações constantes no símbolo do sol.
- Navegações internas exibem skeleton global de header, hero e conteúdo até a próxima página estar disponível; respeitar `prefers-reduced-motion` e anunciar o carregamento com `role="status"`.

## 12. Acessibilidade e conteúdo

- Meta: WCAG 2.2 AA.
- Contraste mínimo: 4.5:1 para texto comum; 3:1 para texto grande e controles.
- Foco visível de 2 px com offset de 2 px.
- Alvos de toque mínimos de 44 × 44 px.
- Um único `h1` por página e hierarquia sem saltos arbitrários.
- `lang="pt-BR"`, datas e horários no padrão brasileiro.
- Menus, dialogs e accordions devem manter o comportamento acessível fornecido por Radix/shadcn.
- Informar claramente se uma atividade é aberta, exige inscrição ou funciona apenas por indicação.
- Não esconder informações essenciais somente em tooltip ou hover.

## 13. Convenções de implementação

- Usar componentes shadcn como base, criando variantes próprias via `class-variance-authority` quando necessário.
- Componentes da Casa SOL devem receber nomes semânticos: `SiteHeader`, `PageHero`, `ProjectCard`, `EventCard`, `DocumentToc`, `SiteFooter`.
- Usar tokens CSS; não repetir hexadecimais dentro dos componentes.
- Preferir classes Tailwind baseadas nos tokens (`bg-primary`, `text-muted-foreground`) a cores utilitárias soltas.
- Manter conteúdo separado da apresentação quando for reutilizado em várias páginas.
- Não copiar as classes ou a estrutura Bootstrap da pasta `_old`; ela é referência de conteúdo e identidade, não arquitetura nova.

## 14. Checklist de aceite visual

- [ ] O logotipo oficial permanece legível e não foi redesenhado.
- [ ] Azul, amarelo solar e laranja da marca aparecem de forma coerente.
- [ ] O roxo `#635CDB` do template antigo foi removido da interface institucional.
- [ ] Todos os componentes usam tokens shadcn e variantes documentadas.
- [ ] Mobile funciona a partir de 320 px sem rolagem horizontal.
- [ ] Textos longos respeitam largura máxima de leitura.
- [ ] Hero com foto mantém contraste suficiente para o título.
- [ ] Navegação por teclado, foco e reduced motion foram testados.
- [ ] Estados de loading, vazio, erro e sucesso estão previstos.
- [ ] Imagens antigas foram otimizadas e receberam texto alternativo adequado.
- [ ] Calendário mobile usa agenda/lista em vez de grade comprimida.
- [ ] Contrastes principais atendem WCAG AA.

## 15. Regra de decisão

Quando houver dúvida entre imitar literalmente o site antigo e melhorar a experiência, preservar nesta ordem:

1. identidade e significado da Casa SOL;
2. conteúdo e intenção da página;
3. acessibilidade e legibilidade;
4. padrões do shadcn/ui;
5. aparência específica do template antigo.

O resultado deve ser reconhecível como **Casa SOL**, não como uma modernização genérica do antigo tema Bootstrap.

### Quando a resposta não estiver disponível

- Não inventar conteúdo institucional, ritualístico, datas, regras, links, imagens ou significados de símbolos.
- Verificar primeiro o conteúdo oficial existente no projeto e na pasta `_old` quando ela for a fonte indicada.
- Se ainda não houver uma resposta correta ou referência segura, perguntar ao usuário antes de implementar.
- Para decisões visuais, consultar este documento antes de criar uma nova variação. Se o padrão ainda não existir, confirmar a proposta com o usuário e documentá-la após aprovação.

## 16. Anatomia consolidada das seções

1. `InternalHero`: imagem de ponta a ponta, overlay escuro, eyebrow, `h1`, descrição e watermark tipográfico quando previsto.
2. `SectionHeader`: label dourada de 12 px uppercase, título editorial de 40–52 px e introdução de 17 px/1.7 nas 8 colunas centrais.
3. `Content`: corpo de 16 px/1.78, subtítulos editoriais e largura central de leitura.
4. `FeatureGridCompact`: 3/2/1 colunas, gap 16 px, cards com padding 20 px e títulos de 22 px.
5. `FAQ/Accordion`: largura de leitura, somente divisor inferior e chevron animado.
6. `WarmSection`: fundo creme de ponta a ponta para alternância de ritmo, sem linha divisória ornamental.
7. `CTA`: faixa azul profunda, título editorial branco, descrição e botão amarelo.
8. `SiteFooter`: logo/endereço, Casa SOL, Participe e Conecte-se alinhados pelo topo; linha inferior com copyright, crédito de desenvolvimento e localização.
