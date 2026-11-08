# Fila Clara

App mobile (React Native + Expo + TypeScript) para o cidadão acompanhar o atendimento em unidades básicas de saúde (UBS), pensado principalmente para idosos e pessoas com deficiência.

## Ficha da CitizenTech

| Campo | Resposta |
|---|---|
| Nome da CitizenTech | Fila Clara |
| Cidade e bairro | São Paulo, região da Paulista (preencher o bairro da equipe) |
| Cidadão beneficiado | Idosos, pessoas com deficiência e gestantes que dependem do atendimento em UBS |
| Problema, em uma frase | Falta informação sobre espera e acessibilidade das UBS, e quem tem mobilidade reduzida perde tempo e esforço indo à unidade errada. |
| Como funciona | O cidadão se identifica, vê as unidades próximas com tempo de espera, consulta acessibilidade e agenda um atendimento. |
| O que cada parte faz | Identificação (nome e prioridade), Lista de unidades (busca, espera, distância), Detalhe (acessibilidade e agendamento). |
| Link do repositório | _(colar o link do GitHub)_ |
| Indicador de impacto | Tempo médio de espera evitado por atendimento agendado e nº de agendamentos feitos por pessoas com prioridade. |
| ODS conectados | 3 (Saúde e bem-estar), 10 (Redução das desigualdades), 11 (Cidades e comunidades sustentáveis) |

## Integrantes

Os nomes e RMs estão no array `authors` do `package.json`.

## Como rodar

```bash
npm install
npx expo start
```

Abra no celular com o app **Expo Go** (escaneie o QR code). Para checar os tipos: `npm run typecheck`.

## Telas

1. **Identificação**: nome e tipo de prioridade, lembrados ao reabrir o app.
2. **Unidades**: lista com carregando, erro e vazio, busca por nome e ordenação por distância.
3. **Detalhe**: endereço, horários, acessibilidade e formulário de agendamento validado.

O modo claro/escuro fica no cabeçalho e também é lembrado.

## Recurso nativo

Localização (`expo-location`): usada para ordenar as unidades por distância. Se a permissão for negada, o app avisa e continua funcionando sem a ordenação.

## Dados

Todos os dados das unidades são **simulados** (fictícios), em `src/services/units.ts`. Nenhum dado pessoal real é usado. Para demonstrar os estados de erro e vazio, altere `SIMULATE_ERROR` ou `SIMULATE_EMPTY` nesse arquivo.

## Estrutura

```
App.tsx            navegação e tema
src/types.ts       tipos
src/theme.ts       cores claro/escuro
src/validation.ts  validações puras
src/services/      storage, location, units, appointments
src/screens/       as 3 telas
src/components/    Button e ThemeToggle
```
