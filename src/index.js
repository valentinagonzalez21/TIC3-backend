import app from './app.js';
import { sequelize } from './database/database.js';

const port = 3000;

app.listen(port, () => console.log("Backend running"));

try {
    await sequelize.authenticate();
    console.log('Connection successful');
} catch(error){
    console.error('Unable to connect', error);
}