import React, { useState,useEffect } from 'react';
import { GetAccount, DeleteAccount } from '../APIs/AccountsAPIs';
import { Modal, Button , Table} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountData = ({ fetchAccounts , accountId, setShowModal, showModal}) => {

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

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
    setShowConfirm(true); 
  };

  const handleConfirmDelete = () => {
    DeleteAccount(accountId)
      .then(response => {
        console.log(response);
        setShowModal(false);
        fetchAccounts(1, '');
        toast.success("Deleted successfully !", {
          position: "top-right",
        });
      })
      .catch(error => {
        console.error(error);
      });
    setShowConfirm(false); 
  };

  const handleCancelDelete = () => {
    setShowConfirm(false); 
  };

  return (
    <>
    <ToastContainer/>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Account Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="mb-3">Account Information</h2>
        <p className="mb-1">ID: {selectedAccount && selectedAccount.accountId}</p>
        <p className="mb-1">Name: {selectedAccount && selectedAccount.name}</p>
        <p className="mb-1">Balance: {selectedAccount && selectedAccount.balance}</p>
        <hr className="my-4" />
        <h2 className="mb-3">Transaction History</h2>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th scope="col" className="text-nowrap">ID</th>
              <th scope="col" className="text-nowrap">Amount</th>
              <th scope="col" className="text-nowrap">Date</th>
              <th scope="col" className="text-nowrap">From Account</th>
              <th scope="col" className="text-nowrap">To Account</th>
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
        <hr className="my-4" />
        <h2 className="mb-3">Received Transaction History</h2>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th scope="col" className="text-nowrap">ID</th>
              <th scope="col" className="text-nowrap">Amount</th>
              <th scope="col" className="text-nowrap">Date</th>
              <th scope="col" className="text-nowrap">From Account</th>
              <th scope="col" className="text-nowrap">To Account</th>
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
    <Modal show={showConfirm} onHide={handleCancelDelete}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure you want to delete this account?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
      <Button variant="secondary" onClick={handleCancelDelete}>Cancel</Button>
    </Modal.Footer>
    </Modal></>
  );
};

export default AccountData;