import { Card, Row } from 'antd'
import React from 'react'
import './style.css';
import Button from '../Button';
const  Crads = (   {showExpenseModal,
    showIncomeModal,income,expense,totalBalance}) => {
  return (
    <div className='card-container'>
        <Row className='my-row'>
            <Card className='my-card' title="Current Balance">
            <p>₹{totalBalance}</p>
            <Button text={"Reset Balance"} blue={"true"}/>
            </Card>
            <Card className='my-card' title="Total Income">
            <p>₹{income}</p>
            <Button text={"Add Balance"} blue={"true"} onClick={showIncomeModal}/>
            </Card>
            <Card className='my-card' title="Total Expenses">
            <p>₹{expense}</p>
            <Button text={"Add Expense"} blue={"true"} onClick={showExpenseModal}/>
            </Card>
        </Row>
       
    </div>
  )
}

export default  Crads