import { initializeTable } from './functions/init-tables';

export default {
  async init() {
    const actions = {
      'initial-table': initializeTable,
    };

    const entryPoint = process.env.MIGRATION_INIT || 'initial-table';
    const executeAction = actions[entryPoint];
    await executeAction();

    process.exit(0);
  },
};
