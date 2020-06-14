function countPoints(array) {
    let points = 0;
    array.forEach(function(score) {
        if (score.split(':')[0] > score.split(':')[1]) {
            points = points + 3;
        } else {
            score.split(':')[0] === score.split(':')[1] ? points++ : null;
        }
    });
    return points;
}
countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']);
countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']);