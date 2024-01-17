import { Input, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { parse, unparse } from 'papaparse';

const TransactionTable = ({ transaction,addTransaction, fetchTransactions}) => {
    const[search,setSearch]=useState("");
    const[typeFilter,setTypeFilter]=useState("");
    const[sortKey,setSortKey]=useState("")
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];
   

  // let filterTransaction=transaction.filter((item)=>{
  //  return  item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
  // })
  let filterTransaction = transaction.filter((item) => {
    const nameIncludesSearch = item.name && item.name.toLowerCase().includes(search.toLowerCase());
    const typeIncludesFilter = item.type && item.type.includes(typeFilter);
  
    return nameIncludesSearch && typeIncludesFilter;
  });

  let sortedTransaction= filterTransaction.sort((a, b) => {
    console.log("Enter");
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      console.log("Else only");
      return 0;
      
    }
  });

  function exportCSV() {
    // Specifying fields and data explicitly
    var csv = unparse({
      "fields": ["name", "type", "tag", "date", "amount"],
      data:transaction
    });
  
    var data = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var csvURL = window.URL.createObjectURL(data);
  
    // Declare tempLink variable
    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'transactions.csv');
  
    // Append tempLink to the document body
    document.body.appendChild(tempLink);
  
    // Trigger a click on the tempLink element
    tempLink.click();
  
    // Remove tempLink from the document body
    document.body.removeChild(tempLink);
  }
  
  // function importCSV(event) {
  //   event.preventDefault();
  //   try {
  //     parse(event.target.files[0], {
  //       header: true,
  //       complete: async function (results) {
  //         console.log(results);
  //         // Now results.data is an array of objects representing your CSV rows
  
  //         for (const transaction of results.data) {
  //           // write each transaction to Firebase, you can use the addTransaction function here
  //           console.log("Transaction", transaction);
  //           const newTransaction = {
  //             ...transaction,
  //             amount: parseInt(transaction.amount),
  //           };
  //           await addTransaction(newTransaction, true);
  //         }
  //       },
  //     });
  //     event.target.files = null; // Fixing typo here, use event.target.files instead of event.target.files(null)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  function importCSV(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          console.log(results);
          // Now results.data is an array of objects representing your CSV rows
  
          for (const transaction of results.data) {
            // write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transaction>>>", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      // Remove the line below
      // event.target.files = null;
    } catch (e) {
      console.log(e);
    }
  }
  
  
  
  return (
   
    <div>
        <div>
            <input type='text' placeholder='search your transaction..' onChange={(e)=>{setSearch(e.target.value)}}></input>
     <Select
       defaultOpen={typeFilter || "All"}
      style={{
        width: 120,
      }}

      onChange={(value) => { setTypeFilter(value); }}
      allowClear
      options={[
        {
          value: '',
          label: 'All',
        },
        {
          value: 'expense',
          label: 'Expense',
        },
        {
          value: 'Income',
          label: "Income",
        },
      
      ]}
    />

    <div><div>
      <Radio.Group onChange={(e)=>{setSortKey(e.target.value)}} defaultValue="">
      <Radio.Button value="">No sort</Radio.Button>
      <Radio.Button value="date">Sort by Date</Radio.Button>
      <Radio.Button value="amount">Sort by Amount</Radio.Button>
    
    </Radio.Group>
    </div>
    
    <div>
  <label htmlFor="csvFileInput">Choose CSV File:</label>
  <input
    type="file"
    id="csvFileInput"
    accept=".csv"
    onChange={importCSV}
    style={{ display: 'none' }}
  />
  <button onClick={() => document.getElementById('csvFileInput').click()}>Import CSV</button>
  <button onClick={exportCSV}>Export CSV</button>
</div>

    
    
    </div>
    
        </div>
       <div> <Table dataSource={sortedTransaction} columns={columns} /> </div>        
    </div>
   
  );
};

export default TransactionTable;
