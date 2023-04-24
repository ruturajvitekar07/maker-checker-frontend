import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuditLogging = () => {
    const [user, setUser] = useState({ name: 'Unknown' });
    const [log, setLog] = useState([]);

    const triggerAction = (actionType, actionOutcome) => {
        const timestamp = new Date().toLocaleString();
        console.log(`User : ${user.name}, ${actionType} : ${actionOutcome} at ${timestamp}`);
        const newLogEntry = { user: user.name, action: actionType, outcome: actionOutcome, timestamp };
        setLog(prevLog => [...prevLog, newLogEntry]);
    }

    // useEffect(() => {
    //     // send log data to server on component unmount
    //     return () => {
    //         axios.post('/api/logs', log, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //             .then(response => console.log(response))
    //             .catch(error => console.log(error));
    //     };
    // }, [log]);

    return [triggerAction, setUser];
};