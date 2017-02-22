/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return require('./index').loadAndSortTowns();
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {

    if (typeof full != 'string') {
        throw new Error('"full" is not a string type');
    }

    if (typeof chunk != 'string') {
        throw new Error('"chunk" is not a string type');
    }

    return full.toUpperCase().includes(chunk.toUpperCase());
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise = loadTowns();
let townsArr;

let fulfilled = function(towns) {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';

    townsArr = towns;
}

let rejected = function(error) {
    let loadingBlokText = loadingBlock.innerHTML;

    loadingBlock.innerHTML = error.message;
    loadingBlock.style.display = 'block';
    filterBlock.style.display = 'none';

    let button = document.createElement('button');

    button.innerText = 'Повторить';
    button.addEventListener('click', e => {
        loadingBlock.innerHTML = loadingBlokText;
        loadingBlock.style.display = 'block';
        filterBlock.style.display = 'none';

        townsPromise.then(fulfilled, rejected);
    });

    loadingBlock.appendChild(button);
}

filterBlock.style.display = 'none';
loadingBlock.style.display = 'block';

filterInput.addEventListener('keyup', function() {
    let value = this.value.trim();
    let resultStr = '';

    for (let town of townsArr) {
        if (isMatching(town.name, value)) {
            resultStr += town.name + '</br>';
        }
    }

    filterResult.innerHTML = filterInput.value != '' ? resultStr : '';
});

townsPromise.then(fulfilled, rejected);

export {
    loadTowns,
    isMatching
};