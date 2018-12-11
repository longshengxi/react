import React,{Component} from 'react';

import {Switch,Route} from 'react-router-dom';


class service extends Component{
  
 
  
    render(){
        let {match} = this.props;
        return <div className="list">
           这里是客服

        </div>
    }
}

export {service};