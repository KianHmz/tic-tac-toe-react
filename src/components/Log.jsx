import { useState, useEffect } from 'react';

const LogItem = ({ message }) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000);
        return () => clearTimeout(timer); 
    }, []);

    if (!visible) return null;
    
    return <p className="animate-log">{message}</p>;
};

export default ({ logs }) => {
    return (
        <div className="game-log">
            {logs.map((log, index) => (
                <LogItem key={index} message={log} />
            ))}
        </div>
    );
};