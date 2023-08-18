
import {ConfigModel} from "@origamicore/core";   
import { SemaphoreConfig } from "../Index";
export default new ConfigModel({
    packageConfig:[
         new SemaphoreConfig({port:4000})
    ]
});