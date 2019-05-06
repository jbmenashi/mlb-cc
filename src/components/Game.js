import React, { Component, Fragment } from 'react'
import { Modal, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Moment from 'react-moment'

const mapStateToProps = (state) => {
   return {
      dateToggle: state.dateToggle
   }
}

class Game extends Component {

   // I would have liked to use this function to get the wrap + video link, but I didn't have enough computing power to take in that entire API
   // fetchGameContent = (id) => {
   //    fetch(`http://statsapi.mlb.com/api/v1/game/${id}/content`)
   //    .then(res => res.json())
   //    .then(data => {
   //       return `https://www.mlb.com/news/${data.editorial.wrap.mlb.slug}/${data.editorial.wrap.mlb.id}`
   //    })
   // }

   calcXtraInnings = (arr) => {
      let awayRuns = 0
      let homeRuns = 0
      for (let i = 0; i < arr.length; i++) {
         awayRuns += arr[i].away.runs
         homeRuns += arr[i].home.runs
      }
      return [awayRuns, homeRuns]
   }
   
   render() {
      return (
         <Fragment>
            <Modal className="linescore" size="tiny" dimmer="blurring" trigger={
            <div className="game-div">
               <div className="series-status">
                  {this.props.dateToggle ?
                  this.props.seriesStatus.shortDescription.toUpperCase() :
                  <Moment format="dddd, MMMM Do">{this.props.gameDate}</Moment>} - {this.props.seriesStatus.result.toUpperCase()}
               </div>
               <div className="game-info">
                  {/* start inline block */}
                  <div className="team">
                     <div className="game-content">
                        <img src={require(`../images/${this.props.teams.away.team.id}.png`)} alt="away team" width="25" height="25"/>
                     </div>
                     <div className="game-content">
                        {this.props.teams.away.team.id === 111 ? this.props.teams.away.team.name.split(' ').slice(1).join(' ') : this.props.teams.away.team.name.split(' ')[this.props.teams.away.team.name.split(' ').length - 1] }
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
                        {this.props.teams.home.team.id === 111 ? this.props.teams.home.team.name.split(' ').slice(1).join(' ') : this.props.teams.home.team.name.split(' ')[this.props.teams.home.team.name.split(' ').length - 1] }
                     </div>
                     <div className="game-content">
                        {this.props.teams.home.score}
                     </div>
                  </div>
                  <div className="game-content status">
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
                     <a className="links" href="http://www.mlb.com">Wrap and Video</a>
                  </div>
                  {/* finish inline block  */}
               </div>
            </div>
            }>
               <Modal.Header>{this.props.teams.away.team.name} @ {this.props.teams.home.team.name}, Game {this.props.seriesGameNumber}</Modal.Header>
               <Modal.Description>
                  <Table celled>

                     <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>1</Table.HeaderCell>
                        <Table.HeaderCell>2</Table.HeaderCell>
                        <Table.HeaderCell>3</Table.HeaderCell>
                        <Table.HeaderCell>4</Table.HeaderCell>
                        <Table.HeaderCell>5</Table.HeaderCell>
                        <Table.HeaderCell>6</Table.HeaderCell>
                        <Table.HeaderCell>7</Table.HeaderCell>
                        <Table.HeaderCell>8</Table.HeaderCell>
                        <Table.HeaderCell>9</Table.HeaderCell>
                        <Table.HeaderCell>X</Table.HeaderCell>
                        <Table.HeaderCell>R</Table.HeaderCell>
                        <Table.HeaderCell>H</Table.HeaderCell>
                        <Table.HeaderCell>E</Table.HeaderCell>
                        </Table.Row>
                     </Table.Header>

                     <Table.Body>
                        <Table.Row>
                        <Table.Cell>{this.props.teams.away.team.abbreviation}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[0].away.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[1].away.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[2].away.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[3].away.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[4].away.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[5].away.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[6].away.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[7].away.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[8].away.runs}</Table.Cell>
                        <Table.Cell>{
                           this.props.linescore.innings[9] ?
                           this.calcXtraInnings(this.props.linescore.innings.slice(9))[0] :
                           '-'
                        }</Table.Cell>
                        <Table.Cell>{this.props.linescore.teams.away.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.teams.away.hits}</Table.Cell>
                        <Table.Cell>{this.props.linescore.teams.away.errors}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                        <Table.Cell>{this.props.teams.home.team.abbreviation}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[0].home.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[1].home.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[2].home.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[3].home.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[4].home.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[5].home.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[6].home.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.innings[7].home.runs}</Table.Cell>
                        <Table.Cell>{
                           this.props.linescore.innings[8].home.runs === 0 && this.props.teams.home.isWinner && !this.props.linescore.innings[9] ?
                           '-' :
                           this.props.linescore.innings[8].home.runs
                        }</Table.Cell>
                        <Table.Cell>{
                           this.props.linescore.innings[9] ?
                           this.calcXtraInnings(this.props.linescore.innings.slice(9))[1] :
                           '-'
                        }</Table.Cell>
                        <Table.Cell>{this.props.linescore.teams.home.runs}</Table.Cell>
                        <Table.Cell>{this.props.linescore.teams.home.hits}</Table.Cell>
                        <Table.Cell>{this.props.linescore.teams.home.errors}</Table.Cell>
                        </Table.Row>
                     </Table.Body>

                  </Table>
               </Modal.Description>
            </Modal>
         </Fragment>
      );
   }
}

export default connect(mapStateToProps)(Game);