import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.svg';
import '../App.css';
export default function Home() {
    return (

        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Employee Platform
                </p>
            </header>
            <p>
                things to write
            </p>
        </div>
    )
}