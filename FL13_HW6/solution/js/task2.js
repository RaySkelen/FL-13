let word = prompt('Please enter your word');
if (/\S/.test(word) === false) {
	alert('Invalid value');
}	else {
	alert(`"${word.slice((word.length-1)/2, word.length/2+1)}"`);
}