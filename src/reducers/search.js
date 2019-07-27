const search = (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH_FIN_RESULTS_LOADED':
      return {
        ...state,
        finItems: action.finItems || []
      }
    case 'SET_ADVANCE_SEARCH_PARAM':
      const curSearchParams = state.searchParams || {};
      const {itemType, itemValue} = action
      return {
        ...state,
        searchParams: Object.assign({}, {...curSearchParams, ...{[itemType]: itemValue}})
      }
    default:
      return state;
  }
};

export default search;
