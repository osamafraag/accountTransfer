import React, { useState } from 'react';
import { UpdateAccount, DeleteAccount } from '../APIs/AccountsAPIs';
import { Modal, Button } from 'react-bootstrap';

const AccountList = ({ accounts, meta, loading, fetchAccounts }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleUpdateAccount = (account) => {
    UpdateAccount(account.accountId,account)
      .then(response => {
        console.log(response);
        setShowModal(false);
        fetchAccounts(1,'');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteAccount = (accountId) => {
    DeleteAccount(accountId)
      .then(response => {
        console.log(response);
        setShowModal(false);
        fetchAccounts(1,'');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    fetchAccounts(1, searchQuery);
  };

  const handlePage = (page) => {
    setCurrentPage(page);
    fetchAccounts(page, searchQuery);
  };

  const handleShowModal = (account) => {
    setSelectedAccount(account);
    setShowModal(true);
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
                <Button variant="primary" onClick={() => handleShowModal(account)}>View</Button>
                <Button variant="danger" onClick={() => handleDeleteAccount(account.accountId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span> Page {currentPage} of {meta.totalPages} </span>
          <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === meta.totalPages}>Next</button>
        </div>
      )}
       <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ID: {selectedAccount && selectedAccount.accountId}</p>
          <p>Name: {selectedAccount && selectedAccount.name}</p>
          <p>Balance: {selectedAccount && selectedAccount.balance}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleUpdateAccount(selectedAccount)}>Update</Button>
          <Button variant="danger" onClick={() => handleDeleteAccount(selectedAccount.accountId)}>Delete</Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountList;