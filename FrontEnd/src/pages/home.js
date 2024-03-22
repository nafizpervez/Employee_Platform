import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.svg';
import '../App.css';
import { Carousel } from 'react-bootstrap';


export default function Home() {
    return (

        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    WELCOME
                </p>
                <div className='card container col-lg-7 col-xl-7'>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/images/image1.jpg" // Path to your local image
                                alt="First slide"
                            />
                            <h5 className="my-2">Assumptions and Next Step</h5>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/images/image2.jpg" // Path to your local image
                                alt="Second slide"
                            />
                            <h5 className="my-2">Workflow</h5>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/images/image3.jpg" // Path to your local image
                                alt="Third slide"
                            />
                            <h5 className="my-2">Framework and Libraries</h5>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </header>

        </div>
    )
}