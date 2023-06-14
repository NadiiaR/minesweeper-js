startGame(15, 15, 30);

function startGame(WIDTH, HEIGHT, BOMBS_COUNT) {
  //нашел поле
  const field = document.querySelector('.field');
  // посчитал клеточки на поле
  const cellsCount = WIDTH * HEIGHT;
  //для каждой клетки создал кнопку
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  // все кнопки сложил в один массив
  const cells = [...field.children];

  // рахуємо не відкриті ячейки
  let closedCount = cellsCount;

  //подготовил бомбы. первые пятнадцать из ячеек
  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, BOMBS_COUNT);

    // проверяю, клик на кнопку а не в стороне
  field.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    // ищу на какую ячейку я нажала и отрываю ее
    const index = cells.indexOf(event.target);
    const column = index % WIDTH;
    const row = Math.floor(index / WIDTH);
    open(row, column);
  });

  // перевірка крайних ячеек
  function isValid(row, column) {
    return row >= 0
      && row < HEIGHT
      && column >= 0
      && column < WIDTH;
  }

  //count bombs перебор соседних ячеек
  function getCount(row, column) {
    let count = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isBomb(row + y, column + x)) {
          count++;
        }
      }
    }
    return count;
  }

  // open ячейку и выводим результат в ячейке
  function open(row, column) {
    if (!isValid(row, column)) return;
    const index = row * WIDTH + column;
    const cell = cells[index];

    if (cell.disabled === true) return;

    cell.disabled = true;
    closedCount--;

    if (closedCount === BOMBS_COUNT) alert('you won');

    if (isBomb(row, column)) {
      cell.innerHTML = 'X';
      alert('you lost!');

      return;
    }

    const count = getCount(row, column);

    if (count !== 0) {
      cell.innerHTML = count;

      return;
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        open(row + y, column + x);
      }
    }
  }

  // generiruem bombu
  function isBomb(row, column) {
    if (!isValid(row, column)) {return false;}
    const index = row * WIDTH + column;

    return bombs.includes(index);
  }
}
