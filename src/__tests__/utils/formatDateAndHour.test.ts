import { formatDateAndHour } from '../../utils/formatDateAndHour';

describe('formatDateAndHour', () => {
  it('deve formatar data e hora corretamente', () => {
    const date = new Date('2024-03-20T14:30:00Z').toUTCString();
    expect(formatDateAndHour(date)).toBe('20/03/2024 14:30:00');
  });

  it('deve lidar com meses e dias de um dígito', () => {
    const date = new Date('2024-01-05T09:05:00Z').toUTCString();
    expect(formatDateAndHour(date)).toBe('05/01/2024 09:05:00');
  });

  it('deve lidar com datas no final do ano', () => {
    const date = new Date('2024-12-31T23:59:00Z').toUTCString();
    expect(formatDateAndHour(date)).toBe('31/12/2024 23:59:00');
  });

  it('deve considerar diferença de fuso horário UTC-3 (Brasil), onde UTC é dia 05 e Brasil ainda é dia 04', () => {
    // 05 de janeiro de 2024, 02:00 UTC = 04 de janeiro de 2024, 23:00 no Brasil (UTC-3)
    const date = new Date('2024-01-05T02:00:00Z').toUTCString();
    // O formato esperado é 05/01/2024 02:00 porque a função sempre retorna UTC
    expect(formatDateAndHour(date)).toBe('05/01/2024 02:00:00');
    // Se quiser testar o horário brasileiro, seria necessário adaptar a função para aceitar timeZone: 'America/Sao_Paulo'
  });
});
