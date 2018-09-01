// Budget Controller
const budgetController = (() => {

  const calculateTotal = (type) => {
    let sum = 0;

    data.allItems[type].forEach((cur) => {
      sum += cur.value
    })

    data.totals[type] = sum;
  }

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    procentage: -1
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
    calculateBudget: () => {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that we spent
      if(data.totals.inc > 0) {
        data.procentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      }

    },
    deleteItem: (type, id) => {
      const ids = data.allItems[type].map((current) => {
        return current.id;
      });

      const index = ids.indexOf(id);

      if(index !== -1){
        data.allItems[type].splice(index, 1);
      }
    },
    getBudget: () => {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        procentage: data.procentage
      }
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
    expenseList: '.expenses__list',
    budgetValue: '.budget__value',
    totalInc: '.budget__income--value',
    totalExp: '.budget__expenses--value',
    expPorcentage: '.budget__expenses--percentage',
    container: '.container '
  }

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstring.inputValue).value)
      }
    },
    addListItem: (obj, type) => {
      let html = '';
      let newHtml = null;
      let element = null;
      // create HTML string with placeholder text
      if(type === 'inc'){
        element = DOMstring.incomeList;
        html =`<div class="item clearfix" id="inc-%id%">
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
        html =`<div class="item clearfix" id="exp-%id%">
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
    deleteListItem: (id) => {
      const el = document.getElementById(id);
      el.remove();
    },
    clearFields: () => {
      const fields = document.querySelectorAll(`${DOMstring.inputDescription},${DOMstring.inputValue}`);
      const fieldsArr = Array.from(fields);

      fieldsArr.forEach((current, index, array) => current.value = '');

      fieldsArr[0].focus();
    },
    displayBudget: (obj) => {
      document.querySelector(DOMstring.budgetValue).textContent = obj.budget;
      document.querySelector(DOMstring.totalInc).textContent = `+ ${obj.totalInc}`;
      document.querySelector(DOMstring.totalExp).textContent = `- ${obj.totalExp}`;

      if(obj.procentage > 0){
        document.querySelector(DOMstring.expPorcentage).textContent = `${obj.procentage}%`;
      }else{
        document.querySelector(DOMstring.expPorcentage).textContent = '---';
      }
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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  }

  const udpateBudget = () => {
    // calculate the budget
    budgetCtrl.calculateBudget();

    //  return the budget
    const budget = budgetCtrl.getBudget();

    // display budget on the UI
    UICtrl.displayBudget(budget);
  }

  const ctrlAddItem = () => {
    // get field input data
    const input = UICtrl.getInput();

    let newItem;

    if(input.description !== '' && !isNaN(input.value) && input.value > 0){
      //  add item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // add the item to UI
      UICtrl.addListItem(newItem, input.type);

      // clear fields
      UICtrl.clearFields();

      udpateBudget();
    }

  }

  const ctrlDeleteItem = (e) => {
    const itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
    let splitID, type, id;
    if(itemId){

      splitID = itemId.split('-');
      type = splitID[0];
      id = parseInt(splitID[1]);

      // delete the item from the data structure
      budgetCtrl.deleteItem(type, id);

      // delete the item from the UI
      UICtrl.deleteListItem(itemId);

      // re-render display items
      udpateBudget();
    }

  }

  return{
    init: () => {
      console.log('app has init...');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        procentage: -1
      })
      setupEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();