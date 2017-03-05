/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds * 1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json',
        compare = function(a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }

            return 0;
        };

    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();

        req.open('GET', url, true);
        req.onload = function() {
            if (this.status == 200) {
                let towns = this.response.sort(compare);

                resolve(towns);
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        }
        req.onerror = function() {
            reject(new Error('Не удалось загрузить города'));
        }
        req.ontimeout = function() {
            reject('Время выполнения запроса истикло');
        }
        req.responseType = 'json'
        req.timeout = 3000;
        req.send();
    });
}

export {
    delayPromise,
    loadAndSortTowns
};