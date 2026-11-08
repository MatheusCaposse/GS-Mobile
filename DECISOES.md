# Decisões

## Tema e problema
Escolhemos saúde com foco em atendimento e acessibilidade. O problema é a falta de informação sobre espera e acessibilidade nas UBS, que pesa mais para idosos e pessoas com deficiência.

## Telas e navegação
Apenas 3 telas, com `@react-navigation/native-stack`. A rota inicial depende de haver usuário salvo, então quem já se identificou abre direto na lista.

## Identificação lembrada
Nome e prioridade ficam no `AsyncStorage`. É simples e suficiente para um protótipo, sem backend.

## Modo claro e escuro
Um `ThemeContext` guarda o modo e as cores em `theme.ts`. O padrão segue o sistema e a escolha do usuário é salva. Optamos por um botão de texto no cabeçalho, sem biblioteca extra.

## Dados simulados
As unidades são fictícias e ficam em `services/units.ts`, com atraso artificial para mostrar o carregando. Evita dados pessoais reais e dispensa API.

## Recurso nativo
Localização, para ordenar as unidades por distância (Haversine). A permissão negada é tratada: aparece um aviso e a lista continua sem ordenação.

## Validação
Funções puras em `validation.ts` (nome, serviço e data DD/MM/AAAA de hoje em diante), separadas das telas para ficarem fáceis de testar.

## Visual
Minimalista: poucas cores, texto grande (16px ou mais), botões com altura mínima de 48 e `accessibilityRole`/`accessibilityLabel` nos controles, por causa do público-alvo.

## TypeScript
Modo estrito, sem `any`, e `tsc --noEmit` limpo.
