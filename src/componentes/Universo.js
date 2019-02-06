import React, {Component} from 'react'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import Mundo from './Mundo';


export default class Universo extends Component{


    constructor(props){
        super(props); 
        //primeras celulas
                                        //x y  tipo_patron
        let celus=  this.crear_celdas(); 
        //Setear otros datos: generacion y numero de celulas vivas (poblacion)
        this.state= { celulas: celus};  
 
    }


    crear_celdas(){
        // Generar aleatoriamente celulas vivas
        let celus= [];
        for(let i=0; i< this.props.rows * this.props.cols; i++){
          celus.push( false ); 
        }
        return celus;
   }

    render(){

        return (
            <div>
        <div className="container" color="success-color">
    
            <h1>Universo celulas</h1> 
        </div>
     
            <div className="container p-0"> 
                <Mundo  rows="9" cols="16" tipo="pentadecathlon" patron="23/3" />
                <Mundo  rows="9" cols="16" tipo="beehive" patron="23/4" />
            </div>
            </div>);

    }




}