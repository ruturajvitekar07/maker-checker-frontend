import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';
import { useTracking } from 'react-tracking';
import Swal from 'sweetalert2';
import useAuth from '../LogIn/auth';
import AppService from '../Service/AppService';
import UserAppService from '../Service/UserAppService';

export default function IdleTimeout() {

    const navigate = useNavigate();
    const { trackEvent } = useTracking();
    const username = sessionStorage.getItem("username");
    const access_token = sessionStorage.getItem("access_token");
    const refresh_token = sessionStorage.getItem("refresh_token");
    const header = { headers: { "Authorization": `Bearer ${access_token}` } };
    const [isIdle, setIsIdle] = useState(false);
    const { isSwalOpen, setIsSwalOpen, isLoggedIn, setIsLoggedIn } = useAuth();

    // Define functions for handling token refresh and logout
    const handleTokenRefresh = () => {
        console.log("handleTokenRefresh called");
        // Call your API endpoint to get a new access token using the refresh token
        AppService.refreshToken(refresh_token)
            .then((response) => {
                if (response.status === 200) {
                    const access_token = response.data.access_token;
                    sessionStorage.setItem("access_token", access_token);
                    sessionStorage["access_token"] = access_token;
                    const refresh_token = response.data.refresh_token;
                    sessionStorage.setItem("refresh_token", refresh_token);
                    sessionStorage["refresh_token"] = refresh_token;
                    const expires_in = response.data.expires_in;
                    sessionStorage.setItem("expires_in", expires_in);
                    sessionStorage["expires_in"] = expires_in;
                } else {
                    // If Refresh token failed, redirect to login page
                    sessionStorage.clear();
                    navigate("/login");
                }
            })
    }

    // Define the idle timeout duration in milliseconds
    const timeout = 1000 * 60 * 5; // 15 minutes

    // Set up the idle timer using the useIdleTimer hook
    const { getRemainingTime, reset } = useIdleTimer({
        timeout,
        onIdle: () => setIsIdle(true),
        onActive: () => setIsIdle(false),
        debounce: 500
    });

    // Define the function to handle the Stay button click
    const handleStay = () => {
        console.log("handleStay called");
        reset();
        handleTokenRefresh();
        setIsIdle(false);
    }

    // Define the function to handle the Logout button click
    const handleLogoutClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out and redirected to the login page.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            } else {
                reset();
                setIsIdle(false);
                handleStay();
            }
        });
    }

    // Check if the user is idle and display the SweetAlert2 popup if true
    useEffect(() => {
        if (isIdle) {
            Swal.fire({
                title: 'You are idle',
                text: 'Do you want to continue your session?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Stay',
                cancelButtonText: 'Logout'
            }).then((result) => {
                if (result.isConfirmed) {
                    handleStay();
                } else {
                    handleLogoutClick();
                }
            });
        }
    }, [isIdle]);

    const handleLogout = () => {
        trackEvent({
            component: "User",
            event: "Clicked on logout button",
            user: username,
            time: new Date().toLocaleString(),
            status: "Success"
        });
        UserAppService.signoff(header);
        setIsLoggedIn(false);
        console.log('User has been logged out');
        reset();
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login')
    };

}
