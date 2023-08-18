export default class QueueResponseModel
{
    error:string;
    id:string;
    constructor(data:{
        error?:string;
        id:string
    })
    {
        Object.assign(this,data);
    }
}