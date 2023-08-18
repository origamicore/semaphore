import TsOriSemaphore from "./Index"

export default async function Semaphore(name:string , func:Function)
{
    try{
        let id= await TsOriSemaphore.client.open(name);
        await func()
        await TsOriSemaphore.client.close(id,name);
    }catch(exp){}
}