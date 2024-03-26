import log from '@ajar/marker';
import Promise from 'bluebird';

const operations = [
    'getUser',
    'getTweets',
    'getGravatar',
    'getVideos',
    'getEvents',
]
const pending = operations.map((operation): Promise<string> => {
    return new Promise( (resolve)  => {
        log.info(operation,'Started!!!');
        const random = 1000 + Math.random() * 3000;
        Promise.delay(random)
                .then(()=> {
                    log.magenta(operation,'complete!');
                    resolve(`result: ${operation}`);
                });
    })
})
//----------------------------------------------------------------------//
//      race() executes after the first operation is completed          //
//----------------------------------------------------------------------//
Promise.race(pending)
      .then( item => {
         log.green('The first operation is complete!', `first item to complete: ${item}`);
      })
      .catch(log.error);

//----------------------------------------------------------------------------------------//
//       some() is like race() for x number of items from the collection.                 //
//       it executes a function after the first x number of operations were completed     //
//----------------------------------------------------------------------------------------//
// Promise.some(pending, 3)
//     .spread( (first, second , third) => {
//     // .then( ([first, second , third]) => {
//         log.info('first: ' , first);
//         log.info('second: ' , second);
//         log.info('third: ' , third);
//     })
//     .catch(log.error);
