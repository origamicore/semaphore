import { AddedResponse, OriInjectable, OriService, PackageIndex, ResponseDataModel, RouteResponse } from "@origamicore/core";
import SemaphoreConfig from "./models/SemaphoreConfig";  
import SemaphoreClient from "./services/memory/SemaphoreClient";
import SemaphoreServer from "./services/memory/SemaphoreServer";

var uuid=require('uuid') 
export default class TsOriSemaphore implements PackageIndex
{
    oauth2Client:any;
    name: string='goauth';
    config:SemaphoreConfig;  
    static client:SemaphoreClient;
    static server:SemaphoreServer;
    async jsonConfig(config: SemaphoreConfig): Promise<void> {
        this.config=config;  
        TsOriSemaphore.server=new SemaphoreServer();
        await TsOriSemaphore.server.init(config.port)
        TsOriSemaphore.client =new SemaphoreClient(config.port)
    }
    async start(): Promise<void> {
    }
    async restart(): Promise<void> { 
    }
    async stop(): Promise<void> { 
    } 
}