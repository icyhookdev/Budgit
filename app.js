// Budget Controller
const budgetController = (() => {

})();

// UI Controller
const UIController = (() => {

})();

//  GLOBAL APP CONTROLLER
const controller = ((budgetCtrl, UICtrl) => {

  const ctrlAddItem = () => {

    // get field input data

    //  add item to the budget controller

    // add the item to UI

    // calculate the budget

    // display budget on the UI
    console.log('hi there');
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  // add when the return key is press
  document.addEventListener('keypress', (e) => {
    if(e.keyCode === 13 || e.which === 13){
      ctrlAddItem();
    }
  });

})(budgetController, UIController);