export const copyToClipboard = (text: string) => {
  if (navigator) {
    navigator.clipboard.writeText(text);
  }
};
