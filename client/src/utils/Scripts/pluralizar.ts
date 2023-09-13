export default function pluralizar(
  palavra: string,
  quantidade: number
): string {
  if (quantidade === 1) {
    return palavra;
  }

  const vogaisAcentuadas = ["á", "é", "í", "ó", "ú"];
  const ultimaLetra = palavra.charAt(palavra.length - 1).toLowerCase();
  const penultimaLetra = palavra.charAt(palavra.length - 2).toLowerCase();

  if (ultimaLetra === "o" && penultimaLetra === "ã") {
    return palavra.replace("ão", "ões");
  } else if (ultimaLetra === "l" && penultimaLetra === "e") {
    return palavra.replace(/el$/, "eis");
  } else if (ultimaLetra === "r" && penultimaLetra === "o") {
    return palavra.replace(/or$/, "ores");
  } else if (ultimaLetra === "x" || ultimaLetra === "s") {
    return palavra;
  } else if (ultimaLetra === "z") {
    return palavra.replace(/z$/, "zes");
  } else if (vogaisAcentuadas.includes(ultimaLetra)) {
    return palavra + "s";
  } else {
    return palavra + "s";
  }
}
