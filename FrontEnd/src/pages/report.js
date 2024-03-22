import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import html2pdf from 'html2pdf.js';

function Report() {
    const [data, setData] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 14;

    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/data_stored`);
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

    const downloadTableData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/data_stored`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();

            const tableContent = jsonData
                .filter(row => row.id.toString().includes(searchId))
                .map((row) => (
                    `<tr key=${row.id}>
                        <td>${row.month}</td>
                        <td>${row.date}</td>
                        <td>${row.day}</td>
                        <td>${row.id}</td>
                        <td>${row.name}</td>
                        <td>${row.department}</td>
                        <td>${row.in_time}</td>
                        <td>${row.out_time}</td>
                        <td>${row.work_hour}</td>
                    </tr>`
                ))
                .join('');

            const htmlContent = `
                <table id="table" class="table table-bordered">
                    <thead class="table-dark">
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
                    <tbody>
                        ${tableContent}
                    </tbody>
                </table>
            `;

            html2pdf().from(htmlContent).save('table_data.pdf');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="container">
                <div className="card p-2 d-grid gap-2 my-4">
                    <input
                        type="text"
                        placeholder="Search by ID"
                        value={searchId}
                        onChange={handleSearchIdChange}
                    />
                </div>
                <button className="btn btn-primary mb-3" onClick={downloadTableData}>Download All Table Data</button>
                <table className="table table-bordered">
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
                    <tbody>
                        {data
                            .filter(row => row.id.toString().includes(searchId))
                            .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage)
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
                            ))
                        }
                    </tbody>
                </table>
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
