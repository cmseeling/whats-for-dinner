import camelCase from 'lodash/camelCase';

/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

interface IAction {
  actions: {
    init: () => void;
  };
}

interface IModules {
  [name: string]: IAction;
}

const files = require.context('.', false, /\.ts$/);
const modules: IModules = {};

files.keys().forEach((key) => {
  if (key === './index.ts') { return; }
  modules[camelCase(key.replace(/(\.\/|\.ts)/g, ''))] = files(key).default;
});

export default modules;
