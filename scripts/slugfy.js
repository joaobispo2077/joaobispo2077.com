const slugfy = (str) =>
  str
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\(|\)/g, '')
    .replace(/,/g, '')
    .replace(/;/g, '')
    .replace(/:/g, '')
    .replace(/!/g, '')
    .replace(/\?/g, '')
    .replace(/\./g, '')
    .toLowerCase();

const addHashtag = (str, quantity) => {
  const hashtag = '#';
  return hashtag.repeat(quantity) + str;
};

console.log(`${addHashtag(slugfy('Considerações Finais'), 1)}`);
