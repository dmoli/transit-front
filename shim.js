/** simular retardo para pruebas de componentes */
global.requestAnimationFrame = callback => setTimeout(callback, 0);
