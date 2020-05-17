const root = document.getElementById('root');
const onlyNumbers = /\d+/g;
const onlyLetters = /[a-z]+/g;
const TIMEOUT = 300;
const storedBooks = JSON.parse(localStorage.getItem('userLocalStorage'));
let div = document.createElement('DIV');
div.setAttribute('id', 'bookList');
root.appendChild(div);

function createList() {
    for (let item of storedBooks) {
        let book = document.createElement('DIV');
        book.classList.add('book');
        let link = document.createElement('A');
        link.classList.add('bookLink');
        link.setAttribute('id', `book${item.id}`);
        link.setAttribute('onclick', `bookPreview(${link.id.match(onlyNumbers)})`);
        link.textContent = `${item.name}`;
        let edit = document.createElement('BUTTON');
        edit.classList.add('editButton');
        edit.setAttribute('id', `edit${item.id}`);
        edit.setAttribute('onclick', `edit(${edit.id.match(onlyNumbers)})`);
        edit.textContent = 'Edit';
        book.appendChild(link);
        book.appendChild(edit);
        document.getElementById('bookList').appendChild(book);
    }
    let addButton = document.createElement('BUTTON');
    addButton.setAttribute('onclick', `add(this)`);
    addButton.classList.add('addButton');
    addButton.textContent = 'Add a book';
    document.getElementById('bookList').appendChild(addButton);
}
createList();
let dynamicDiv = document.createElement('DIV');
dynamicDiv.setAttribute('id', 'dynamic');
root.appendChild(dynamicDiv);
let dynamic = document.getElementById('dynamic');
let checkForEmpty = function() {
    dynamic.innerHTML !== '' ? dynamic.innerHTML = '' : null;
}
function renderOnLoad() {
    function getBack() {
        let state = '';
        window.history.replaceState(state, '', 'index.html');
    }
    let hash = window.location.hash.substring(1);
    if (hash === 'add') {
        return add();
    }
    let urlString = document.URL;
    let url = new URL(urlString);
    if (url.searchParams.has('id') === false) {
        getBack();
        return;
    }
    let urlId = url.searchParams.get('id').match(onlyNumbers);
    let paramCheck = 0;
    url.searchParams.forEach(function(){
        paramCheck++;
    });
    if (paramCheck > 1) {
        getBack();
        return;
    }
    if (storedBooks.find(el => Object.values(el)[0] === urlId) === undefined) {
        getBack();
        return;
    }
    if (hash === 'preview'){
        return bookPreview(urlId);
    } else {
        if (hash === 'edit') {
            return edit(urlId);
        } else {
                getBack();
                return;
        }
    }
}
window.addEventListener('popstate', renderOnLoad(), false);

function bookPreview(id) {
    checkForEmpty();
    let book = storedBooks[id-1];
    let state = 'preview';
    let bookName = document.createElement('DIV');
    let bookAuthor = document.createElement('DIV');
    let img = document.createElement('IMG');
    img.setAttribute('src', `${book.imgURL}`);
    img.setAttribute('style', `width:300px;height:400px;`);
    let bookImage = document.createElement('DIV');
    bookImage.appendChild(img);
    let bookPlot = document.createElement('DIV');
    bookName.textContent = `${book.name}`;
    bookAuthor.textContent = `${book.author}`;
    bookPlot.textContent = `${book.plot}`;
    dynamic.appendChild(bookName);
    dynamic.appendChild(bookAuthor);
    dynamic.appendChild(bookImage);
    dynamic.appendChild(bookPlot);
    window.history.pushState(state, 'preview', `?id=${book.id}#preview`);
}

function save(id) {
    let name = document.getElementById('bookNameText');
    let author = document.getElementById('bookAuthorText');
    let img = document.getElementById('bookImageText');
    let plot = document.getElementById('bookPlotText');
    if (name.value === '' || author.value === '' || img.value === '' || plot.value === '') {
        return;
    }
    let book = storedBooks[id-1];
    book.name = name.value;
    book.author = author.value;
    book.img = img.value;
    book.plot = plot.value;
    localStorage.setItem('userLocalStorage', JSON.stringify(storedBooks));
    setTimeout(() => alert('Book succesfully updated!'), TIMEOUT);
    bookPreview(id);
}

function cancel() {
    if (window.confirm('Discard changes?')) {
        history.back();
    }
}

function edit(id) {
    checkForEmpty();
    let book = storedBooks[id-1];
    let state = '';
    window.history.pushState(state, 'edit', `?id=${id}#edit`);
    let form = document.createElement('FORM');
    form.addEventListener('submit', (event) => event.preventDefault());
    let bookName = document.createElement('INPUT');
    bookName.setAttribute('id', 'bookNameText');
    bookName.setAttribute('type', 'text');
    bookName.setAttribute('value', `${book.name}`);
    bookName.required = true;
    let bookAuthor = document.createElement('INPUT');
    bookAuthor.setAttribute('id', 'bookAuthorText');
    bookAuthor.setAttribute('type', 'text');
    bookAuthor.setAttribute('value', `${book.author}`);
    bookAuthor.required = true;
    let bookImage = document.createElement('INPUT');
    bookImage.setAttribute('id', 'bookImageText');
    bookImage.setAttribute('type', 'text');
    bookImage.setAttribute('value', `${book.imgURL}`);
    bookImage.required = true;
    let bookPlot = document.createElement('TEXTAREA');
    bookPlot.setAttribute('id', 'bookPlotText');
    bookPlot.textContent = `${book.plot}`;
    bookPlot.required = true;
    form.appendChild(bookName);
    form.appendChild(bookAuthor);
    form.appendChild(bookImage);
    form.appendChild(bookPlot);
    dynamic.appendChild(form);
    let cancel = document.createElement('BUTTON');
    cancel.textContent = 'Cancel';
    cancel.setAttribute('id', 'cancelButton');
    cancel.setAttribute('onclick', `cancel(${id})`);
    let save = document.createElement('BUTTON');
    save.textContent = 'Save';
    save.setAttribute('id', 'savelButton');
    save.setAttribute('onclick', `save(${id})`);
    form.appendChild(save);
    form.appendChild(cancel);
}

function saveAdd() {
    let name = document.getElementById('bookNameText');
    let author = document.getElementById('bookAuthorText');
    let img = document.getElementById('bookImageText');
    let plot = document.getElementById('bookPlotText');
    if (name.value === '' || author.value === '' || img.value === '' || plot.value === '') {
        return;
    }
    let newBook = {
        id: storedBooks.length + 1,
        name: name.value,
        author: author.value,
        img: img.value,
        plot: plot.textContent
    }
    storedBooks.push(newBook);
    setTimeout(() => alert('Book succesfully added!'), TIMEOUT);
    localStorage.setItem('userLocalStorage', JSON.stringify(storedBooks));
}

function cancelAdd() {
    if (window.confirm('Discard changes?')) {
        history.back;
    }
}

function add() {
    checkForEmpty();
    let state = '';
    window.history.pushState(state, 'add', '#add');
    let form = document.createElement('FORM');
    form.addEventListener('submit', (event) => event.preventDefault());
    let bookName = document.createElement('INPUT');
    bookName.setAttribute('id', 'bookNameText');
    bookName.setAttribute('type', 'text');
    bookName.required = true;
    let bookAuthor = document.createElement('INPUT');
    bookAuthor.setAttribute('id', 'bookAuthorText');
    bookAuthor.setAttribute('type', 'text');
    bookAuthor.required = true;
    let bookImage = document.createElement('INPUT');
    bookImage.setAttribute('id', 'bookImageText');
    bookImage.setAttribute('type', 'text');
    bookImage.required = true;
    let bookPlot = document.createElement('TEXTAREA');
    bookPlot.setAttribute('id', 'bookPlotText');
    bookPlot.required = true;
    form.appendChild(bookName);
    form.appendChild(bookAuthor);
    form.appendChild(bookImage);
    form.appendChild(bookPlot);
    dynamic.appendChild(form);
    let cancel = document.createElement('BUTTON');
    cancel.textContent = 'Cancel';
    cancel.setAttribute('onclick', 'cancelAdd()');
    let save = document.createElement('BUTTON');
    save.textContent = 'Save';
    save.setAttribute('onclick', 'saveAdd()');
    form.appendChild(save);
    form.appendChild(cancel);
}