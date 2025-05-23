// index.js
const { sum } = require('./sum');

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
  } catch (e) {
    console.error(`❌ ${description}`);
    console.error('   ', e.message);
    process.exit(1); // Falla el proceso si hay error
  }
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
} else {
  // Pruebas manuales
  test('Suma correcta de 2 + 3 = 5', () => {
    const result = sum(2, 3);
    if (result !== 5) throw new Error(`Expected 5, got ${result}`);
  });

  test('Debe lanzar error con entrada inválida', () => {
    try {
      sum(2, 'a');
      throw new Error('No lanzó error con entrada inválida');
    } catch (e) {
      if (!e.message.toLowerCase().includes('entrada no válida')) throw e;
    }
  });
}
