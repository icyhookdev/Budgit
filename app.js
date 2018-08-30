// Budget Controller
const budgetController = (() => {

})();

// UI Controller
const UIController = (() => {
  const DOMstring = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addButton: '.add__btn'
  }

  return {
    getInput: () => {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDescription).value,
        value: document.querySelector(DOMstring.inputValue).value
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
  }

  const ctrlAddItem = () => {
    // get field input data
      const input = UICtrl.getInput();

    //  add item to the budget controller

    // add the item to UI

    // calculate the budget

    // display budget on the UI
  }

  return{
    init: () => {
      console.log('app has init');
      setupEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();