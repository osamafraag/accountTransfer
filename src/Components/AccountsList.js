import React, { useState, useEffect } from 'react';
import { Accounts, GetAccount, UpdateAccount, DeleteAccount } from '../APIs/AccountsAPIs';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, [currentPage,searchQuery]);

  const fetchAccounts = async () => {
    setLoading(true);
    Accounts(currentPage,searchQuery)
     .then(response => {
        const { data, meta } = response.data;
        setAccounts(data);
        setTotalPages(meta.totalPages);
        setTotalItems(meta.totalItems);
        setLoading(false);
      })
     .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <input type="search" value={searchQuery} onChange={handleSearch} placeholder="Search by name or id" />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountId}>
              <td>{account.accountId}</td>
              <td>{account.name}</td>
              <td>{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default AccountList;