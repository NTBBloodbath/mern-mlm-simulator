import app from './app';
import config from './config';

app.listen(config.serverPort, () => {
    console.log(`Running server on http://localhost:${config.serverPort}`);
}).on('error', (err: Error) => {
    console.error('Something went wrong while initializing the server:');
    throw err;
});
