var http = require('http');
var myMod = require('./myMod');
var fs = require('fs');

http.createServer(function (reqest, response){
    response.writeHead(200, {'Content-Type':'text/html'});

    fs.readFile('./index.html', (error, data)=>{        //read file 
        if(error) {
            response.writeHead(404);
            response.write("FILE not found");
        }
        else {
            response.write(data);
        }
        response.end();
        
    });

}).listen(3000);