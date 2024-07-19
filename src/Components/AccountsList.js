import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AccountData from './AccountData';

const AccountList = ({ accounts, meta, loading, fetchAccounts }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    fetchAccounts(1, searchQuery);
  };

  const handlePage = (page) => {
    setCurrentPage(page);
    fetchAccounts(page, searchQuery);
  };

  const handleView = (accountId) => {
    setShowModal(true);
    setSelectedId(accountId);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountId}>
              <td>{account.accountId}</td>
              <td>{account.name}</td>
              <td>{account.balance}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(account.accountId)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? (
        <p>Loading...</p>
      ) : (
        meta? (
        <div>
          <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          
            <span>Page {currentPage} of {meta.totalPages}</span>
            <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === meta.totalPages}>
             Next
             </button>
        </div>
      ) : (
        <></>
       )
      )}
      <AccountData fetchAccounts={fetchAccounts} setShowModal={setShowModal} showModal={showModal} accountId = {selectedId}/>
    </div>
  );
};

export default AccountList;