import express from "express";

const PORT =  process.env.PORT || 3000;
const app = express();

export function start() {
    /* CORS Control */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language, Content-Type, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();

    });

    /* Define every route with callbacks */
    app.get("/", (req, res) => {res.send('<h1>[API] Listening on port ' + PORT + '!</h1>')});
    app.listen(PORT, function() {
        console.log('[API] Listening on port ' + PORT + '!');
    });
}