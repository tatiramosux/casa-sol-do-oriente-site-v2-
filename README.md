# Casa Sol do Oriente — Calendário

Calendário mensal responsivo integrado à Google Calendar API. Eventos são lidos no servidor com uma conta de serviço; a credencial nunca é enviada ao navegador.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. Sem credenciais, a interface usa dados de demonstração e mostra esse estado na barra do calendário.

## Conectar o calendário privado

1. Ative a Google Calendar API em um projeto do Google Cloud.
2. Crie uma conta de serviço e gere uma chave JSON.
3. Compartilhe o calendário com o e-mail da conta de serviço usando a permissão **Ver todos os detalhes dos eventos**.
4. Copie `.env.example` para `.env.local` e preencha as credenciais. Nunca versione `.env.local` ou o JSON.
5. Reinicie `npm run dev`. O indicador mudará para **Sincronizado com Google Agenda**.

Também é possível converter o JSON completo para Base64 e preencher apenas `GOOGLE_CALENDAR_ID` e `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`.

## Categorias automáticas

O site aceita prefixos nos títulos — `[GIRA]`, `[CURSO]`, `[PALESTRA]`, `[APOMETRIA]` e `[SOCIAL]` — e também reconhece palavras-chave. O prefixo é removido antes da exibição.

Na descrição do evento, estas linhas controlam o modal:

```text
Acesso: Fechado / com inscrição
Orientação: Chegue com 30 minutos de antecedência
Vestuário: Use roupas claras e confortáveis
```

Se nenhuma indicação de acesso for encontrada, o evento é considerado aberto ao público.

## Validação

```bash
npm test
npm run build
```
