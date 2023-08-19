# Semaphore
Origamicore semaphore

## Installation
OrigamiRedis requires [OrigamiCore](https://www.npmjs.com/package/@origamicore/core)  to run.
```sh
occli -n project-name
cd project-name
npm install @origamicore/semaphore
```
## Samples

Config File
```
//
packageConfig:[
        ...
        new SemaphoreConfig({port:4000})
]
```

Sample :
```
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
```
Output : 
```
message 2
message 3
message 1
```
