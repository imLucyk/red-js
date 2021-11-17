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

let groceries;

const groceriesCreate = function(form) {
  const groceryNameObject = form['grocery-name'];
  const grocery = {
    name: groceryNameObject.value,
    enter: moment().format('YYYY-MM-DD'),
    expire: moment().add(7, 'days').format('YYYY-MM-DD')
  };
  const successFunction = function() {
    groceryNameObject.value = '';
    groceriesRead();
  }
  axios.post('https://red-js-default-rtdb.firebaseio.com/groceries.json', grocery).then(successFunction);
};

const groceriesRead = function() {
  axios.get('https://red-js-default-rtdb.firebaseio.com/groceries.json').then(function(response) {
    // debugger
    groceries = response.data;
    const tagTbodyParent = document.getElementById('tag-tbody-parent');
    tagTbodyParent.innerHTML = '';
    const tagTrChild = document.getElementById('tag-tr-child');
    let index = 0;
    for (let key in groceries) {
      const newTrChild = tagTrChild.cloneNode(true);
      tagTbodyParent.appendChild(newTrChild);
      const groceriesNameObject = document.getElementsByName('groceries-name')[index];
      groceriesNameObject.innerHTML = groceries[key].name;
      const groceriesEnterObject = document.getElementsByName('groceries-enter')[index];
      groceriesEnterObject.innerHTML = groceries[key].enter;
      const groceriesExpireObject = document.getElementsByName('groceries-expire')[index];
      groceriesExpireObject.value = groceries[key].expire;
      groceriesExpireObject.key = key;
      const groceriesDeleteObject = document.getElementsByName('groceries-delete')[index];
      groceriesDeleteObject.key = key;
      index++;
    }
    console.log('Readed', groceries);
  })
};

const groceriesDelete = function(key) {
  const url = 'https://red-js-default-rtdb.firebaseio.com/groceries/' + key + '.json';
  axios.delete(url).then(groceriesRead);
};


const groceriesUpdate = function(object) {
  const url = 'https://red-js-default-rtdb.firebaseio.com/groceries/' + object.key + '.json';
  const grocery = {
    expire: object.value
  };
  axios.patch(url, grocery).then(groceriesRead);
};

groceriesRead();
