const SUBSTITUTE_MAX = 20;
const SUBSTITUTE_MIN = 10;
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_DAY = 86400;
function convert(...Numbers) {
    const NEW_ARRAY = [];
    for (const el in [...Numbers]) {
        typeof [...Numbers][el] === 'string' ? NEW_ARRAY.push(parseInt([...Numbers][el])) :
            NEW_ARRAY.push([...Numbers][el].toString());
    }
    return NEW_ARRAY;
}
let execute = function(array, callback) {
    for (const elem in array) {
        array[elem] = callback(array[elem]);
    }
}
let map = function(array, callback) {
    const NEW_ARRAY = [];
    execute(array, function(el) {
        typeof el === 'string' ? el = parseInt(el) : null; NEW_ARRAY.push(callback(el));
    });
    return NEW_ARRAY;
}
function filterArray(array, callback){
    const NEW_ARRAY = [];
    execute(array, function(el) {
        callback(el) === true ? NEW_ARRAY.push(el) : null;
    });
    return NEW_ARRAY;
}
function containsValue(array, value) {
    let answer = false;
    execute(array, function(el) {
        el === value ? answer = true : null;
        if (answer) {
            return answer;
        }
    })
    if (answer) {
        return true;
    } else {
        return false;
    }
}
function flipOver(string) {
    let newString = '';
    let length = [...string].length;
    for (let i = length - 1; i >= 0; i--) {
        newString += string[i];
    }
    return newString;
}
function makeListFromRange(array) {
    array[0] > array[1] ? array[1] = [array[0], array[0] = array[1]][0] : null;
    const NEW_ARRAY = [];
    for (let i = 0; i <= array[1] - array[0]; i++) {
        NEW_ARRAY.push(array[0] + i);
    }
    return NEW_ARRAY;
}
function getArrayOfKeys(array, keyName) {
    const NEW_ARRAY = [];
    execute(array, function(el) {
        NEW_ARRAY.push(el[keyName]);
    })
    return NEW_ARRAY;
}
function substitute(array) {
    return map(array, function(el) {
        if(el < SUBSTITUTE_MAX && el > SUBSTITUTE_MIN) {
            el = '*';
        }
        return el;
    });
}
function getPastDay(date, daysAgo) {
    let days = daysAgo * MILLISECONDS_IN_SECOND * SECONDS_IN_DAY;
    let result = new Date(date.getTime() - days);
    return result.getDate();
}
function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}