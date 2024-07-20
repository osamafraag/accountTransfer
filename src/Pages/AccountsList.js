import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AccountData from '../Components/AccountData';
import { Accounts } from '../APIs/AccountsAPIs';

const AccountList = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    <div className="container">
  <div className="row">
    <div className="col-md-6 offset-md-3">
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name or id"
        className="form-control mt-5 mb-3"
      />
    </div>
  </div>
  <div className="table-responsive">
    <table className="table table-striped table-bordered table-sm" style={{ tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th scope="col" style={{ width: '50%' }} className="text-center">ID</th>
          <th scope="col" style={{ width: '30%' }} className="text-center">Name</th>
          <th scope="col" style={{ width: '20%' }} className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.accountId}>
            <td className="text-center">{account.accountId}</td>
            <td className="text-center">{account.name}</td>
            <td className="text-center">
              <Button variant="primary" size="sm" onClick={() => handleView(account.accountId)}>View</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {loading ? (
    <p className="text-center">Loading...</p>
  ) : (
    meta ? (
      <nav aria-label="Page navigation" className="d-flex justify-content-center">
        <ul className="pagination mb-0">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">{`${currentPage} of ${meta.totalPages}`}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePage(currentPage + 1)}
              disabled={currentPage === meta.totalPages}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    ) : (
      <></>
    )
  )}
      <AccountData fetchAccounts={fetchAccounts} setShowModal={setShowModal} showModal={showModal} accountId = {selectedId}/>
    </div>
  );
};

export default AccountList;