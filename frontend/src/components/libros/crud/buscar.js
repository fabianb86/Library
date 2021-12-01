import React from "react";
import { request } from "../../helper/helper";
import { Container, Row } from "react-bootstrap";
// import "./libros.css";
import DataGrid from "../../grid/grid";
import ConfirmationPrompts from "../../prompts/confirmation";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

const columns = [
  {
    dataField: "_id",
    text: "ID",
    hidden: true,
  },
  {
    dataField: "titulo",
    text: "Titulo",
  },
  {
    dataField: "autor",
    text: "Autor",
  },
  {
    dataField: "palabrasClaves",
    text: "Palabras Claves",
  },
  {
    dataField: "fechaPublicacion",
    text: "Fecha Publicacion",
  },
  {
    dataField: "editorial",
    text: "Editorial",
  },
  {
    dataField: "resumen",
    text: "Resumen",
  },
  {
    dataField: "unidades",
    text: "Unidades",
  },
];

export default class LibrosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idLibro: null,
      confirmation: {
        title: "Eliminar Libro",
        text: "¿Desea Eliminar el Libro?",
        show: false,
      },
      message: {
        text: "",
        show: false,
      },
    };
    this.onClicKEditButton = this.onClicKEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }


  onClicKEditButton(row) {
    this.props.setIdLibro(row._id);
    this.props.changeTab("editar");
  }

  onClickDeleteButton(row) {
    this.setState({
      idLibro: row._id,
      confirmation: {
        ...this.state.confirmation,
        show: true,
      },
    });
  }

  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }

  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      this.eliminarLibro(),
    );
  }

  eliminarLibro() {
    this.setState({ loading: true });
    request
      .delete(`/libros/${this.state.idLibro}`)
      .then((response) => {
        this.setState({
          loading: false,
          message: {
            text: response.data.msg,
            show: true,
          },
        });
        if (response.data.exito) {
          this.reloadPage();
        }
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  render() {
    return (
      <Container id="libros-buscar-container">
        <ConfirmationPrompts
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={1500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1 id="catalogo">Catálogo de libros</h1>
        </Row>
        <Row>
          <DataGrid
            url="/libros"
            columns={columns}
            showEditButton={true}
            showDeleteButton={true}
            onClicKEditButton={this.onClicKEditButton}
            onClickDeleteButton={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
