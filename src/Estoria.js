import React, { Component } from 'react';

class Estoria extends Component {

  constructor(){
    super();

    this.state = { exibirEstoria: false }
  }


  _handleClick(event) {
    event.preventDefault();
    this.setState({
      exibirEstoria: !this.state.exibirEstoria
    });
  }

  _handleClickView(event) {
    event.preventDefault();
    this.setState({
      exibirEstoria: !this.state.exibirEstoria
    });
  }


  _handleDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.id);
  }



  render() {

    let descricao;
    let textoBotao = 'Exibir Estória';
    let imagem = `http://localhost/ari/pokeDB/${this.props.numero}.png`;
    let boxViewVisible = "box-view hidden";



    if(this.state.exibirEstoria) {
      textoBotao = "Ocultar Estória";
      boxViewVisible = "box-view show";
    }


    return(
      <div className="col-lg-5">
        <div className="col-lg-10 no-padding">
          <a onClick={this._handleClickView.bind(this)}>
            <img className="img-responsive" src={imagem} />
            <h3>{this.props.nome}</h3>
          </a>
        </div>
        <div className={boxViewVisible} onClick={this._handleClickView.bind(this)}>
          <a className="pull-right" href="#" onClick={this._handleDelete.bind(this)}>Excluir</a>
          <br/>
          <p><strong>#{this.props.id}</strong></p>
          <hr/>
          <br/>
          <br/>
          <p>Nome: {this.props.nome}</p>
          <br/>

          <p dangerouslySetInnerHTML={{ __html: this.props.descricao }}></p>
        </div>
      </div>
    );
  }
}

export default Estoria;