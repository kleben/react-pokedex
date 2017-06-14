import React, { Component } from 'react';
import Estoria from './Estoria';
import EstoriaForm from './EstoriaForm';
import jQuery from 'jquery';

class Taskboard extends Component {

  componentDidMount() {
    this._timer = setInterval(() => this._buscarEstorias(), 5000); 
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  componentWillMount() {
    this._buscarEstorias();
  }

  _buscarEstorias() {
    jQuery.ajax({
      method: 'GET',
      url: 'http://localhost:3001/estorias',
      success: (estorias) => {this.setState({estorias})}
    });
  }

  _excluirEstoria(estoriaId) {
    jQuery.ajax({
      method: 'DELETE',
      url: `http://localhost:3001/estorias/${estoriaId}`
    });

    const estorias = this.state.estorias;
    estorias.splice(estoriaId, 1);

    this.setState({estorias});
  }

  _adicionarEstoria(nome, numero, descricao) {
    const estoria = {
      nome,
      descricao,
      numero
    };

    // jQuery.post('api/estorias', estoria ).success( novaEstoria => {this.setState( {estorias:this.state.estorias.concat([novaEstoria])} );  } );

    jQuery.post('http://localhost:3001/estorias', estoria);

    this.setState({
      estorias: this.state.estorias.concat([estoria]) }
    );
  }

  _getEstorias() {
    return this.state.estorias.map( (estoria) => <Estoria nome={estoria.nome} descricao={estoria.descricao} numero={estoria.numero} key={estoria.id} id={estoria.id} onDelete={this._excluirEstoria.bind(this)} adicionarEstoria={this._adicionarEstoria.bind(this)} /> ); 
  }
    // const estorias = [
    //   {id: 1, nome: 'Contratar Seguro', descricao: 'Como usuario...', numero: 10},
    //   {id: 2, nome: 'Cancelar Seguro', descricao: 'Quero cancelar ...', numero: 30}
    // ];

    // return estorias.map( estoria => <Estoria nome={estoria.nome} descricao={estoria.descricao} numero={estoria.numero} key={estoria.id} /> );


  _getnome(totalDeEstorias) {

    if(totalDeEstorias === 0) {

      return "Backlog vazio";

    } else if (totalDeEstorias === 1) {

      return "1 estória";

    } else {

      return `${totalDeEstorias} estórias`;
    }
  }

 


  constructor() {
      super();
      this.state = {
      estorias : [
        {id: 1, nome: 'Contratar Seguro', descricao: 'Como usuario...', numero: 10, imagem: ''},
        {id: 2, nome: 'Cancelar Seguro', descricao: 'Quero cancelar ...', numero: 30, imagem: ''}
      ]
    }
  }

  render() {

    const estorias = this._getEstorias();

    return(
      <div className="row">

        <div className="col-lg-5">  
          <div className="box-select">
            {estorias}
          </div>
        </div>

        <div className="col-lg-5">
            <EstoriaForm adicionarEstoria={this._adicionarEstoria.bind(this)} />
        </div>

      </div>
      );
  }


}

export default Taskboard;