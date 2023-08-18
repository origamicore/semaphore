import OrigamiCore from '@origamicore/core'  
import config from './Configs'; 
import { Semaphore } from '../Index';
export default class OriIndex
{
    constructor()
    {   
        this.init();
    }
    async sleep(delay:number)
    {
        return new Promise((res,rej)=>{setTimeout(()=>{
            res({})
        },delay) })
    }
    async init()
    {
        var origamicore = new OrigamiCore(config);
        await origamicore.start();
        setTimeout(()=>{
            Semaphore('test',async ()=>{
                await this.sleep(1000)
                console.log('message 1');                
            })
            Semaphore('test1',async()=>{
                await this.sleep(500)
                console.log('message 2');                
            })
            Semaphore('test1',async()=>{
                console.log('message 3');                
            })

        },1000)
    }
}

new OriIndex()