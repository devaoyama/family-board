export const generateRandomString = (length: number): string => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((n) => S[n % S.length])
    .join("");
};
