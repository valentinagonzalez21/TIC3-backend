import app from './app.js';
import { sequelize } from './database/database.js';
import './models/Artist.js'
import './models/Business.js'
import './models/Event.js'
import './models/Application.js'
import './models/Notification.js'
import './models/User.js'

const port = 3000;

async function main() {
    try {
        //await sequelize.authenticate(); // intento de conexión
        //console.log('Connection successful');
        await sequelize.sync({alter: true});
        app.listen(port, () => console.log("Backend running"));
    } catch (error) {
        console.error('Unable to connect:', error);
    }
}

main();