import React, { useState, useEffect } from 'react';
import { Import} from '../APIs/ImportAPIs';
import { Button } from 'react-bootstrap';

export default function ImportAccounts({ fetchAccounts }) {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImport = () => {
    setImporting(true);
    const formData = new FormData();
    formData.append('file', file);

    Import(formData)
     .then((response) => {
        console.log(response);
        setImporting(false);
        fetchAccounts(1,'');
      })
     .catch((error) => {
        console.error(error);
        setImporting(false);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button variant="primary" onClick={handleImport} disabled={importing}>
        {importing? 'Importing...' : 'Import Accounts from CSV'}
      </Button>
    </div>
  );
}