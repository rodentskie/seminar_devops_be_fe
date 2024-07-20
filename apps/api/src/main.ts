import exitHook from 'async-exit-hook';
import { start, stop } from './server';

(async () => {
  const server = await start();

  exitHook.uncaughtExceptionHandler((e) => {
    console.log(e);
  });

  exitHook.unhandledRejectionHandler((e) => {
    console.log(e);
  });

  exitHook(async (callback: () => void) => {
    await stop(server);
    callback();
  });

  exitHook.uncaughtExceptionHandler(async () => {
    process.exit(-1);
  });
})();
