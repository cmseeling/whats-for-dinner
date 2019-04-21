export interface ModuleMock {
  name: string;
  namespaced: boolean;
  getters: any;
  mutations: any;
  actions: any;
}

export interface StoreMock {
  modules: {[index: string]: ModuleMock};
}

export function getMockModule(name: string, getters: any, mutations: any, actions: any): ModuleMock {
  return {
    name,
    namespaced: true,
    getters,
    mutations,
    actions
  };
}

export function getMockStore(modules: ModuleMock[]): StoreMock {
  const storeModules: {[index: string]: ModuleMock} = {};
  modules.forEach((m) => {
    storeModules[m.name] = m;
  });
  return {
    modules: storeModules
  };
}
