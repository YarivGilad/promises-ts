//------------------------------------------------------------------------------------------
//     all() executes a function after all operations were completed (in parallel)
//------------------------------------------------------------------------------------------
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

// Promise.all(pending)
//     .then( resolved_values_array => {
//         console.table(resolved_values_array)
//     })
//     .catch( err => {
//         log.error(err);
//     });

Promise.all(pending)
    .then(console.table)
    .catch(log.error);
