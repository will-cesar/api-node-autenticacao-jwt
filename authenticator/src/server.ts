import { app } from "./app";

// configuração para utilizar a porta em prod ou 3000
const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

// comando para parar a execução do server quando a aplicação parar de rodar
process.on('SIGINT', () => {
    server.close();
    console.log('App finished');
})