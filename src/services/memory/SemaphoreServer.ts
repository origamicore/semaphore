import Queue from "../../models/memory/Queue";
import SemaphoreMessage from "../../models/memory/SemaphoreMessage";
import { States } from "../../models/memory/States";

 

var WebSocketServer = require('websocket').server;
var http = require('http'); 
export default class SemaphoreServer
{ 
    addConnection(request:any)
    {
        let key=request.key 
        var connection:any ={}              
        try{
            connection = request.accept('echo-protocol', request.origin);  
            connection.on('message', (message)=> {
                var data:SemaphoreMessage;
                try{
                    data=new SemaphoreMessage(JSON.parse(message.utf8Data)) 
                    if(data.state==States.Opened)
                    {
                        Queue.push(data,connection)
                    }
                    if(data.state==States.Closed)
                    {
                        Queue.remove(data,connection)
                    }

                }catch(exp)
                { 
                    return;
                }

            }) 
            connection.on('close', (message)=> { 
                Queue.disconnect(key)
            }) 
            
        }catch(exp){
            console.log('Error>>>',exp)
        }

    }
    async init(port:number)
    {
        return new Promise((res,rej)=>{
            var server:any={};
            server=http.createServer((request, response)=> {
                response.writeHead(404);
                response.end();    
            })      
            server.listen(port, ()=> {
                res({})
                console.log( "\x1b[32m%s\x1b[0m",  ' Semaphore run at port '+port);
            });         
            var wsServer = new WebSocketServer({
                httpServer: server,
                autoAcceptConnections: false
            });
            
            wsServer.on('connection',(request)=> {  
                
            });
            wsServer.on('request', (request)=> {
                this.addConnection(request)
            }) 

        })
    }
    constructor(delay?:number)
    { 
        Queue.init(delay);
    }

}