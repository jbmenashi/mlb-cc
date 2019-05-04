import React, { Component } from 'react';
// import { connect } from 'react-redux'
import Moment from 'react-moment'


class Day extends Component {
   
   
   render() {
      return (
         <div>
            <Moment format="LL">{this.props.day}</Moment>
         </div>
      );
   }
}

export default Day;