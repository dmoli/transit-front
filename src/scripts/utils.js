import nl2br from 'nl2br';

/**
 * BUsca un elemento dentro de un array
 *
 * @return true si existe, false si no
 */
export const isFound = (array, itemToFound) => {
  const found = array.filter(item => item === itemToFound);
  return found.length > 0;
};

/**
 * Elimina "."
 *
 * @param {string} string cadena de texto
 * @return nueva cadena sin "."
 */
export const cleanDots = string => (string.replace(/\./g, ''));

/**
 * Cambia saltos de línea por br
 *
 * @param {string} string cadena de texto
 * @return nueva cadena
 */
export const toBr = string => (nl2br(string));

/**
 * Cambia br por saltos de línea
 *
 * @param {string} string cadena de texto
 * @return nueva cadena
 */
export const brToNewLine = (string) => {
  const regex = /<br\s*[/]?>/gi;
  return string.replace(regex, '');
};
