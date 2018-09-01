class Expense{
  constructor(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.porcentage = -1;
  }

  calcPercentage(totalIncome){
    if(totalIncome > 0){
      this.porcentage = Math.round((this.value / totalIncome) * 100);
    }else{
      this.porcentage = -1;
    }
  }

  getPercentage(){
    return this.porcentage;
  }
}