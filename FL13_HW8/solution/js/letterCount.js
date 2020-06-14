function letterCount (word, letter){
    return word.toLowerCase().split('').filter(function (currentLetter) {
        if (currentLetter === letter || currentLetter === letter.toLowerCase() ||
            currentLetter === letter.toUpperCase()) {
            return currentLetter;
        }
        return null;
    }).length;
}
letterCount("Maggy", "g");
letterCount("Barry", "b");
letterCount("", "z");
