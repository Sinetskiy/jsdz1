/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    var item,
        result = true;

    isFullArray(array);
    isFunction(fn);

    for (item of array) {
        result = fn(item);
    }

    return result;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    var item;

    isFullArray(array);
    isFunction(fn);

    for (item of array) {
        if (fn(item)) {
            return true;
        }
    }

    return false;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    var i = 1,
        badArguments = [];

    isFunction(fn);

    for (i; i < arguments.length; i++) {
        try {
            fn(arguments[i]);
        } catch (e) {
            badArguments.push(arguments[i]);
        }
    }

    return badArguments;
}

/*
 Задача 4:
 Используя отладчик и точки остановки, определите в каких случаях if дает true
 Исправьте условие внутри if таким образом, чтобы функция возвращала true
 */
function findError(data1, data2) {
    return (function() {
        for (var i = 0; i < data1.length; i++) {
            if (data1[i].toString() !== data2[i].toString()) {
                return false;
            }
        }

        return true;
    })();
}

/*
 Задача 5:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданным аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    isNumber(number);

    return {
        number: number,

        sum: function() {
            var i,
                result = this.number;

            for (i = 0; i < arguments.length; i++) {
                result += arguments[i];
            }

            return result;
        },

        dif: function() {
            var i,
                result = this.number;

            for (i = 0; i < arguments.length; i++) {
                result -= arguments[i];
            }

            return result;
        },

        div: function() {
            var i,
                result = this.number;

            for (i = 0; i < arguments.length; i++) {
                isArgEqZero(arguments[i])
                result /= arguments[i];
            }

            return result;
        },

        mul: function() {
            var i,
                result = this.number;

            for (i = 0; i < arguments.length; i++) {
                result *= arguments[i];
            }

            return result;
        }
    };
}

function isFullArray(array) {
    if (!(array instanceof Array && array.length > 0)) {
        throw new Error('empty array');
    }
}

function isFunction(fn) {
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }
}

function isNumber(number) {
    if (!Number.isFinite(number)) {
        throw new Error('number is not a number');
    }
}

function isArgEqZero(arg) {
    if (arg === 0) {
        throw new Error('division by 0');
    }
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    findError,
    calculator
};