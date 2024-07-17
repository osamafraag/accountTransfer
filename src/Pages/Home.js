import React, { useState, useEffect } from 'react';
import AccountList from '../Components/AccountsList';
import ImportAccounts from '../Components/ImportAccounts';
import { Accounts } from '../APIs/AccountsAPIs';

function Home() {

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [meta, setMeta] = useState([]);

  useEffect(() => {
    fetchAccounts(1,'');
  }, []);

  const fetchAccounts = async (currentPage, searchQuery) => {
    setLoading(true);
    Accounts(currentPage,searchQuery)
     .then(response => {
        const { data, meta } = response.data;
        setAccounts(data);
        setMeta(meta);
        setLoading(false);
      })
     .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }
  return (
    <div>
      <h1>Account App</h1>
      <AccountList accounts={accounts} meta={meta} loading={loading} fetchAccounts={fetchAccounts}/>
      <ImportAccounts fetchAccounts={fetchAccounts}/>
    </div>
  );
}

export default Home;
