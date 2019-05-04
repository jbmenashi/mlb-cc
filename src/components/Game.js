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
               <div className="game-info">
                  <div className="away-team">
                     <div className="team-logo">
                        <img src={require(`../images/${this.props.teams.away.team.id}.png`)} alt="away team" width="25" height="25"/>
                     </div>
                     <div className="team-name">
                        {this.props.teams.away.team.id == 111 ? this.props.teams.away.team.name.split(' ').slice(1).join(' ') : this.props.teams.away.team.name.split(' ')[this.props.teams.away.team.name.split(' ').length - 1] }
                     </div>
                     <div className="team-score">
                        {this.props.teams.away.score}
                     </div>
                  </div>
                  <div className="at">@</div>
                  <div className="home-team">
                     <div className="team-logo">
                        <img src={require(`../images/${this.props.teams.home.team.id}.png`)} alt="home team" width="25" height="25"/>
                     </div>
                     <div className="team-name">
                        {this.props.teams.home.team.id == 111 ? this.props.teams.home.team.name.split(' ').slice(1).join(' ') : this.props.teams.home.team.name.split(' ')[this.props.teams.home.team.name.split(' ').length - 1] }
                     </div>
                     <div className="team-score">
                        {this.props.teams.home.score}
                     </div>
                  </div>
               </div>
            </div>
         </Fragment>
      );
   }
}

export default Game;