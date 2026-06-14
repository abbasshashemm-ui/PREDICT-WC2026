export function getFlagUrl(countryCode: string, width = 80): string {
  return `https://flagcdn.com/w${width}/${countryCode.toLowerCase()}.png`;
}
