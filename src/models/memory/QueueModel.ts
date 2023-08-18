export default class QueueModel
{
    id:string;
    connection:any;
    timeout:any;
    opened:boolean=false;
    finished:boolean=false;
    constructor(data:{
        id:string;
        connection:any;
        timeout:any; 
    })
    {
        Object.assign(this,data);
    }
}