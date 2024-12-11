import dgram from 'dgram';
import { TEST_SERVER_OUT_HOST, TEST_SERVER_OUT_PORT, TEST_SERVER_IN_HOST, TEST_SERVER_IN_PORT, UDP_PORT, UDP_HOST } from '../shared/constants.js';

const serverOut = dgram.createSocket('udp4');
const serverIn = dgram.createSocket('udp4');

serverOut.on('message', (msg, rinfo) => {
    console.log(`ServerOut received: ${msg} from ${rinfo.address}:${rinfo.port}`);

    const responseMessage = Buffer.from('Hello, client!');
    serverOut.send(responseMessage, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error('Error sending response:', err);
        } else {
            console.log('Response sent to client');
        }
    });
});

serverOut.on('listening', () => {
    const address = serverOut.address();
    console.log(`ServerOut listening on ${address.address}:${address.port}`);
});

serverOut.bind(TEST_SERVER_OUT_PORT, TEST_SERVER_OUT_HOST);

serverOut.on('error', (err) => {
    console.error(`ServerOut error:\n${err.stack}`);
    serverOut.close();
});

process.on('SIGINT', () => {
    console.log('Closing serverOut...');
    serverOut.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

setTimeout(() => {
    const neiryParam1 = '1';
    const neiryParam2 = '9';

    const messageString = neiryParam1 + ' ' + neiryParam2;
    const message = Buffer.from(messageString);
    serverOut.send(message, UDP_PORT, UDP_HOST, (err) => {
        if (err) {
            console.error('Error sending response:', err);
        } else {
            console.log(`Message "${messageString}" sent to client ${UDP_HOST}:${UDP_PORT}`);
        }
    })
}, 10000)

serverIn.on('message', (msg, rinfo) => {
    console.log(`ServerIn received: ${msg} from ${rinfo.address}:${rinfo.port}`);

    const responseMessage = Buffer.from('Hello, client!');
    serverIn.send(responseMessage, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error('Error sending response:', err);
        } else {
            console.log('Response sent to client');
        }
    });
});

serverIn.on('listening', () => {
    const address = serverIn.address();
    console.log(`ServerIn listening on ${address.address}:${address.port}`);
});

serverIn.bind(TEST_SERVER_IN_PORT, TEST_SERVER_IN_HOST);

serverIn.on('error', (err) => {
    console.error(`ServerIn error:\n${err.stack}`);
    serverIn.close();
});

process.on('SIGINT', () => {
    console.log('Closing serverIn...');
    serverIn.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
