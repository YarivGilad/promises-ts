//-----------------------------------------------------------------//
//     Serial execution of async ops using Bluebird Promises       //
//-----------------------------------------------------------------//
import log from "@ajar/marker";
import Promise from "bluebird";

const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

Promise.each(items, (item: number) => {
  log.info("start processing item:", item);

  const random_delay = Math.random() * 500;

  return Promise.delay(random_delay).then(() => {
    log.magenta("async Operation Finished. item:", item);
  });
})
.then((originalArray: number[]) => {
   log.green("All tasks are done now...", originalArray);
})
  /* .then(() => {
    return 2 + 2;
  })
  .then((total: number) => {
    console.log(total);
  })
  .then(() => {
    return Promise.delay(1000).then(() => 2 + 2);
  })
  .then((sum: number) => {
    log.green("sum", sum);
  })
  .then(():Promise<number> => {
    log.cyan("second then");
    return new Promise((resolve) => {
      setTimeout(() => resolve(2 + 2), 1000);
    });
  })
  .then((result: number) => {
    log.magenta("result:", result);
  }) */
.catch(log.error);
