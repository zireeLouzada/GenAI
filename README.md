# Meu Apê — controle financeiro

MVP responsivo para acompanhar a aquisição de um apartamento. O frontend usa React, TypeScript, componentes no padrão shadcn/ui, Recharts e Supabase.

## Configuração

1. Crie um projeto no [Supabase](https://supabase.com/).
2. No SQL Editor, execute `supabase/migrations/202608240001_initial_schema.sql` (ou use `supabase db push` com a CLI vinculada).
3. Copie `.env.example` para `.env.local` e preencha a URL do projeto e a chave pública `anon`:
   ```bash
   cp .env.example .env.local
   ```
4. Instale e inicie:
   ```bash
   npm install
   npm run dev
   ```

Sem as variáveis, a aplicação entra deliberadamente em **modo demonstração**, persistindo os dados em `localStorage`. Isso permite avaliar toda a interface, mas os dados ficam somente no navegador. Depois de configurar o Supabase, reinicie o servidor Vite.

## Scripts

- `npm run dev`: desenvolvimento;
- `npm run build`: verificação TypeScript e build de produção;
- `npm run lint`: análise estática;
- `npm test`: testes unitários.

## Segurança do MVP

Conforme o escopo, não há autenticação. A migration habilita RLS com acesso público para o papel `anon`. Use este projeto somente como aplicação pessoal, não divulgue sua URL e adicione autenticação/políticas restritivas antes de qualquer exposição pública. Nunca use a `service_role` no frontend.
