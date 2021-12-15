const queryString = new URLSearchParams(window.location.search);
const q = queryString.get('q') || '';
debugger
const qObject = document.getElementsByName('q')[0];
qObject.value = q;
qObject.focus();
// qObject.blur();

let items;

const itemsCreate = function(form) {
  const itemNameObject = form['item-name'];
  const item = {
    name: itemNameObject.value,
    enter: moment().format('YYYY-MM-DD'),
    expire: moment().add(7, 'days').format('YYYY-MM-DD')
  };
  const successFunction = function() {
    itemNameObject.value = '';
    itemsRead();
  }
  axios.post('https://red-js-default-rtdb.firebaseio.com/items.json', item).then(successFunction);
};

const itemsRead = function() {
  axios.get('https://red-js-default-rtdb.firebaseio.com/items.json').then(function(response) {
    items = response.data;
    const tagTbodyParent = document.getElementById('tag-tbody-parent');
    tagTbodyParent.innerHTML = '';
    const tagTrChild = document.getElementById('tag-tr-child');
    let index = 0;
    for (let key in items) {
      // TODO: items[key].name값과 q값을 indexOf로 비교해서 continue시킨다.
      if (items[key].name.indexOf(q) === -1) {
       continue; 
      }
      const newTrChild = tagTrChild.cloneNode(true);
      tagTbodyParent.appendChild(newTrChild);
      const itemsNumberObject = document.getElementsByName('items-number')[index];
      itemsNumberObject.innerHTML = index + 1;
      const itemsNameObject = document.getElementsByName('items-name')[index];
      itemsNameObject.innerHTML = items[key].name;
      const itemsEnterObject = document.getElementsByName('items-enter')[index];
      itemsEnterObject.innerHTML = items[key].enter;
      const itemsExpireObject = document.getElementsByName('items-expire')[index];
      itemsExpireObject.innerHTML = items[key].expire;
      const itemsDeleteObject = document.getElementsByName('items-delete')[index];
      itemsDeleteObject.key = key;
      const itemsUpdateObject = document.getElementsByName('items-update')[index];
      itemsUpdateObject.key = key;
      index++;
    }
    console.log('Readed', items);
  })
};

const itemsDelete = function(key) {
  const url = 'https://red-js-default-rtdb.firebaseio.com/items/' + key + '.json';
  axios.delete(url).then(itemsRead);
};
const itemsInOut = function(object) {
  console.log(object.checked)
  // console.log(object.key)
  // console.log(items)
  // console.log(items[object.key])

  const url = 'https://red-js-default-rtdb.firebaseio.com/items/' + object.key + '.json';
  if (object.checked) {
    const item = items[object.key];
    axios.patch(url, item);
  } else {
    axios.delete(url);
  }
};


const itemsUpdateModalOpen = function(key) {
  const itemNameObject = document.getElementsByName('item-name')[0];
  itemNameObject.value = items[key].name;
  const itemEnterObject = document.getElementsByName('item-enter')[0];
  itemEnterObject.value = items[key].enter;
  const itemExpireObject = document.getElementsByName('item-expire')[0];
  itemExpireObject.value = items[key].expire;
  const itemUpdateObject = document.getElementsByName('item-update')[0];
  itemUpdateObject.key = key;
};

const itemsUpdate = function(key) {
  const itemNameObject = document.getElementsByName('item-name')[0];
  const itemEnterObject = document.getElementsByName('item-enter')[0];
  const itemExpireObject = document.getElementsByName('item-expire')[0];
  const url = 'https://red-js-default-rtdb.firebaseio.com/items/' + key + '.json';
  const item = {
    name: itemNameObject.value,
    enter: itemEnterObject.value,
    expire: itemExpireObject.value
  };
  axios.patch(url, item).then(function() {
    modalToggle();
    itemsRead();
  });
}

itemsRead();
