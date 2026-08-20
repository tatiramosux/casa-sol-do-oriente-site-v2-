# Instruções do projeto Casa SOL

## Design system obrigatório

Antes de criar, recriar ou alterar qualquer página, seção, layout ou componente visual deste projeto, leia integralmente [`docs/design-system.md`](docs/design-system.md) e use suas definições como fonte de verdade.

Isso inclui, obrigatoriamente:

- cores e tokens semânticos;
- tipografia e hierarquia;
- espaçamento, grid e responsividade;
- componentes e variantes shadcn/ui;
- padrões de página;
- uso de imagens e identidade da Casa SOL;
- acessibilidade, estados e movimento.

Não copie estilos ou arquitetura de `_old/`. Essa pasta serve como referência histórica de conteúdo, imagens e identidade. Na implementação atual, priorize o design system, shadcn/ui e a arquitetura existente do projeto.

Se uma solicitação entrar em conflito com o design system, siga a solicitação explícita do usuário e registre no resultado qual exceção foi aplicada.

Ao introduzir uma nova decisão visual reutilizável que ainda não esteja documentada, atualize `docs/design-system.md` no mesmo trabalho para manter o sistema consistente.

## Dúvidas e decisões sem referência

Se não houver informação suficiente para responder corretamente — especialmente conteúdo institucional, significado ritualístico, datas, regras de atendimento, links oficiais, imagens ou decisões de identidade — não invente nem complete por suposição. Consulte primeiro o código e o conteúdo oficial disponível no projeto. Se a resposta continuar incerta, pergunte ao usuário antes de implementar.

Use `docs/design-system.md` para resolver decisões visuais já consolidadas. Quando o documento não cobrir uma decisão reutilizável, confirme a direção com o usuário e, após a aprovação, registre o novo padrão no próprio design system.

## Padrões consolidados desta versão

- Conteúdo abaixo da hero segue grid de 12 colunas no desktop, com títulos, parágrafos e cards editoriais alinhados às 8 colunas centrais.
- Grupos de cards editoriais usam no máximo 3 colunas no desktop, 2 no tablet e 1 no mobile, normalmente com gap de 16 px.
- Todas as heroes compartilham a mesma escala tipográfica: 76–108 px no desktop e `clamp(44px, 12vw, 56px)` no mobile. Não reduzir títulos individualmente conforme o texto; permitir quebra equilibrada. Títulos de seção usam `clamp(30px, 9vw, 38px)` no mobile.
- No mobile, nenhum texto visível deve ter menos de 12 px. Use 12 px apenas para metadados secundários, 13 px para informações compactas e 14 px ou mais para controles e ações; corpo de texto permanece com no mínimo 16 px.
- Não usar os ícones Lucide `Handshake` ou `HeartHandshake`. Escolher símbolos inequívocos e adequados ao contexto; em caso de dúvida semântica, perguntar.
- O footer deve manter o crédito externo “Desenvolvido por @tatiramos”, apontando para `http://www.tatiramos.com.br` em nova aba.
