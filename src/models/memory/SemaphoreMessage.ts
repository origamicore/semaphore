export default class SemaphoreMessage
{
    id:string;
    timeout:number;
    name:string;
    state:number
    constructor(data:{
        id:string;
        timeout?:number;
        name:string;
        state:number
    })
    {
        Object.assign(this,data);
    }
}