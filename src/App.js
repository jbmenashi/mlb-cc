import React, { Component } from 'react';
import { Divider, Button } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux'
import Day from './components/Day.js'
import Series from './components/Series.js'

const mapStateToProps = (state) => {
   return {
      series: state.series,
      dates: state.dates,
      games: state.games,
      dateToggle: state.dateToggle
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      fetchSeries: (series) => dispatch({type: 'FETCH_SERIES', payload: series}),
      fetchDates: (dates) => dispatch({type: 'FETCH_DATES', payload: dates}),
      fetchGames: (games) => dispatch({type: 'FETCH_GAMES', payload: games}),
      toggleDate: () => dispatch({type: 'DATE_TOGGLE'}),
      toggleRound: () => dispatch({type: 'ROUND_TOGGLE'})
   }
}


class App extends Component {
   componentDidMount() {
      console.log("fetch started")
      fetch("http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)")
      .then(res => res.json())
      .then(data => {
         this.props.fetchSeries(data.series.slice(1).concat(data.series[0]))
         data.series.forEach(ser => {
            ser.games.forEach(game => {
               this.props.fetchGames(game)
               !this.props.dates.includes(game.calendarEventID.slice(10)) ? this.props.fetchDates(game.calendarEventID.slice(10)) : console.log("date added")
            })
         })
         console.log("fetch complete")
      })
   }



   render() {
      return (
         <div className="App">
            <img id="mlb-logo" src={require(`./images/mlblogo.png`)} alt="mlb logo" width="200" height="125"/>
            <Divider horizontal id="title"><h1>2018 MLB Postseason Schedule</h1></Divider>
               <Button.Group id="toggle" size='large'>
                  <Button onClick={this.props.toggleDate}>By Date</Button>
                  <Button onClick={this.props.toggleRound}>By Round</Button>
               </Button.Group>
               {
                  this.props.dateToggle ?
                  this.props.dates.sort().map((day, idx) => <Day day={day} key={idx} />) :
                  this.props.series.map((series, idx) => <Series series={series} key={idx}/>)
                }
         </div>
      )
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
