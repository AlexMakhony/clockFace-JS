// Ставим РЕФы
const refs = {
startBtn: document.querySelector(`button[data-action-start]`),
stopBtn: document.querySelector(`button[data-action-stop]`),
clockface: document.querySelector(`.js-clockface`),
}

const timer = {
    // Для того чтобы у нас была возможность остановить часы - добавляем ИНТЕРВАЛ ИД, базово = null,
  intervalId: null,
  start () {
    // Задаём переменную с указанием текущей даты
    const startTime = Date.now()
    // Задаём интервал, чтобы функция стартовал каждую секунду, но делаем это через this.intervalId =
    this.intervalId = setInterval(() => {
    // Отлавливаем время текущее момент вызова функции (по сути это текущее время с 70го года :))
    const currentTime = Date.now();
    // Дальше делаем разницу между текущим временем и стартовым временем
    const deltaTime = currentTime - startTime;
    // Дальше связываем нашу копиПАСТУ, вставив нашу ДЕЛЬТУ
    const time = convertMs(deltaTime);
    updateClockface(time);

    // console.log(`${days}:${hours}:${minutes}:${seconds}`)
    // Вызываем функцию
    }, 1000);
  },
  stop () {
    clearInterval(this.intervalId);
  }
};

// Стафим функцию чтобы наши часы отображались в нашей P-шке
function updateClockface({ days, hours, minutes, seconds }) {
  refs.clockface.textContent = `${days}:${hours}:${minutes}:${seconds}`
};

// Включаем чудо-кнопочки
refs.startBtn.addEventListener(`click`, () => {
  timer.start();
  // не забываем ДОБАВИТЬ атрибут дисэйбл если кнопка уже добавлена
  refs.startBtn.setAttribute('disabled', true);
});

refs.stopBtn.addEventListener(`click`, () => {
  timer.stop();
  // не забываем СНЯТЬ атрибут дисэйбл после нажатия кнопки СТОПс
  refs.startBtn.removeAttribute('disabled', true);
});

// Лечим формат времени, потому как нам нужен ХХ:ХХ:ХХ:ХХ
function pad(value) {
  return String(value).padStart(2, '0');
}

// Адская копиПАСТА (с.) Репета ))
// Для получения правильного формата, мы математические исчисления оборачиваем в функцию
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
