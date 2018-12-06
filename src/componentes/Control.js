import React, {Component} from 'react';
import {Button} from 'mdbreact';

export default class  Control extends Component{

    constructor(props){
        super( props);
        this.state_inicial= { label: "Iniciar", color: "primary"};
        this.state_pausa=  {label:"Pausar", color: "danger"};
        this.state_continuar= {label:"Continuar", color:"secondary"};
        this.state= this.state_inicial;
        this.state_alt= "";
        
    }

    manage_click= (e)=>{  
        
        let label= this.state_alt!=="" ? this.state_alt.label :  this.state.label;
        this.state_alt= ""; 
            if(  label ==="Iniciar"){ 
                console.log("Asignar a ''iniciar''");
                this.props.onStarting();
                this.setState( this.state_pausa);
            }else{
                if(  label ==="Pausar"){
                    console.log("Asignar a ''continue''", this.state);
                    this.props.onPausing();
                    this.setState(  this.state_continuar );
                }else{
                    //continuar
                    this.props.onResuming();
                    this.setState( this.state_pausa  );
                } 
            }
                
    };
    
    render(){
        let {label, color} = this.state_alt !== "" ? this.state_alt : this.state;
        if( ! this.props.poblacion ){//cuando la poblacion sea reducida a cero

            console.log(  "cero poblacion");
            this.props.onPausing();//se pausa la tarea de evolucion
            label= this.state_inicial.label;
            color= this.state_inicial.color;
            this.state_alt= this.state_inicial;
            console.log( label, color );
        } 


        return (
           <div>
            <Button color="primary"  onClick={this.props.onNewFamily} > Nueva familia </Button>
            <Button id="btn-manclick" color={ color}  onClick={this.manage_click} > { label} </Button>
               </div>
        );  
    }
}