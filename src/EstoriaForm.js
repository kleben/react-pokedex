import React, { Component } from 'react';
import jQuery from 'jquery';

class EstoriaForm extends Component {


  _handleSubmit(event) {
    event.preventDefault();

    let titulo = this._nome.value;
    let numero = this._numero.value;
    let descricao = this._descricao.value;

    this.props.adicionarEstoria(titulo, numero, descricao);
  }

  _hiddenImagePreview(event) {
      jQuery(".box-preview-image ").addClass("hidden");
  }
  _previewImage(event) {
    // alert(this._numero.value);
    
    // console.log(this._numero.value);
    if (this._numero.value > 0 && this._numero.value < 722) {
      let pontos = this._numero.value;
      let url = `http://localhost/ari/pokeDB/${pontos}`;
      jQuery(".box-preview-image img").attr("src",url);
      jQuery(".box-preview-image ").removeClass("hidden");
    } else {
      jQuery(".box-preview-image ").addClass("hidden");
    }
  }


  render() {
    return(
      <div className="box-insert">
        <form onSubmit={this._handleSubmit.bind(this)}>
          <div className="col-lg-5 no-padding">
              <input placeholder="Titulo" ref={ input => this._nome = input} /><br/>
              <input onBlur={this._hiddenImagePreview.bind(this)} onKeyUp={this._previewImage.bind(this)} placeholder="Nº pokemon" ref={ input => this._numero = input} /><br/>
              <div className="box-preview-image hidden">
                <img className="img-responsive" scr="" />
              </div>
              <button className="btn waves-effect waves-light" type="submit">Salvar</button>
          </div>
          <div className="col-lg-5">
              <h5>Adicionar novo</h5>
              <textarea className="materialize-textarea" placeholder="Descrição" ref={ textarea => this._descricao = textarea}></textarea>
          </div>
        </form>
      </div>
    );
  }

}

export default EstoriaForm;