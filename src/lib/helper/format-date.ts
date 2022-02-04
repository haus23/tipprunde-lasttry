const formatter = new Intl.DateTimeFormat('de', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
});
export const formatDate = (date: string) => formatter.format(new Date(date));
