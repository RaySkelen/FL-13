let a = prompt('Please enter the check number', '0$');
let b = prompt('Please enter the tip percentage', '0%');
let magic_number = 100;
//checking for correct input values//
if (/^[0-9$.]+$/.test(a) === false || /^[0-9%.]+$/.test(b) === false || a < 0 || b<0 || b>magic_number) { 
	alert('Invalid input data');
} else {
	//checking if "$" and "%" are on the last place (if there are any)//
	if (/\$/.test(a) === true && /\$$/.test(a) === false) {
		alert('Invalid input data');
}	else {
		if (/%/.test(b) === true && /%$/.test(b) === false) {
		alert('Invalid input data');
		}	else {
			let check = parseFloat(a);
			let tip = parseFloat(b);
			//checking if inputs contain only "$" || "%", or they are real numbers//
			if (Number.isNaN(check) === true || Number.isNaN(tip) === true) {
				alert('Invalid input data');
			}	else {
					alert(`Check number: ${Math.round(check * magic_number) / magic_number}
Tip percentage: ${Math.round(tip * magic_number) / magic_number}
Tip amount: ${Math.round(check * tip) / magic_number}
Total sum to pay: ${Math.round((check * tip / magic_number + check) * magic_number) / magic_number}`);
			}
		}
	}
}