export default function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.random() * 1000000;
  const hexadecimal = Math.floor(random).toString(16);

  return `id-${timestamp}-${hexadecimal}`;
}
