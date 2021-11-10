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
  const groceryAgeObject = form['grocery-age'];
  const grocery = {
    name: groceryNameObject.value,
    age: groceryAgeObject.value
  };
  const successFunction = function() {
    groceryNameObject.value = '';
    groceryAgeObject.value = '';
    groceriesRead();
  }
  axios.post('http://localhost:3100/api/v1/groceries', grocery).then(successFunction);
};

const groceriesRead = function() {
  axios.get('http://localhost:3100/api/v1/groceries').then(function(response) {
    const groceriesLogical = response.data;
    groceries = groceriesLogical.groceries;
    const tagDivParent = document.getElementById('tag-div-parent');
    tagDivParent.innerHTML = '';
    const tagDivChild = document.getElementById('tag-div-child');
    for (let index in groceries) {
      const newDivChild = tagDivChild.cloneNode(true);
      tagDivParent.appendChild(newDivChild);
      const groceriesNameObject = document.getElementsByName('groceries-name')[index];
      const groceriesAgeObject = document.getElementsByName('groceries-age')[index];
      const groceriesUpdateObject = document.getElementsByName('groceries-update')[index];
      const groceriesDeleteObject = document.getElementsByName('groceries-delete')[index];
      groceriesNameObject.value = groceries[index].name;
      groceriesAgeObject.value = groceries[index].age;
      groceriesUpdateObject.index = index;
      groceriesDeleteObject.index = index;
    }
    console.log('Readed', groceries);
  })
};

const groceriesDelete = function(index) {
  const url = 'http://localhost:3100/api/v1/groceries/' + index;
  axios.delete(url).then(groceriesRead);
};


const groceriesUpdate = function(index) {
  const url = 'http://localhost:3100/api/v1/groceries/' + index;
  const name = document.getElementsByName('groceries-name')[index].value;
  const age = document.getElementsByName('groceries-age')[index].value;
  const grocery = {
    name: name,
    age: age
  };
  axios.patch(url, grocery).then(groceriesRead);
};

// groceriesRead();
