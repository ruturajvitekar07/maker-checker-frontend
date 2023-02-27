import React, { useState } from 'react';
import User from '../User/User'
import Approver from '../User/Approver';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // perform login logic here
        if (username === 'developer' && password === 'password') {
            setRole('developer');
            setIsLoggedIn(true);
        } else if (username === 'associate' && password === 'password') {
            setRole('associate');
            setIsLoggedIn(true);
        } else {
            alert('Invalid username or password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRole('');
    };

    const renderFeatureComponent = () => {
        if (role === 'developer') {
            return <User />;
        } else if (role === 'associate') {
            return <Approver />;
        } else {
            return null;
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    {renderFeatureComponent()}
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                    <div className="container" style={{backgroundColor:'gray', height: '50%', width:'100%'}}>
                        <div className="container px-4 py-5" id="icon-grid">
                            <h2 className="pb-2 mt-4 border-bottom">Why choose us?</h2>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5 my-4">
                                <div className="col d-flex align-items-start">
                                    <div>
                                        <h4 className="fw-bold mb-0 mt-2">Featured title</h4>
                                        <p>
                                            Artists and art lovers from all across the globe can choose to
                                            sell and buy artworks on Gallerist
                                        </p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <div>
                                        <h4 className="fw-bold mb-0 mt-2">Featured title</h4>
                                        <p>
                                            A wide range and collection of paintings for you to explore,
                                            sell and buy
                                        </p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <div>
                                        <h4 className="fw-bold mb-0 mt-2">Featured title</h4>
                                        <p>
                                            We are a highly trusted and leading art platform where every
                                            artist and art lover is cherished
                                        </p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <div>
                                        <h4 className="fw-bold mb-0 mt-2">Featured title</h4>
                                        <p>
                                            Drawings, paintings, stencils, posters, handicrafts and more,
                                            we have a splendid range for you to get your hands on
                                        </p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <div>
                                        <h4 className="fw-bold mb-0 mt-2">Featured title</h4>
                                        <p>
                                            Different kinds of artworks on different types of materials
                                            and surfaces are available for you to choose from as our
                                            artists have the liberty to create whatever they feel the best
                                        </p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <div>
                                        <h4 className="fw-bold mb-0 mt-2">Featured title</h4>
                                        <p>
                                            Exceptional customer service and support in case you get stuck
                                            anywhere throughout the process
                                        </p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <div>
                                        <h4 className="fw-bold mb-0 mt-2">Featured title</h4>
                                        <p>
                                            A network of globally leading and acclaimed artists that
                                            contribute their masterpieces to our collection
                                        </p>
                                    </div>
                                </div>
                                <div className="col d-flex align-items-start">
                                    <div>
                                        <h4 className="fw-bold mb-0 mt-2">Featured title</h4>
                                        <p>
                                            Verified Artists on the platform can upload and send any
                                            number of paintings as they want
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

const UploadFeature = () => {
    return <h1>Upload Feature</h1>;
};

const ApprovalFeature = () => {
    return <h1>Approval Feature</h1>;
};

export default LoginPage;
