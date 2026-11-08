export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 3) return 'Digite seu nome (mínimo 3 letras).';
  return null;
}

export function validateService(service: string): string | null {
  if (!service) return 'Escolha um serviço.';
  return null;
}

// Aceita DD/MM/AAAA, de hoje em diante.
export function validateDate(date: string, today: Date = new Date()): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date.trim());
  if (!match) return 'Use o formato DD/MM/AAAA.';

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const parsed = new Date(year, month - 1, day);

  const isReal =
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day;
  if (!isReal) return 'Essa data não existe.';

  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (parsed < start) return 'Escolha uma data de hoje em diante.';

  return null;
}
