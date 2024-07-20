import React, { useState, useEffect } from 'react';
import { Transfer } from '../APIs/TransferAPI';
import Select from 'react-select';
import { Accounts } from '../APIs/AccountsAPIs';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    Accounts(null, null)
      .then(response => {
        const { data, meta } = response.data;
        setAccounts(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleTransferFunds = () => {
    Transfer({ "fromAccountId": fromAccount, "toAccountId": toAccount, "amount": amount })
      .then(response => {
        console.log(response.data);
        toast.success("Transfered successfully !", {
          position: "top-right",
        });
        fetchAccounts();
      })
      .catch(error => {
        console.error(error.response.data.data);
        toast.error(error.response.data.error, {
          position: "top-right",
        });
      });
  };

  const filterAccounts = (accounts, searchTerm) => {
    return accounts.filter(account => {
      return account.accountId.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const accountOptions = filterAccounts(accounts, searchTerm).map(account => {
    return { value: account.accountId, label: account.name };
  });

  return (
    <div className="container">
      <ToastContainer/>
      <h2 className="text-center mb-4" style={{ marginTop: 20 }}>Transfer Funds</h2>
      <Form style={{ maxWidth: 600, margin: 'auto' }}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fromAccount">
              <Form.Label>From Account Number:</Form.Label>
              <Select
                onChange={fromAccount => setFromAccount(fromAccount.value)}
                options={accountOptions}
                onInputChange={searchTerm => setSearchTerm(searchTerm)}
                placeholder="Search for account number"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="toAccount">
              <Form.Label>To Account Number:</Form.Label>
              <Select
                onChange={toAccount => setToAccount(toAccount.value)}
                options={accountOptions}
                onInputChange={searchTerm => setSearchTerm(searchTerm)}
                placeholder="Search for account number"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="amount">
              <Form.Label>Amount:</Form.Label>
              <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="primary" onClick={handleTransferFunds} style={{ marginTop: 20 }}>Transfer Funds</Button>
        </div>
      </Form>
    </div>
  )
}