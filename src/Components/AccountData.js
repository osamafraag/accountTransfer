import React, { useState,useEffect } from 'react';
import { GetAccount, DeleteAccount } from '../APIs/AccountsAPIs';
import { Modal, Button , Table} from 'react-bootstrap';

const AccountData = ({ fetchAccounts , accountId, setShowModal, showModal}) => {

  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchAccount();
  }, [accountId]);

  const fetchAccount = async () => {
    GetAccount(accountId)
     .then(response => {
        setSelectedAccount(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }

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


  return (
    <>
       <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h2>Account Information</h2>
          <p>ID: {selectedAccount && selectedAccount.accountId}</p>
          <p>Name: {selectedAccount && selectedAccount.name}</p>
          <p>Balance: {selectedAccount && selectedAccount.balance}</p>

          <h2>Transaction History</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>From Account</th>
                <th>To Account</th>
              </tr>
            </thead>
            <tbody>
              {selectedAccount &&
                selectedAccount.fromHistory.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.id}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.fromAccount}</td>
                    <td>{transaction.toAccount}</td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <h2>Received Transaction History</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>From Account</th>
                <th>To Account</th>
              </tr>
            </thead>
            <tbody>
              {selectedAccount &&
                selectedAccount.toHistory.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.id}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.fromAccount}</td>
                    <td>{transaction.toAccount}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDeleteAccount(selectedAccount.accountId)}>Delete</Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      </>
  );
};

export default AccountData;