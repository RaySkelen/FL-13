const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const loading = document.getElementById('loading');
const GET_CODE = 200;
const POST_CODE = 201;
const PUT_DELETE_CODE = 204;
const renderTable = () => {
    loading.classList.remove('displayNone');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', baseUrl +'/users');
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.status !== GET_CODE) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
            return;
        }
        let deleteTable = document.getElementById('table');
        deleteTable ? deleteTable.parentNode.removeChild(deleteTable) : null;
        let table = document.createElement('DIV');
        table.id = 'table';
        for (const el of xhr.response) {
            let row = document.createElement('DIV');
            row.setAttribute('style', 'display:flex; justify-content: space-between; width: 600px');
            let idField = document.createElement('SPAN');
            idField.textContent = el.id;
            let form = document.createElement('FORM');
            form.setAttribute('style', 'margin-left: 30px');
            let name = document.createElement('INPUT');
            name.setAttribute('value', `${el.name}`);
            let username = document.createElement('INPUT');
            username.setAttribute('value', `${el.username}`);
            let updateBtn = document.createElement('BUTTON');
            updateBtn.textContent = 'Update';
            updateBtn.setAttribute('type', 'button');
            updateBtn.classList.add('updateBtn');
            updateBtn.setAttribute('onclick', 'updateEl(this)');
            let deleteBtn = document.createElement('BUTTON');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.setAttribute('onclick', 'deleteEl(this)');
            deleteBtn.setAttribute('type', 'button');
            row.appendChild(idField);
            form.appendChild(name);
            form.appendChild(username);
            form.appendChild(updateBtn);
            form.appendChild(deleteBtn);
            row.appendChild(form);
            table.appendChild(row);
        }
        appContainer.appendChild(table);
        loading.classList.add('displayNone');
    }
    xhr.send();
    xhr.onerror = () => {
        alert('Request falied')
    };
}
window.onload = renderTable();
document.getElementById('addNewUser').onclick = () => {
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let data = {
        name,
        username
    };
    let xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl +'/users');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.upload.onloadstart = () => {
        document.getElementById('addNewUser').disabled = true;
    }
    xhr.onload = function() {
        document.getElementById('addNewUser').disabled = false;
        xhr.status !== POST_CODE ? alert(`Error ${xhr.status}: ${xhr.statusText}`) : renderTable();
    }
    xhr.onerror = () => {
        alert('Request falied')
    };
    xhr.send(JSON.stringify(data));
}
const updateEl = function(el) {
    el.disabled = true;
    const id = el.parentNode.parentNode.firstChild.innerText;
    const name = el.parentNode.firstChild.value;
    const username = el.parentNode.childNodes[1].value;
    const data = {
        name,
        username
    }
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', baseUrl +`/users/${id}`);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
        xhr.status !== PUT_DELETE_CODE ? alert(`Error ${xhr.status}: ${xhr.statusText}`) : renderTable();
        el.disabled = false;
    }
    xhr.onerror = () => {
        alert('Request falied')
    };
}
const deleteEl = function(el) {
    el.disabled = true;
    const id = el.parentNode.parentNode.firstChild.innerText;
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', baseUrl +`/users/${id}`);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Authorization', 'admin');
    xhr.send();
    xhr.onload = () => {
        xhr.status !== PUT_DELETE_CODE ? alert(`Error ${xhr.status}: ${xhr.statusText}`) : renderTable();
        el.disabled = false;
    }
    xhr.onerror = () => {
        alert('Request falied')
    };
}