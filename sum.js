// sum.js
function sum(...args) {
  if (args.length === 0) {
    throw new Error('Debes proporcionar al menos un número');
  }
  if (!args.every(n => typeof n === 'number')) {
    throw new Error('Entrada no válida: todos los argumentos deben ser números');
  }
  return args.reduce((acc, n) => acc + n, 0);
}

if (require.main === module) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Introduce números separados por espacios: ', (input) => {
    try {
      const numbers = input.split(' ').map(Number);
      if (numbers.some(isNaN)) {
        throw new Error('Todos los valores deben ser números');
      }
      const resultado = sum(...numbers);
      console.log(`La suma es: ${resultado}`);
    } catch (err) {
      console.error(err.message);
    }
    rl.close();
  });
}

module.exports = { sum };
