const initialState = {
   series: [],
   dates: [],
   games: [],
   dateToggle: true
}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'FETCH_SERIES':
         return {...state, series: action.payload}
      case 'FETCH_DATES':
         return {...state, dates: [...state.dates, action.payload]}
      case 'FETCH_GAMES':
         return {...state, games: [...state.games, action.payload]}
      case 'DATE_TOGGLE':
         return {...state, dateToggle: true}
      case 'ROUND_TOGGLE':
         return {...state, dateToggle: false}
      default:
         return state
   }
}