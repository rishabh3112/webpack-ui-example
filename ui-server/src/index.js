import app from "./app";
export function startServer(...args) {
    process.stdout.write("[wui] Starting server... \n");
    app.listen(1234, () => {
        process.stdout.write("[wui] Running at http://localhost:1234/ \n");
    })
}