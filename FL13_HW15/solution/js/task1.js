const EVEN = 2;
let assign = function(newObject, target, source) {
    let targetArray = [];
    let sourceArray = [];
    function getTargetArray() {
        for (let [key, value] of Object.entries(target)) {
            targetArray.push(key);
            targetArray.push(value);
        }
    }
    getTargetArray();
    function getSourceArray() {
        for (let [key, value] of Object.entries(source)) {
            sourceArray.push(key);
            sourceArray.push(value);
        }
    }
    getSourceArray();
    for (const el of sourceArray) {
        if (sourceArray.indexOf(el) % EVEN === 0) {
            let match = targetArray.find(element => element === el);
            if (match !== undefined) {
                targetArray[targetArray.indexOf(match) + 1] = sourceArray[sourceArray.indexOf(match) + 1];
            } else {
                targetArray.push(el);
                targetArray.push(sourceArray[sourceArray.indexOf(el) + 1]);
            }
        }
    }
    for (let i = 0; i <= targetArray.length / EVEN; i += EVEN) {
        target[targetArray[i]] = targetArray[i + 1];
    }
    for (let i = 0; i <= targetArray.length / EVEN; i += EVEN) {
        newObject[targetArray[i]] = targetArray[i + 1];
    }
    return newObject;
}