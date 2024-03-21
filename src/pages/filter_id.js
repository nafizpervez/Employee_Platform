import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.svg';
import ReactPaginate from 'react-paginate';
import html2pdf from 'html2pdf.js';

function Report() {
    const [data, setData] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 10;
    const pagesVisited = pageNumber * itemsPerPage;

    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/data_stored?limit=${itemsPerPage}&offset=${pageNumber * itemsPerPage}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSearchIdChange = (event) => {
        setSearchId(event.target.value);
    };

    const downloadTableData = () => {
        const element = document.getElementById('table');
        html2pdf()
            .from(element)
            .save('table_data.pdf');
    };

    const displayData = data
        .filter(row => row.id.toString().includes(searchId))
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((row) => (
            <tr key={row.id}>
                <td>{row.month}</td>
                <td>{row.date}</td>
                <td>{row.day}</td>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.department}</td>
                <td>{row.in_time}</td>
                <td>{row.out_time}</td>
                <td>{row.work_hour}</td>
            </tr>
        ));

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Search ID Platform
                </p>
            </header>
            <div className="container">
                <div className="card p-2 d-grid gap-2 my-4">
                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search by ID"
                        value={searchId}
                        onChange={handleSearchIdChange}
                    />
                </div>
                <table id="table" className="table table-bordered">
                    {/* Table headers */}
                    <thead className="table-dark">
                        <tr>
                            <th>Month</th>
                            <th>Date</th>
                            <th>Day</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                            <th>Work Hour</th>
                        </tr>
                    </thead>
                    {/* Table data */}
                    <tbody>
                        {displayData}
                    </tbody>
                </table>
                {/* Download button */}
                <button className="btn btn-primary" onClick={downloadTableData}>Download Filtered Table Data</button>
                {/* Pagination */}
                <div className="d-flex justify-content-center mt-3">
                    <div className="p-1 text-center">
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={'pagination'}
                            previousLinkClassName={'page-link'}
                            nextLinkClassName={'page-link'}
                            disabledClassName={'disabled'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;
