import React, { useState } from 'react'
import Header from '../Component/Header'
import Crads from '../Component/Cards'
import AddExpenses from '../Component/Modals/AddExpenses';
import AddIncome from '../Component/Modals/AddIncome';

const DashBoard = () => {
  const [isExpenseModalVisible,setIsExpenseModalVisible]=useState(false);
  const[isIncomeModalVisible,setIncomeModalVisible]=useState(false);
  function onFinish(){
    
  }

  const showExpenseModal=()=>{
    setIsExpenseModalVisible(true);
  }
  const showIncomeModal=()=>{
      setIncomeModalVisible(true);
  }

  function handleExpenseCancel(){
    setIsExpenseModalVisible(false);
  }
  function handleIncomeCancel(){
    setIncomeModalVisible(false);
  }
  return (
    <div>
      <Header/>
      <Crads
       showIncomeModal={showIncomeModal}
      showExpenseModal={showExpenseModal}
     />
      <AddIncome handleIncomeCancel={handleIncomeCancel} isIncomeModalVisible={isIncomeModalVisible} onFinish={onFinish}/>
      <AddExpenses   handleExpenseCancel={handleExpenseCancel}   isExpenseVisible={isExpenseModalVisible} onFinish={onFinish}/>
      
    </div>
  )
}

export default DashBoard