import React, { Component } from 'react';
import './App.css';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
   return {
      series: state.series,
      dates: state.dates
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      fetchSeries: (series) => dispatch({type: 'FETCH_SERIES', payload: series}),
      fetchDates: (dates) => dispatch({type: 'FETCH_DATES', payload: dates})
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
               !this.props.dates.includes(game.calendarEventID.slice(10)) ? this.props.fetchDates(game.calendarEventID.slice(10)) : console.log("date added")
            })
         })
         
      })
   }

   render() {
      console.log(this.props.dates.sort())
      return (
         <div className="App">
            Hello
         </div>
      )
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
