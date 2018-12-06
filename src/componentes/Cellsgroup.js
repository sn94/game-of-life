import React, {Component} from 'react';
import Celula from './Celula';
import 'bootstrap-css-only/css/bootstrap.min.css';


export default class Cellsgroup extends Component{

   

    



   render(){
    let cells= []; 
    for(let j=0; j<  this.props.cols; j++){
           let id_=  this.props.calcIndexSec(  this.props.row , j);

           cells.push(  <Celula  key={ id_ }  isAlive={ this.props.sobrevivir( this.props.row, j)} /> ) ; 
       }   return ( 
       <div className="row">
       {cells} 
        </div>);
   }
}