import React, { Component } from 'react';
import './App.css';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
   return {
      series: state.series
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      fetchSeries: (series) => dispatch({type: 'FETCH_SERIES', payload: series})
   }
}


class App extends Component {
   componentDidMount() {
      fetch("http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)")
      .then(res => res.json())
      .then(data => {
         this.props.fetchSeries(data.series)
      })
   }

   render() {
      console.log(this.props.series)
      return (
         <div className="App">
            Hello
         </div>
      )
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
