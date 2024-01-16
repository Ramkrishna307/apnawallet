import { Input, Select, Table } from 'antd';
import React, { useState } from 'react';

const TransactionTable = ({ transaction }) => {
    const[search,setSearch]=useState("");
    const[typeFilter,setTypeFilter]=useState("");
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
   

  let filterTransaction=transaction.filter((item)=>{
   return  item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
  })
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
          value: 'All',
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
        </div>
       <div> <Table dataSource={filterTransaction} columns={columns} /> </div>        
    </div>
   
  );
};

export default TransactionTable;
