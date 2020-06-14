let books = [
    {
        id: '1',
        name: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        imgURL: 'https://eloquentjavascript.net/img/cover.jpg',
        plot: 'This is a book about JavaScript, programming, and the wonders of the digital.'
    },
    {
        id: '2',
        name: 'The C++ Programming Language, 4th Edition',
        author: 'Bjarne Stroustrup',
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51Z-XJXiQnL._SX396_BO1,204,203,200_.jpg',
        plot: 'This book features an enhanced, layflat binding, which allows the book to stay open more easily when ' +
            'placed on a flat surface. This special binding method—noticeable by a small space inside the spine—also ' +
            'increases durability. C++11 has arrived: thoroughly master it, with the definitive new guide from C++ ' +
            'creator Bjarne Stroustrup, C++ Programming Language, Fourth Edition! The brand-new edition of the worlds' +
            'most trusted and widely read guide to C++, it has been comprehensively updated for the long-awaited' +
            'C++11 standard.'
    },
    {
        id: '3',
        name: 'Fluent Python',
        author: 'Luciano Ramalho',
        imgURL: 'https://covers.oreillystatic.com/images/0636920032519/lrg.jpg',
        plot: 'Python’s simplicity lets you become productive quickly, but this often means you aren’t using ' +
            'everything it has to offer. With this hands-on guide, you’ll learn how to write effective, idiomatic ' +
            'Python code by leveraging its best—and possibly most neglected—features. Author Luciano Ramalho takes ' +
            'you through Python’s core language features and libraries, and shows you how to make your code shorter, ' +
            'faster, and more readable at the same time.'
    }
]
if (localStorage.getItem('userLocalStorage') === null) {
    localStorage.setItem('userLocalStorage', JSON.stringify(books));
} else {
    
}