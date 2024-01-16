import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import Crads from '../Component/Cards';
import AddExpenses from '../Component/Modals/AddExpenses';
import AddIncome from '../Component/Modals/AddIncome';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import moment from 'moment';
import TransactionTable from '../Component/TransactionTable';

const DashBoard = () => {
  const [user] = useAuthState(auth); // Assuming 'auth' is part of your firebase configuration
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);
  const[transaction,setTransction]=useState([]);
  const[income,setIncome]=useState(0);
  const[expense,setExpence]=useState(0);
  const[totalBalance,setTotalBalance]=useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIncomeModalVisible(true);
  };

  function handleExpenseCancel() {
    setIsExpenseModalVisible(false);
  }

  function handleIncomeCancel() {
    setIncomeModalVisible(false);
  }

  async function onFinish(values, types) {
    console.log("On Finish", values, types);

    const newTransaction = {
      type: types,
      date: moment(values.date).format("YYYY-MM-DD"), // Replace with the correct implementation of mockComponent
      name: values.name,
      tag:values.status,
      amount:values.amount,
    };
    addTransaction(newTransaction);
  }

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(collection(db, `user/${user.uid}/transaction`), transaction);
      console.log("Document written with ID", docRef.id);
      fetchTransactions();
      toast.success("Transaction Added");
    } catch (error) {
      console.error("Error adding document", error);
      toast.error("Failed To add the transaction")
    }
  }



  useEffect(() => {
   //get all the doc from transaction
   fetchTransactions();
  }, [])
  
  async function fetchTransactions(){
    if(user){
      const q=query(collection(db,`user/${user.uid}/transaction`));
      const querySnapshot = await getDocs(q);
      let transactionArray=[];
      querySnapshot.forEach((doc)=>{
        transactionArray.push(doc.data());
      });
      setTransction(transactionArray);
      toast.success("Transaction fetched!")
      console.log(transactionArray);
    }else{

    }
  }

  useEffect(() => {
    calculateBalance()
  }, [transaction])


  function calculateBalance() {
    let totalincome = 0;
    let totalexpense = 0;
    transaction.forEach((trans) => {
      if (trans.type === "Income") {
        totalincome += Number(trans.amount);
      } else {
        totalexpense += Number(trans.amount);
      }
    });
    console.log("Total Income:", totalincome);
    console.log("Total Expense:", totalexpense);
    setIncome(totalincome);
    setExpence(totalexpense);
    setTotalBalance(totalincome - totalexpense);
  }
  return (
    <div>
      <Header />
      <Crads
      income={income}
      expense={expense}
      totalBalance={totalBalance}
        showIncomeModal={showIncomeModal}
        showExpenseModal={showExpenseModal}
      />
      <AddIncome handleIncomeCancel={handleIncomeCancel} isIncomeModalVisible={isIncomeModalVisible} onFinish={onFinish} />
      <AddExpenses handleExpenseCancel={handleExpenseCancel} isExpenseVisible={isExpenseModalVisible} onFinish={onFinish} />
    <TransactionTable transaction={transaction}/>
    </div>
  );
};

export default DashBoard;
