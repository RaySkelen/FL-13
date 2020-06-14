function positiveSum(array) {
    //first we check if at least one element is positive, not to cause any errors//
    if (array.some(number => number >= 0)) {
        return array.filter(number => number > 0).reduce((sum, number) => sum + number);
    } else {
        return 'Array has no positive numbers';
    }
}
positiveSum([2, 4, 6, 8]);
positiveSum([0, -3, 5, 7]);