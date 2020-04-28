let login = prompt('Please enter your login');
let pass = 0;
let morning = 8;
let evening = 20;
let word_amount = 4;
let time = function checkTime(x, min, max) {
    return x >= min && x <= max;
}
if (/\S/.test(login) === false) {
    alert('Canceled');
    pass = null;
} else {
    if (login.length < word_amount) {
        alert('I dont know any users having name length less than 4 symbols');
        pass = null;
    } else {
        login === 'User' || login === 'Admin' ? pass = prompt('Please enter your password') :
            (alert('I dont know you'), pass = null);
    }
}
if (/\S/.test(pass) === false) {
    alert('Canceled');
} else {
    if (login === 'User' && pass === 'UserPass') {
        time(new Date().getHours(), morning, evening) ? alert('Good day, dear User!') :
            alert('Good evening, dear User!');
    } else {
        if (login === 'Admin' && pass === 'RootPass') {
            time(new Date().getHours(), morning, evening) ? alert('Good day, dear Admin!') :
                alert('Good evening, dear Admin!');
        } else {
            pass === null ? '' : alert('Wrong password');
        }
    }
}