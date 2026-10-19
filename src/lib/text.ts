/** Lowercase, strip diacritics and map đ → d, so "Đẩy ngực" matches "day nguc". */
export const foldText = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
