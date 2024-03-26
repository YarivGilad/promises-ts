//------------------------------------------------------------------------------------------
//     props() is the same as all() but accepts an Object rather than Array
//------------------------------------------------------------------------------------------
import log from '@ajar/marker';
import Promise from 'bluebird';

type PendMap = {
    [key:string] : Promise<string>
}
let obj: PendMap = {};

createPromiseProp('getUser');
createPromiseProp('getTweets');
createPromiseProp('getGravatar');
createPromiseProp('getVideos');
createPromiseProp('getEvents');

function createPromiseProp(operation: string){
    obj[operation] = new Promise( (resolve,reject)=> {
                        log.info(operation,' Started!!!');
                        let random = Math.random() * 3000;
                        Promise.delay(random)
                                .then(()=> {
                                    //  if(operation === 'getGravatar'){
                                          // reject( new Error('gravatar is not accessible'))
                                       // throw new Error('gravatar is not accessible')
                                    //  }else{
                                        log.magenta(`${operation} complete!`); 
                                        resolve(`result of ${operation} ...`);    
                                    //  }
                                })
                              //   .catch( err =>{
                              //      log.yellow('Internal ERROR')
                              //      reject(err)
                              //   //  log.error(err);
                              //   });
                    });
}

Promise.props(obj)
    .then( result => {
         log.info('All operations are complete!');
         log.obj(result as object,'result: ');
    })
    .catch( err => { 
        log.red('MAIN Catch')
        log.error(err);
    });
