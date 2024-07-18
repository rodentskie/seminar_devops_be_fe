import { config } from 'dotenv';

import handler from './handler';

config();


const ACTIONS = {
  init: handler.init,
};

async function main(action: string) {
  const executeAction = ACTIONS[action];

  if (!executeAction) {
    process.exit(0);
  }

  try {
    await executeAction();
  } catch (error) {
    process.exit(0);
  }
}

main(process.env.ENTRY_POINT || 'init');
