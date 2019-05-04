import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux'
import Day from './components/Day.js'

const mapStateToProps = (state) => {
   return {
      series: state.series,
      dates: state.dates,
      games: state.games
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      fetchSeries: (series) => dispatch({type: 'FETCH_SERIES', payload: series}),
      fetchDates: (dates) => dispatch({type: 'FETCH_DATES', payload: dates}),
      fetchGames: (games) => dispatch({type: 'FETCH_GAMES', payload: games}),
   }
}


class App extends Component {
   componentDidMount() {
      fetch("http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)")
      .then(res => res.json())
      .then(data => {
         this.props.fetchSeries(data.series)
         data.series.forEach(ser => {
            ser.games.forEach(game => {
               this.props.fetchGames(game)
               !this.props.dates.includes(game.calendarEventID.slice(10)) ? this.props.fetchDates(game.calendarEventID.slice(10)) : console.log("date added")
            })
         })
         
      })
   }

   render() {
      return (
         <div className="App">
            <img id="mlb-logo" src={require(`./images/mlblogo.png`)} alt="mlb logo" width="200" height="125"/>
            <Divider horizontal id="title"><h1>2018 MLB Postseason Schedule</h1></Divider>
            {this.props.dates.sort().map((day, idx) => <Day day={day} key={idx} />)}
         </div>
      )
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
