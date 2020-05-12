const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];
const rootNode = document.getElementById('root');
const right_click = 2;
//rendering the object
function createTree(div, array) {
  div.innerHTML = createTreeText(array);
}
//function that writes 'Folder is empty';
function emptyFolderText(el) {
  let target = el.target;
  let index = Array.prototype.indexOf.call(target.parentNode.children, target);
  if(target.parentNode.parentNode.children[index+1] === undefined) {
    let emptyLi = document.createElement('div');
    emptyLi.className = 'emptyFolder';
    if(target.textContent.includes('Folder is empty')) {
      null;
    } else {
      let emptyText = document.createTextNode('Folder is empty');
      emptyLi.appendChild(emptyText);
      return target.appendChild(emptyLi);
    }
  }
}
//function show/hide folder children;
function show(el) {
  let target = el.target;
    if (target.tagName === 'INPUT') {
      if (target.parentNode.parentNode.classList.contains('folder')) {
        let neededParent = target.parentNode.parentNode.parentNode;
        let index = Array.prototype.indexOf.call(neededParent.children, target.parentNode.parentNode);
        let icon = neededParent.children[index-1];
        if(target.parentNode.parentNode.children[1] === undefined) {
          let emptyLi = document.createElement('div');
          emptyLi.className = 'emptyFolder';
          if(target.textContent.includes('Folder is empty')) {
            null;
          } else {
            let emptyText = document.createTextNode('Folder is empty');
            emptyLi.appendChild(emptyText);
            return target.parentNode.parentNode.appendChild(emptyLi);
          }
          return;
        }
        if(target.parentNode.parentNode.children[1].hidden === true) {
          target.parentNode.parentNode.children[1].hidden = false;
          icon.innerHTML = '<i class="material-icons">folder_open</i>';
        } else {
          target.parentNode.parentNode.children[1].hidden = true;
          icon.innerHTML = '<i class="material-icons">folder</i>';
        }
      } else {
        return
      }
    } else {
      return
    }
}
//creating HTML of the object;
function createTreeText(array) {
  let ul = '';
  array.forEach(function(el) {
    let li = '';
    if(el.folder === true ) {
      li += `<i class="material-icons">folder</i>`;
    }
    if(el.folder === true && el.children !== null) {
      li += `<li><span><input value="${el.title}" disabled="disabled"></input></span><ul>${createTreeText(el.children)}
      </ul></li>`;
    } else {
      li += `<li><span><input value="${el.title}" disabled="disabled"></input></span></li>`;
    }
    if (li) {
      ul += li
    }
  })
  return ul || '';
}
createTree(rootNode, data);
//rendering the context menu;
function renderMenu() {
  const MENU = document.createElement('UL');
  MENU.className = 'menu';
  const MENU_RENAME = document.createElement('LI');
  MENU_RENAME.setAttribute('id', 'l1');
  const TEXT_RENAME = document.createTextNode('Rename');
  MENU_RENAME.appendChild(TEXT_RENAME);
  const MENU_DELETE = document.createElement('LI');
  MENU_DELETE.setAttribute('id', 'l2');
  const TEXT_DELETE = document.createTextNode('Delete');
  MENU_DELETE.appendChild(TEXT_DELETE);
  MENU.appendChild(MENU_RENAME);
  MENU.appendChild(MENU_DELETE);
  document.body.appendChild(MENU);
}
renderMenu();
let folders = document.querySelectorAll('i + li');
let emptyFolders = [];
function checkEmptyFolders() {
  for (let i = 0; i < folders.length; i++) {
    if (folders[i].children.length === 0) {
      emptyFolders.push(folders[i]);
    }
  }
}
checkEmptyFolders();
//hiding folders by default;
let childrenOfRoot = rootNode.children;
function hide (children) {
  for (let i = 0; i < children.length; i++){
    children[i].addEventListener('click', show, false);
    children[i].addEventListener('click', emptyFolderText, false);
    for(let j = 0; j < children[i].children.length; j++) {
      if (children[i].children[j].tagName !== 'SPAN') {
        children[i].children[j].hidden = true;
      }
    }
  }
}
hide(childrenOfRoot);
const menu = document.querySelector('.menu');
//"unhiding" the menu, so we could toggle between visible and hidden via CSS;
for (let i=0; i < right_click; i++) {
  menu.children[i].hidden = false;
}
//calling the contextmenu;
rootNode.addEventListener('contextmenu', event => {
  let element = event.target.closest('li');
  if (element !== null) {
    element.focus();
    event.preventDefault();
    menu.classList.add('active');
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
  }
});
//hiding the contextmenu;
rootNode.addEventListener('click', event => {
  event.button !== right_click ? menu.classList.remove('active') : null;
}, false)
menu.addEventListener('click', event => {
  event.stopPropagation();
}, false);
let icons = document.getElementsByTagName('i');
for (let i = 0; i < icons.length; i++) {
  icons[i].classList.add(`icon${i}`);
  folders[i].classList.add(`folder${i}`, 'folder');
}
let files = document.querySelectorAll('li:not(.folder):not(#l1):not(#l2)');
//assigning the contextmenu buttons;
rootNode.addEventListener('contextmenu', event => {
  document.getElementById('l1').addEventListener('click', () => {
    let element = event.target.closest('input');
    element.removeAttribute('disabled');
    element.focus();
    element.select();
  })
})
rootNode.addEventListener('change', (event) => {
  event.target.setAttribute('disabled', 'disabled');
})
rootNode.addEventListener('contextmenu', event => {
  document.getElementById('l2').addEventListener('click', () => {
    let element = event.target.closest('li');
    if (element !== null) {
      let parent = element.parentNode;
      event.button === right_click ? element.remove() : null;
      if (element.classList.contains('folder')) {
        let folderNumber = element.classList[0].match(/\d+/)[0];
        let icon = document.getElementsByClassName(`icon${folderNumber}`)[0];
        icon !== undefined ? icon.remove() : null;
      }
      if (parent !== null && parent.children.length === 0 ) {
        const DIV = document.createElement('div');
        const DIV_TEXT = document.createTextNode('Folder is empty');
        DIV.className = 'emptyFolder';
        DIV.appendChild(DIV_TEXT);
        parent.appendChild(DIV);
      }
    }
  })
})