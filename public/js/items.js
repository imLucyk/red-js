const queryString = new URLSearchParams(window.location.search);
const nameText = queryString.get('input-text');

// const inputTextObjects = document.getElementsByName('input-text');
// const inputTextObject = inputTextObjects[0];

// const inputTextObject = document.getElementsByName('input-text')[0];
// inputTextObject.value = nameText;

// const inputHiddens = queryString.getAll('input-hidden');
// const inputHidden = inputHiddens[0];

// inputTextObject.focus();
// inputTextObject.blur();

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


const itemsUpdate = function(key) {
  const itemNameObject = document.getElementsByName('item-name')[0];
  itemNameObject.value = items[key].name;
  const itemEnterObject = document.getElementsByName('item-enter')[0];
  itemEnterObject.value = items[key].enter;
  const itemExpireObject = document.getElementsByName('item-expire')[0];
  itemExpireObject.value = items[key].expire;
  // const url = 'https://red-js-default-rtdb.firebaseio.com/items/' + object.key + '.json';
  // const item = {
  //   expire: object.value
  // };
  // axios.patch(url, item).then(itemsRead);
};

itemsRead();
