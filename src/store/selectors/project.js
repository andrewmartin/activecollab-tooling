export const getProjects = state => {
  const { items } = state;
  if (!state.items) return [];

  return Object.keys(items).map(key => items[key]);
};

export const getProject = (state = { items: {} }, id) => {
  return state.items[id] ? state.items[id] : {};
};
