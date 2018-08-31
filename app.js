// Budget Controller
const budgetController = (() => {

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: (type, des, val) => {

      let id, newItem;

      // create new ID
      if(data.allItems[type].length === 0){
        id = 0
      }else{
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }

      // create new item base on 'exp' or 'inc'
      if(type === 'inc'){
        newItem = new Income(id, des, val);
      }else{
        newItem = new Expense(id, des, val);
      }

      // push into the data structure
      data.allItems[type].push(newItem);

      return newItem;
    },
    testing: () => console.log(data)
  }
})();

// UI Controller
const UIController = (() => {
  const DOMstring = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addButton: '.add__btn',
    incomeList: '.income__list',
    expenseList: '.expenses__list'
  }

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDescription).value,
        value: document.querySelector(DOMstring.inputValue).value
      }
    },
    addListItem: (obj, type) => {
      let html = '';
      let newHtml = null;
      let element = null;
      // create HTML string with placeholder text
      if(type === 'inc'){
        element = DOMstring.incomeList;
        html =`<div class="item clearfix" id="income-%id%">
          <div class="item__description">%description%</div>
          <div class="right clearfix">
            <div class="item__value">%value%</div>
            <div class="item__delete">
              <button class="item__delete--btn"><i class="icon ion-ios-close-circle-outline"></i></button>
            </div>
          </div>
        </div>`;
      }else if(type === 'exp'){
        element = DOMstring.expenseList;
        html =`<div class="item clearfix" id="expense-%id%">
          <div class="item__description">%description%</div>
          <div class="right clearfix">
            <div class="item__value">%value%</div>
            <div class="item__percentage">21%</div>
            <div class="item__delete">
              <button class="item__delete--btn"><i class="icon ion-ios-close-circle-outline"></i></button>
            </div>
          </div>
        </div>`
      }
      console.log(element);

      // replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    clearFields: () => {
      const fields = document.querySelectorAll(`${DOMstring.inputDescription},${DOMstring.inputValue}`);
      const fieldsArr = Array.from(fields);

      fieldsArr.forEach((current, index, array) => {
        current.value = '';
      })
    },
    getDomStrings: () => {
      return DOMstring;
    }
  }

})();

//  GLOBAL APP CONTROLLER
const controller = ((budgetCtrl, UICtrl) => {

  const setupEventListeners = () => {
    const DOM = UICtrl.getDomStrings();

    document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);

    // add when the return key is press
    document.addEventListener('keypress', (e) => {
      if(e.keyCode === 13 || e.which === 13){
        ctrlAddItem();
      }
    });
  }

  const ctrlAddItem = () => {
    // get field input data
    const input = UICtrl.getInput();

    //  add item to the budget controller
    const newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // add the item to UI
    UICtrl.addListItem(newItem, input.type);
    UICtrl.clearFields();
    // calculate the budget

    // display budget on the UI
  }

  return{
    init: () => {
      console.log('app has init...');
      setupEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();