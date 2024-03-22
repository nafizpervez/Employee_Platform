import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import logo from '../logo.svg';

function Report() {
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [inTime, setInTime] = useState('');
    const [outTime, setOutTime] = useState('');
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

    const handleInTimeChange = (event) => {
        setInTime(event.target.value);
    };

    const handleOutTimeChange = (event) => {
        setOutTime(event.target.value);
    };

    const handleColorChange = () => {
        const convertedInTime = convertToTime(inTime);
        const convertedOutTime = convertToTime(outTime);

        const tableRows = document.querySelectorAll('tbody tr');

        tableRows.forEach(row => {
            const rowInTime = convertToTime(row.cells[6].textContent);
            const rowOutTime = convertToTime(row.cells[7].textContent);

            if (rowInTime > convertedInTime) {
                row.cells[6].style.backgroundColor = 'red';
            } else {
                row.cells[6].style.backgroundColor = '';
            }

            if (rowOutTime < convertedOutTime) {
                row.cells[7].style.backgroundColor = 'yellow';
            } else {
                row.cells[7].style.backgroundColor = '';
            }
        });
    };

    const convertToTime = (timeString) => {
        const timeArray = timeString.split(':');
        const hours = parseInt(timeArray[0]);
        const minutes = parseInt(timeArray[1]);
        return hours * 60 + minutes;
    };

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Time Validation Platform
                </p>
            </header>
            <div className="container">
                <div className="card p-2 d-grid gap-2 my-4">
                    <input
                        type="text"
                        placeholder="In Time (HH:MM)"
                        value={inTime}
                        onChange={handleInTimeChange}
                    />
                    <input
                        type="text"
                        placeholder="Out Time (HH:MM)"
                        value={outTime}
                        onChange={handleOutTimeChange}
                    />
                    <button className="btn btn-primary" onClick={handleColorChange}>Validate</button>
                </div>
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