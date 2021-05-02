const db_migration = require('../database/migration.js');
 
module.exports = app => {
    // db and its table creation routes 
    app.get("/create-db", db_migration.createDB); 
    app.get("/create-table-users", db_migration.createTableUsers);
    
    // app.get("/create-table-users", db_migration)

    app.get("/home", (req, res) => {
        res.render('index.html');
    });
}
