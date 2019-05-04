import React, { Component, Fragment } from 'react'



class Game extends Component {

   // I would have liked to use this function to get the wrap + video link, but I didn't have enough computing power to take in that entire API
   // fetchGameContent = (id) => {
   //    fetch(`http://statsapi.mlb.com/api/v1/game/${id}/content`)
   //    .then(res => res.json())
   //    .then(data => {
   //       return `https://www.mlb.com/news/${data.editorial.wrap.mlb.slug}/${data.editorial.wrap.mlb.id}`
   //    })
   // }
   
   render() {
      return (
         <Fragment>
            <div className="game-div">
               <div className="series-status">
                  {this.props.seriesStatus.shortDescription.toUpperCase()} - {this.props.seriesStatus.result.toUpperCase()}
               </div>
               <div>
                  {/* start inline block */}
                  <div className="team">
                     <div className="game-content">
                        <img src={require(`../images/${this.props.teams.away.team.id}.png`)} alt="away team" width="25" height="25"/>
                     </div>
                     <div className="game-content">
                        {this.props.teams.away.team.id == 111 ? this.props.teams.away.team.name.split(' ').slice(1).join(' ') : this.props.teams.away.team.name.split(' ')[this.props.teams.away.team.name.split(' ').length - 1] }
                     </div>
                     <div className="game-content">
                        {this.props.teams.away.score}
                     </div>
                  </div>
                  <div className="at">@</div>
                  <div className="team">
                     <div className="game-content">
                        <img src={require(`../images/${this.props.teams.home.team.id}.png`)} alt="home team" width="25" height="25"/>
                     </div>
                     <div className="game-content">
                        {this.props.teams.home.team.id == 111 ? this.props.teams.home.team.name.split(' ').slice(1).join(' ') : this.props.teams.home.team.name.split(' ')[this.props.teams.home.team.name.split(' ').length - 1] }
                     </div>
                     <div className="game-content">
                        {this.props.teams.home.score}
                     </div>
                  </div>
                  <div className="game-content">
                     {this.props.status.detailedState.toUpperCase()}
                  </div>
                  <div className="game-content broadcast">
                     {this.props.broadcasts.find(broadcast => broadcast.isNational && broadcast.name !== "FS1-INT").name}
                  </div>
                  <div className="game-content">
                     <div className="game-content decisions">W: <a className="pitcher" href={"http://statsapi.mlb.com/api/v1/people/" + this.props.decisions.winner.id}>{this.props.decisions.winner.firstName[0]} {this.props.decisions.winner.lastName}</a></div>
                     <div className="game-content decisions">L: <a className="pitcher" href={"http://statsapi.mlb.com/api/v1/people/" + this.props.decisions.loser.id}>{this.props.decisions.loser.firstName[0]} {this.props.decisions.loser.lastName}</a></div>
                     {
                        this.props.decisions.save ?
                        <div className="game-content decisions"> SV: <a className="pitcher" href={"http://statsapi.mlb.com/api/v1/people/" + this.props.decisions.save.id}>{this.props.decisions.save.firstName[0]} {this.props.decisions.save.lastName}</a> </div> :
                        <div className="game-content decisions"> </div>
                     }
                  </div>
                  <div className="game-content pitcher">
                     <a href="http://www.mlb.com">Wrap and Video</a>
                  </div>
                  {/* finish inline block  */}
               </div>
            </div>
         </Fragment>
      );
   }
}

export default Game;