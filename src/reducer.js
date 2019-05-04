const initialState = {
   series: []
}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'FETCH_SERIES':
         return {...state, series: action.payload}
      default:
         return state
   }
}