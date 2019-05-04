import React, { Component, Fragment } from 'react'

class Game extends Component {
   render() {
      console.log(this.props)
      return (
         <Fragment>
            <div className="game-div">
               <div className="series-status">
                  {this.props.seriesStatus.shortDescription.toUpperCase()} - {this.props.seriesStatus.result.toUpperCase()}
               </div>
               {this.props.teams.away.team.name} @ {this.props.teams.home.team.name}
            </div>
         </Fragment>
      );
   }
}

export default Game;