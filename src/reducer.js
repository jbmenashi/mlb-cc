const initialState = {
   series: [],
   dates: [],
   games: []
}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'FETCH_SERIES':
         return {...state, series: action.payload}
      case 'FETCH_DATES':
         return {...state, dates: [...state.dates, action.payload]}
      case 'FETCH_GAMES':
         return {...state, games: [...state.games, action.payload]}
      default:
         return state
   }
}