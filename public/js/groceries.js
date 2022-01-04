const queryString = new URLSearchParams(window.location.search);
const nameText = queryString.get('input-text') || '';
const orderByName = queryString.get('orderByName') || 'name';
const orderByType = queryString.get('orderByType') || 'asc';
document.getElementById(orderByName + '-' + orderByType).classList.add('active');

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
  const promises = []
  promises[0] = new Promise(function(resolve, reject) {
    axios.get('https://red-js-default-rtdb.firebaseio.com/groceries.json').then(function(response) {
      resolve(response.data);
    }).catch(function(error) {
      reject(error);
    })
  })
  promises[1] = new Promise(function(resolve, reject) {
    axios.get('https://red-js-default-rtdb.firebaseio.com/items.json').then(function(response) {
      resolve(response.data);
    }).catch(function(error) {
      reject(error);
    })
  })
  Promise.all(promises).then(function(result) {
    console.log(result);
    groceries = result[0];
    const items = result[1];
    const tagTbodyParent = document.getElementById('tag-tbody-parent');
    tagTbodyParent.innerHTML = '';
    const tagTrChild = document.getElementById('tag-tr-child');
    for (let key in groceries) {
      groceries[key].key = key
    }
    let _groceries = _.orderBy(groceries, orderByName, orderByType);
    for (let index in _groceries) {
      const newTrChild = tagTrChild.cloneNode(true);
      tagTbodyParent.appendChild(newTrChild);
      const groceriesNameObject = document.getElementsByName('groceries-name')[index];
      groceriesNameObject.innerHTML = _groceries[index].name;
      const groceriesEnterObject = document.getElementsByName('groceries-enter')[index];
      groceriesEnterObject.innerHTML = _groceries[index].enter;
      const groceriesExpireObject = document.getElementsByName('groceries-expire')[index];
      groceriesExpireObject.value = _groceries[index].expire;
      groceriesExpireObject.key = _groceries[index].key;
      const groceriesDeleteObject = document.getElementsByName('groceries-delete')[index];
      groceriesDeleteObject.key = _groceries[index].key;
      const groceriesBoxObject = document.getElementsByName('groceries-checkbox')[index];
      groceriesBoxObject.key = _groceries[index].key;
      groceriesBoxObject.checked = items[_groceries[index].key] ? true : false;
      // console.log(_groceries[index].key)
      // console.log(items[_groceries[index].key])
      index++;
    }
    console.log('Readed', _groceries);
  }).catch(function(error) {
    console.error(error);
  })  
};

const groceriesDelete = function(key) {
  const url = 'https://red-js-default-rtdb.firebaseio.com/groceries/' + key + '.json';
  axios.delete(url).then(groceriesRead);
};
const itemsInOut = function(object) {
  console.log(object.checked)
  // console.log(object.key)
  // console.log(groceries)
  // console.log(groceries[object.key])

  const url = 'https://red-js-default-rtdb.firebaseio.com/items/' + object.key + '.json';
  if (object.checked) {
    const grocery = groceries[object.key];
    axios.patch(url, grocery);
  } else {
    axios.delete(url);
  }
};

const groceriesUpdate = function(object) {
  const url = 'https://red-js-default-rtdb.firebaseio.com/groceries/' + object.key + '.json';
  const grocery = {
    expire: object.value
  };
  axios.patch(url, grocery).then(groceriesRead);
};

groceriesRead();
