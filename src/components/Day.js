import React, { Component, Fragment } from 'react';
import { Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import Game from './Game'

const mapStateToProps = state => {
   return {
      games: state.games
   }
}

class Day extends Component {
   render() {
      return (
         <Fragment>
            <div id="date-div">
               <Moment format="LL">{this.props.day}</Moment>
            </div>
            <Divider/>
            {this.props.games.filter(game => game.calendarEventID.slice(10) === this.props.day).map(game => <Game {...game} key={game.gamePk} />)}
         </Fragment>
      );
   }
}

export default connect(mapStateToProps)(Day);