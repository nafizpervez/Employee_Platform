import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import * as XLSX from 'xlsx';

function App() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  //onChange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  //submit states
  const [excelData, setExcelData] = useState(null);

  //onChange Event
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv']
    let selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {

        setFile(selectedFile);
        setError(null);

        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        }
      }
      else {
        setTypeError('Please Select Only Excel File Types');
        setExcelFile(null);
      }
    }
    else {
      console.log('Please Select Your File');
    }
  }

  //submit event
  const handleFileSubmit = async (event) => {
    event.preventDefault();
    if (excelFile !== null) {
      const workBook = XLSX.read(excelFile, { type: 'buffer' });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      setExcelData(data.slice(0, 50));

      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch('http://localhost:8000/upload_data', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to upload file');
          }

          const responseData = await response.json();
          console.log(responseData.message); // You can handle the response message here

        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        setError('Please select a file');
      }


    }
  }


  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Employee Platform
        </p>
      </header>

      <div className='container'>

        <div className='my-3' />

        <div className='wrapper'>

          <form className='form-group custom-form' onSubmit={handleFileSubmit}>
            <input type='file' className='form-control mr-3' style={{ padding: '5px' }} required onChange={handleFile} />
            <div className='my-3' />
            <div class="d-grid gap-2 col-4 mx-auto">
              <button type='submit' className='btn btn-success'>UPLOAD</button>
              {typeError && (
                <div className='alert alert-danger' role='alert'>{typeError}</div>
              )}
            </div>
          </form>

          <div className='my-4' />

          <div className='preview'>
            {excelData ? (
              <div className='table-responsive'>
                <table className='table'>

                  <thead>
                    <tr>
                      {Object.keys(excelData[0]).map((key) => (
                        <th key={key}>
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {excelData.map((individualExcelData, index) => (
                      <tr key={index}>
                        {Object.keys(individualExcelData).map((key) => (
                          <td key={key}>
                            {individualExcelData[key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No File Uploaded!</div>
            )}
          </div>
        </div>
      </div>
    </div >

  );
}

export default App;
