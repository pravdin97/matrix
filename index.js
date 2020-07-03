// utils
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomMatrix(size) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => getRandomInt(20)));
}

function printMatrix(matrix) {
  matrix.forEach(arr => console.log(arr.join('\t')));
}

// algorithm
const moveInDirection = (direction) => {
  if (direction === 'row') return (matrix, result, k, step, i, j) => {
    for (let l = 0; l < k; l++) {
      j = j + step;
      result.push(matrix[i][j]);
    }
    return [i, j];
  }
  else return (matrix, result, k, step, i, j) => {
    for (let l = 0; l < k; l++) {
      i = i + step;
      result.push(matrix[i][j]);
    }
    return [i, j];
  }
}

function getValuesFromCenterClockwise(matrix) {
  const rowShift = moveInDirection('row');
  const columnShift = moveInDirection('column');

  const center = (matrix.length - 1) / 2;
  let i = center, j = center;

  const result = [];
  result.push(matrix[i][j]);

  let step = -1;
  for (stepCount = 1; stepCount < matrix.length + 1; stepCount++) {
    if (stepCount === matrix.length) {
      [i, j] = rowShift(matrix, result, stepCount - 1, step, i, j);
      break;
    }
    [i, j] = rowShift(matrix, result, stepCount, step, i, j);

    [i, j] = columnShift(matrix, result, stepCount, step, i, j);
    step = step * -1;
  }

  return result;
}

function main(n) {
  if (n < 1) return;
  const matrix = getRandomMatrix(2 * n - 1);
  console.log('Исходная матрица:');
  printMatrix(matrix);
  const resultArray = getValuesFromCenterClockwise(matrix);
  console.log('Результат: ', resultArray.join(' '));
}

main(3);
