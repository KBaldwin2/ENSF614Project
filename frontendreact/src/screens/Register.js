import Paymentinfo from '../components/Paymentinfo';
import { useState } from 'react';
import Backdrop from '../components/Backdrop';
import Homepage from '../screens/Homepage'

function Register(props) {

    function cancelHandler() {
        window.location.pathway = '/';
        window.location.href = window.location.pathway;

    }

    function confirmHandler(evt) {
        //grab data from form and save as variables to send to server
        evt.preventDefault();
        let registerForm = document.getElementById('registerForm');
        //post all information to server
        window.location.pathway = '/';
        window.location.href = window.location.pathway;
    }

    return (
    <div>
        <div className = "modal">
        <h3>
            Please Enter Information to Register:
        </h3>
        <br></br>
        <form id="registerForm">
            <div>
            <label for="name">Enter your name: </label>
            <input type="text" id="name" name="name" required></input>
            </div><br></br>
            <div>
            <label for="email">Enter your email: </label>
            <input type="text" id="email" name="email" required></input>
            </div><br></br>
            <div>
            <label for="address">Enter your address: </label>
            <input type="text" id="address" name="address" required></input>
            </div><br></br>
            <div>
                <Paymentinfo />
            </div>
            <div><br></br>
            <label for="password">Choose a password: </label>
            <input type="text" id="password" name="password" required></input>
            </div><br></br>
            <scan>
            <button className='btn' onClick={confirmHandler} type="submit">Confirm</button>
            <button className='btn btn--alt' onClick={cancelHandler}>Return to Home</button>        
        </scan>
        </form><br></br>
        </div>
        <div>
            <Backdrop />
            <Homepage zindex="-30"/>
        </div>
    </div>

    );
}

export default Register;