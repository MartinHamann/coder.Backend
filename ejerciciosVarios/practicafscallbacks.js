const fs = require("fs");

const dateNow = new Date().toString();

fs.writeFile('./fechayhora.txt', dateNow, (error) =>{
    if(error) return console.log("Error al escribir el archivo");

    fs.readFile('./fechayhora.txt', 'utf-8', (error, resultado) =>{
        if(error) return console.log("Error al leer el archivo")
        return (console.log(resultado));
    })
})