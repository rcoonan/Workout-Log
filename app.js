const Express = require("express");
const app = Express();
const controllers = require("./controllers");
const dbConnection = require("./db");

app.use(Express.json());

app.use("/workout", controllers.workoutController);
app.use("/username", controllers.usernameController);

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() =>{
    app.listen(3000, () =>{
        console.log(`[Server]: App is listening on 3000.`);
    });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });