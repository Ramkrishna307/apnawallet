import { Input, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { parse, unparse } from "papaparse";
import './style.css'
const TransactionTable = ({
  transaction,
  addTransaction,
  fetchTransactions,
}) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  // let filterTransaction=transaction.filter((item)=>{
  //  return  item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
  // })
  let filterTransaction = transaction.filter((item) => {
    const nameIncludesSearch =
      item.name && item.name.toLowerCase().includes(search.toLowerCase());
    const typeIncludesFilter = item.type && item.type.includes(typeFilter);

    return nameIncludesSearch && typeIncludesFilter;
  });

  let sortedTransaction = filterTransaction.sort((a, b) => {
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
      fields: ["name", "type", "tag", "date", "amount"],
      data: transaction,
    });

    var data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var csvURL = window.URL.createObjectURL(data);

    // Declare tempLink variable
    var tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "transactions.csv");

    // Append tempLink to the document body
    document.body.appendChild(tempLink);

    // Trigger a click on the tempLink element
    tempLink.click();

    // Remove tempLink from the document body
    document.body.removeChild(tempLink);
  }

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
    <div className="list-view-container">
    
        <div className="input-container">
          <input
            className="input-tag"
            type="text"
            placeholder="Search your transaction..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            defaultValue={typeFilter || "All"}
            style={{ width: 120, marginLeft: 10 }}
            onChange={(value) => setTypeFilter(value)}
            allowClear
            options={[
              { value: "", label: "All" },
              { value: "expense", label: "Expense" },
              { value: "Income", label: "Income" },
            ]}
          />
        </div>

      
      

      <div className="table-container">
        <h2 className="table-heading">List Of All Transaction</h2>
     
       <div className="radio-parent">
          <div className="radio-container">
            <Radio.Group
              onChange={(e) => setSortKey(e.target.value)}
              defaultValue=""
            >
              <Radio.Button value="">No sort</Radio.Button>
              <Radio.Button value="date">Sort by Date</Radio.Button>
              <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>
          </div>

          <div className="file-upload-container">
            <label htmlFor="csvFileInput" className="label">
              Choose CSV File:
            </label>
            <input
              type="file"
              id="csvFileInput"
              accept=".csv"
              onChange={importCSV}
              className="file-input"
            />
            <button
              className="import-button"
              onClick={() => document.getElementById("csvFileInput").click()}
            >
              Import CSV
            </button>
            <button className="export-button" onClick={exportCSV}>
              Export CSV
            </button>
          </div>
        </div>
        <Table dataSource={sortedTransaction} columns={columns} />
      </div>
    </div>
  );
};

export default TransactionTable;
