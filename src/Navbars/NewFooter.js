import React from 'react'

export default function NewFooter() {
    return (
        <div className="container" style={{ position: 'relative', overflow: 'hidden', marginTop: 'auto', bottom: 0, display: 'flex', flexDirection:'column', minHeight: '100%' }}>
            <footer className="py-2 my-2" >
                <ul className="nav justify-content-center border-bottom pb-1 mb-1">
                    {/* <li className="nav-item"><a className="nav-link px-3 fw-normal">Home</a></li>
                    <li className="nav-item"><a className="nav-link px-3 fw-normal">Features</a></li>
                    <li className="nav-item"><a className="nav-link px-3 fw-normal">Pricing</a></li>
                    <li className="nav-item"><a className="nav-link px-3 fw-normal">FAQs</a></li>
                    <li className="nav-item"><a className="nav-link px-3 fw-normal">About</a></li> */}
                </ul>
                <p className="text-center fw-normal mt-2 mb-1">Maker Checker © 2023 Company, Pune</p>
            </footer>
        </div>
    )
}
