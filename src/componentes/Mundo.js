import React, {Component} from 'react'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import CellsGroup from './Cellsgroup';
import Control from './Control';


export default class Mundo extends Component{


/*
 Pentadecatlon
  x   x
xx xxx xx
  x   x
*/
    constructor(props){
        super(props);
        //primeras celulas
        let celus=  this.generar_celulas();
        //Setear otros datos: generacion y numero de celulas vivas (poblacion)
        this.state= { celulas: celus, generacion: 1, poblacion:  this.contar_poblacion( celus)}; 
        //binding de metodos
        this.indice_secuencial= this.indice_secuencial.bind( this);
        this.evolucionar_estado_mundo= this.evolucionar_estado_mundo.bind( this);

        this.determinar_patron( props.patron);
        
    }

  


    generar_celulas= ()=>{
        let celus= [];
        // Generar aleatoriamente celulas vivas
        for(let a=0; a< this.props.rows* this.props.cols ; a++){   celus.push(  Math.random() < 0.5);  } 
       return celus;
    };

    //generar otra familia de celulas
   new_cells_family= ()=>{
    let new_cells=  this.generar_celulas();
    this.setState( (stateprev, props)=>({
        celulas:  new_cells, generacion:  1 , poblacion: this.contar_poblacion( new_cells)
    })      );
   };


    determinar_patron= (  arg)=>{
    let dts=    arg.split("/");
    this.units_to_survive= dts[0].split("");
    this.units_to_born= dts[1].split("");
    console.log( "Para vivir ",   this.units_to_survive);
    console.log( "Para nacer ", this.units_to_born );
    }
    
    contar_poblacion= ( arg)=>{
        //solo considerar celulas vivas
    return arg.filter( (ele)=>{   return ele; }).length;
    };


    evolucionar_estado_mundo(){

        if( this.contar_poblacion( this.state.celulas)  ){
            //verificar el estado de las celulas
            let nuevo=  this.state.celulas.map( (item, indice)=> {  
                let {x,y }= this.indice_x_y( indice );
                return this.survive( x, y);
            }); 

        
        let poblacioN=  this.contar_poblacion( nuevo) ;
        this.setState( (stateprev, props)=>({
            celulas: nuevo, generacion: stateprev.generacion + 1 , poblacion: poblacioN
        })      );
        }else{ 
            this.setState({ poblacion: 0} );
            this.pausarEvolucion();
            
            
        }

       
    }

    /**
 * [Genera un indice correspondiente a un arreglo de una sola dimension (vector)]
 * @param  {[integer]} i [fila]
 * @param  {[integer]} j [columna]
 * @return {[integer]} [indice secuencial]
 */
    indice_secuencial= (i,j)=>{  
     
        if( i < 0)  i= 0;
        if( j< 0)  j=0;
        if(i === this.props.rows )   i= this.props.rows -1;
        if( j === this.props.cols)   j= this.props.cols -1;

        return  i * this.props.cols  + j;  };


  /**
 * [Genera los indices x, y,   para un arreglo bidimensional ]
 * @param  {[integer]} indice [indice] 
 * @return {[Array]} [indices x y]
 */
    indice_x_y= ( indice)=>{  //Acepta un indice secuencial contando desde 0 1 2, etcS
            let i=0; //numero de fila que corresponde al (indice)esimo elemento de la lista de checkboxes
            let k=0;//contador para iterar el  numero de filas de la grilla de checkboxes
            for(k=0; k< this.props.rows; k++){
                 
            let referencia=  this.indice_secuencial( k,0) ; //Se obtiene el indice (secuencial) del elemento a partir
                                                //de proporcionar fila y columna
                                                //Se obtiene el indice que corresponde a la fila k en la col. 0
           
            /** Si el indice secuencial obtenido es igual al otro indice secuencial: el parametro (indice)
            Se asume que la fila del elemento de indice "referencia" es k
            Se asigna k a i***/
            if( indice === referencia){ 
                 i= k; break;//Encontrada la fila se interrumpe el bucle
                 }
        
            /** El parametro de indice es mayor al de referencia y (menor o igual) al indice secuencial de la
            siguiente fila en la columna cero 
            El elemento se encuentra entre esos intervalos
            **/
            if( indice > referencia && indice  <  this.indice_secuencial( k+1 ,0) ){ 
                i= k; break;}
                
            }
            
           let j=  indice - i * this.props.cols;//A partir de la fila y el valor de indice secuencial se halla el numero
                                    // de columna
            
            return  { x: i , y:j};
            };


    isAlive= (i,j)=>{
        return this.state.celulas[ this.indice_secuencial( i, j) ];
    };


    existsLiveCellAt= ( i, j)=>{

        //verificar si las coordenadas estan en el rango permitido
        if ( !( i < 0  ||  j< 0 || i=== this.props.rows ||   j === this.props.cols)) { 
            return this.state.celulas[this.indice_secuencial(i,j) ] ;
        } return false;
        
       // console.log( i,j, this.props.rows, this.props.cols, coord_Valida ? "coord valida": "coord no valid", estado_Cell);
    };

    neighbours= ( ci, cj )=>{
    
        
        let v1=  this.existsLiveCellAt( ci-1 ,  cj-1)   ? 1 : 0;
        let v2=  this.existsLiveCellAt( ci-1 ,  cj)     ? 1 : 0;
        let v3=  this.existsLiveCellAt( ci-1 ,  cj+1)   ? 1 : 0;

        let v4=  this.existsLiveCellAt( ci ,  cj-1)     ? 1 : 0;
        let v5=  this.existsLiveCellAt( ci ,  cj+1)     ? 1 : 0;

        let v6=  this.existsLiveCellAt( ci+1 ,  cj-1)   ? 1 : 0; 
        let v7=  this.existsLiveCellAt( ci+1 ,  cj)     ? 1 : 0;
        let v8=  this.existsLiveCellAt( ci+1 ,  cj+1)   ? 1 : 0;
        let finalsuma= v1+v2+v3+v4+v5+v6+v7+v8; 
       // console.log( "top left", v1  ,"top",  v2 ,  "top righ", v3,"left",  v4 );
        //console.log(  "right", v5, "bottom left", v6, "bottom", v7, "bottom right", v8);
       return  finalsuma; 
      };


    survive= ( i , j)=>{
           
            //    fila * columnas  +  col 
            let sum= this.neighbours( i, j);
           //console.log( "numero de vecinos de ",i,j,"=", sum);
            let temp_index=  this.indice_secuencial( i, j); 
            if( this.state.celulas[   temp_index] &&  this.units_to_survive.includes( sum.toString()) ){
                return true;
            } 
            if( !this.state.celulas[ temp_index] &&  this.units_to_born.includes( sum.toString()) ){
                return true;
            } 
            return false;
/*

            if( this.state.celulas[   temp_index] && (sum < 2 || sum> 3) ) return false;
            else{
             if(  this.state.celulas[ temp_index]  &&  (sum === 3 || sum === 2)  )  return true;
            else{
                if( !this.state.celulas[ temp_index] && sum=== 3 ) return true;
            }  } 

*/ 
       // console.log( " i, j", i, j, this.state.celulas[ temp_index]);
        };

    
    pausarEvolucion= ()=>{
        
        clearInterval( this.timerChange);
    };



    start_Evolucion= ()=> { 
        console.log("nuevo comienzo"); 
        this.timerChange= setInterval( this.evolucionar_estado_mundo , 2000) ;
    };

    resume_Evolucion= ()=> {  
         this.timerChange= setInterval( this.evolucionar_estado_mundo , 2000) ;
     };
    componentDidMount(){
       //this.start_resume_Evolucion(); 
    }
    componentWillUnmount(){
        //this.pausarEvolucion();
    }






    render(){
    
        //crear vistas de cada celda
        let grilla= [];
        for(let i=0; i<  this.props.rows; i++){  
            grilla.push( < CellsGroup key={i} calcIndexSec={this.indice_secuencial}  sobrevivir={this.isAlive} row={i} cols={this.props.cols} /> ); 
         } 

        return (
        <div>
    <div className="container" color="success-color">

        <h2>Generacion { this.state.generacion}</h2>
        <h2>Poblacion {  this.state.poblacion}</h2>
    </div>

       <Control  poblacion={ this.state.poblacion } onPausing={ this.pausarEvolucion} onStarting={this.start_Evolucion}  onResuming={this.resume_Evolucion}  onNewFamily={this.new_cells_family } />
        <div className="container p-0"> 
              {grilla} 
        </div>
        </div>);

    }


}