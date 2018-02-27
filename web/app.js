var app = require('express')(); //incluindo o framework express
var express = require('express');

app.use(express.static(__dirname + '/public'));

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
    res.sendFile("index.html");
})

var mySocket;

var serialport = require("serialport"); //incluindo o modulo de comunicação serial
var SerialPort = serialport.SerialPort; //instanciando o objeto serial port

var mySerial = new serialport("/dev/cu.usbmodem1411", {
    baudRate: 9600,
    parser: new serialport.parsers.Readline('\n')

}); //Comunicando com o arduino na porta "/dev/cu.usbmodem1411"

mySerial.on("open", function(){
    console.log("porta aberta");
}); //verificar se abriu a porta corretamente

mySerial.on("data", function(data){
    //console.log(parseFloat(data));
    //console.log(data[0].toString());
    io.emit("dadoArduino", {
        valor: parseFloat(data)
    });
}); //ocorre quando receber algum dado na serial

io.on("conection", function(socket){
    console.log("Um usuario entrou");
})

http.listen(3000, function (){
    console.log("Servidor rodando na porta 3000");
})