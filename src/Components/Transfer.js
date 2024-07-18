
import React, { useState, useEffect } from 'react';
import { Transfer } from '../APIs/TransferAPI';
import Select from 'react-select';
import { Accounts } from '../APIs/AccountsAPIs';
    


export default function TransferFund() {

    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchAccounts();
      }, []);
    
      const fetchAccounts = async () => {
        Accounts(null,null)
         .then(response => {
            const { data, meta } = response.data;
            setAccounts(data);
          })
         .catch(error => {
            console.error(error);
          });
      }

    const handleTransferFunds = () => {
        Transfer({"fromAccountId": fromAccount, "toAccountId": toAccount, "amount":amount})
            .then(response => {
                console.log(response.data);
                fetchAccounts();
            })
            .catch(error => {
                console.error(error);
            });
    };
    const filterAccounts = (accounts, searchTerm) => {
        return accounts.filter(account => {
          return account.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };
    
    const accountOptions = filterAccounts(accounts, searchTerm).map(account => {
        return { value: account.accountId, label: account.name };
    });
    return (
      <div>
        <h2>Transfer Funds</h2>
            <form>
                <label>From Account Number:</label>
                <Select
                    value={fromAccount}
                    onChange={setFromAccount}
                    options={accountOptions}
                    onInputChange={searchTerm => setSearchTerm(searchTerm)}
                    placeholder="Search for account number"
                />
                <br />
                <label>To Account Number:</label>
                <Select
                    value={toAccount}
                    onChange={setToAccount}
                    options={accountOptions}
                    onInputChange={searchTerm => setSearchTerm(searchTerm)}
                    placeholder="Search for account number"
                />
                <br />
                <label>Amount:</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                <br />
                <button onClick={handleTransferFunds}>Transfer Funds</button>
            </form>
      </div>    
    )
}