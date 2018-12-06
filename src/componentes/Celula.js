
import React, {Component} from 'react'; 
import '../celulas.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

export default class Celula extends Component{


    render(){

        //  <img   src={ this.props.isAlive ? live_Cell : dead_Cell } alt="Cell" />

        //cambiar fondo
        let backgroundLife= this.props.isAlive ? "cell m-0 p-0 elegant-color-dark" : "cell m-0 p-0  purple lighten-5";
        return (
            <div   className={ backgroundLife} > 
          
            </div>

        );
    }
}