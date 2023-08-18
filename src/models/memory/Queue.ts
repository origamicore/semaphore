import QueueModel from "./QueueModel";
import QueueResponseModel from "./QueueResponseModel";
import SemaphoreMessage from "./SemaphoreMessage";
import { States } from "./States";

export default class Queue
{
    static queueMap:Map<string,QueueModel[]>=new Map<string,QueueModel[]>();
    static disconnected:string[]=[]
    static async init(delay:number=20)
    {
        while(true)
        {
            await new Promise((res)=>{
                setTimeout(()=>{
                    res({})
                },delay)
            })
            this.queueMap.forEach((queue: QueueModel[])=>{
                for(let key of this.disconnected)
                {
                    for(let i=queue.length-1;i>=0;i--)
                    {
                        let item =queue[i];
                        if(item.connection.key==key)
                        {
                            queue.splice(i,1)
                        }
                    } 
                }
                if(queue.length)
                {
                    if(!queue[0].opened)
                    {
                        let item = queue[0];
                        queue[0].opened=true;
                        item.connection.sendUTF(JSON.stringify({
                            id:item.id,
                            state:States.Opened, 
                        }))
                    }
                    if(queue[0].finished)
                    {
                        let item = queue.splice(0,1)[0];
                        item.connection.sendUTF(JSON.stringify({
                            id:item.id,
                            state:States.Closed, 
                        }))
                    }
                }
                let now=new Date().getTime();
                for(let i=queue.length-1;i>=0;i--)
                {
                    if(queue[i].timeout<now)
                    {
                        let item=queue.splice(i,1)[0];
                        item.connection.sendUTF(JSON.stringify({
                            id:item.id,
                            state:States.Timeout, 
                        }))
                    }                     
                }
            })
        } 
    } 
    static disconnect(key)
    {
        this.disconnected.push(key)
    }
    static remove(model:SemaphoreMessage,connection:any)
    {
        if(!this.queueMap.has(model.name))return
        let queue=this.queueMap.get(model.name)
        if(!queue.length)return;
        if(model.id==queue[0].id)
        {
            queue[0].finished=true;
        }
    }
    static push(model:SemaphoreMessage,connection:any)
    { 
        if(!this.queueMap.has(model.name))this.queueMap.set(model.name,[])
        this.queueMap.get(model.name).push(new QueueModel({
            id:model.id,
            timeout:new Date().getTime()+ model.timeout,
            connection
        })) 
    }

}