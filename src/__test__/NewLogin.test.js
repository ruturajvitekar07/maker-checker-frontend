import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../LogIn/NewLogin'
import Swal from "sweetalert2";
import AppService from '../Service/AppService';
// import axios from 'axios'

jest.mock("axios");

describe('Login', () => {

    test('render login form with 1 button', () => {
        render(<Login />);

        const buttonList = screen.findAllByRole("button");
        console.log(buttonList);
        expect(buttonList).toHaveLength(1);
    })

    test('password input should have type password', ()=> {
        render(<Login />);
        
        const password = screen.getByPlaceholderText("Enter password");
        expect(password).toHaveAttribute("type","password")
    })

    // test('should display an error message when username is not provided', () => {
    //     render(<Login />);

    //     const username = '';
    //     const password = 'password';

    //     const username1 = screen.getByTestId('username');
    //     const password1 = screen.getByTestId('password');
    //     const loginButton = screen.getByRole('button', { name: 'Login' });

    //     fireEvent.change(username1, { target: { value: '' } });
    //     fireEvent.change(password1, { target: { value: 'ADMIN' } });
    //     fireEvent.click(loginButton);

    //     // const result = screen.getByText();
    //     // expect(result).toBeInTheDocument();
    //     expect(Swal.fire({
    //         icon: "warning",
    //         title: "Error!",
    //         text: "Please enter your username.",
    //         toast: true,
    //         position: "top-end",
    //         showConfirmButton: false,
    //         timer: 2000,
    //     })).toHaveBeenCalledWith();
    // });
});
