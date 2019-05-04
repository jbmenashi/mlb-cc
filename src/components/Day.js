import React, { Component, Fragment } from 'react';
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
            <div>
               <Moment format="LL">{this.props.day}</Moment>
            </div>
            {this.props.games.filter(game => game.calendarEventID.slice(10) === this.props.day).map(game => <Game {...game} />)}
         </Fragment>
      );
   }
}

export default connect(mapStateToProps)(Day);