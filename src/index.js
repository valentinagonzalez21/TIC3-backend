import app from './app.js';
import { sequelize } from './database/database.js';
import './models/UserArtist.js'
import './models/UserBussiness.js'
import './models/Profile.js'
import './models/Event.js'

const port = 3000;

async function main() {
    try {
        //await sequelize.authenticate(); // intento de conexión
        //console.log('Connection successful');
        await sequelize.sync({force: true});
        app.listen(port, () => console.log("Backend running"));
    } catch (error) {
        console.error('Unable to connect:', error);
    }
}

main();