 
import { ModuleConfig, PackageIndex } from '@origamicore/core';
import TsOriSemaphore from '../Index'; 
export default class SemaphoreConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance =new TsOriSemaphore();
        await instance.jsonConfig(this);
        return instance;
    } 
    port:number;
    public constructor(
        
        fields: {
            id?: string  
            port:number
        }) {
        super(fields);
        if (fields) Object.assign(this, fields); 
    }
}