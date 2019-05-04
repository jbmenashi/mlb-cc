import React, { Component, Fragment } from 'react'

class Game extends Component {
   render() {
      console.log(this.props)
      return (
         <Fragment>
            <div>
               Game!
            </div>
         </Fragment>
      );
   }
}

export default Game;