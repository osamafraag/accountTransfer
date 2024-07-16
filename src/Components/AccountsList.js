import React, { useState, useEffect } from 'react';
import { Accounts, GetAccount, UpdateAccount, DeleteAccount } from '../APIs/AccountsAPIs';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    Accounts()
     .then(response => {
        setAccounts(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <ul>
      {accounts.map(account => (
        <li key={account.accountId}>{account.name} - Balance: {account.balance}</li>
      ))}
    </ul>
  );
};

export default AccountList;