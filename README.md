# Meu Apê — controle financeiro

MVP responsivo para acompanhar os custos de aquisição de um apartamento. O frontend usa React, TypeScript, componentes no padrão shadcn/ui e Recharts.

O Google Sheets é a fonte oficial dos dados, disponibilizados em modo somente leitura por uma API do Google Apps Script. O dashboard consulta essa API ao abrir a aplicação e sempre que o usuário seleciona **Atualizar dados**.

## Executar localmente

Não é necessário configurar variáveis de ambiente ou banco de dados.

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: inicia o ambiente de desenvolvimento;
- `npm run build`: executa a verificação TypeScript e gera o build de produção;
- `npm run lint`: executa a análise estática;
- `npm test`: executa os testes unitários.

## Escopo do MVP

A aplicação apenas consulta e apresenta os dados. Escrita no Google Sheets e operações `POST` não fazem parte desta versão.
