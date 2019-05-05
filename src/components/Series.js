import React, { Component, Fragment } from 'react';
import { Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Game from './Game'

const mapStateToProps = state => {
   return {
      games: state.games
   }
}

class Series extends Component {
   render() {
      return (
         <Fragment>
            <div className="date-div">
               {
                  this.props.series.series.gameType === "R" ?
                  <div className="date-div">NL Tiebreakers</div> :
                  this.props.series.games[0].seriesDescription
               }
            </div>
            <Divider/>
            {this.props.series.games.map(game => <Game {...game} key={game.gamePk} />)}
         </Fragment>
      );
   }
}

export default connect(mapStateToProps)(Series);