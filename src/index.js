/* ДЗ 3 - объекты и массивы */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    var i;

    for (i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var i,
        resultArray = [];

    for (i = 0; i < array.length; i++) {
        resultArray.push(fn(array[i], i, array));
    }

    return resultArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var i = 1,
        result = array[0];

    if (array.length === 0) {
        throw new TypeError('Массив пустой');
    }

    if (initial !== undefined) {
        i = 0;
        result = initial;
    }

    for (i; i < array.length; i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var propName,
        resultArray = [];

    for (propName in obj) {
        if (propName) {
            resultArray.push(propName.toUpperCase());
        }
    }

    return resultArray;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
    var i,
        resultArray = [];

    from = (from < 0 ? array.length + from : from);
    to = (to < 0 ? array.length + to : to)

    for (i = from; i < to; i++) {
        if (!array[i]) {
            continue;
        }

        resultArray.push(array[i]);
    }

    return resultArray;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    obj = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = Math.pow(value, 2);

            return true;
        }
    });

    return obj;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};