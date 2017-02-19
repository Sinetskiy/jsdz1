/* ДЗ 5.2 - Div D&D */

/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом фона и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    var width = getRandomInt(100, 300),
        height = getRandomInt(100, 300),
        div = document.createElement('div');

    div.className = 'draggable-div';
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.position = 'absolute';
    div.style.top = getRandomInt(0, window.innerHeight - height) + 'px';
    div.style.left = getRandomInt(0, window.innerWidth - width) + 'px';
    div.style.backgroundColor = rgb(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255))

    return div;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function rgb(r, g, b) {
    return `rgb(${r},${g},${b})`;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    var shiftX, shiftY;

    var mouseDownHandler = function(e) {
        let coords = getCoords(e.target);

        shiftX = e.pageX - coords.left;
        shiftY = e.pageY - coords.top;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }
    var mouseMoveHandler = function(e) {
        e.target.style.left = e.pageX - shiftX + 'px';
        e.target.style.top = e.pageY - shiftY + 'px';
    }
    var mouseUpHandler = function() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    target.parentNode.addEventListener('mousedown', mouseDownHandler);
    target.addEventListener('dragstart', () => { return false; });
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};