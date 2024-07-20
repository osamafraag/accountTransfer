import React, { useState } from 'react';
import { Import} from '../APIs/ImportAPIs';
import { Button } from 'react-bootstrap';


export default function ImportAccounts() {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
        setSuccess('Accounts imported successfully!');
        setError(null)
      })
     .catch((error) => {
        console.error(error);
        setImporting(false);
        setError(error.response.data.error)
        setSuccess(null)
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center" style={{ maxWidth: '300px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}>
        <input type="file" onChange={handleFileChange} className="form-control form-control-sm mb-2" />
        <Button variant="primary" onClick={handleImport} disabled={importing} block size="sm">
          {importing ? 'Importing...' : 'Import Accounts '}
        </Button>
        {success && (
          <div className="alert alert-success mt-2" role="alert">
            {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-2" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}