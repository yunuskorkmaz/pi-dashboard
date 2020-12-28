import React, { useEffect } from 'react';
import socketClient from 'socket.io-client';

const Main = () => {
    
    useEffect(() => {
        const socket = socketClient('http://localhost:5000');

        socket.on('connect',data => {
            console.log(data, 'asdsad');
        })
    }, [])

    return (
        <>

        </>
    )
}

export default Main;