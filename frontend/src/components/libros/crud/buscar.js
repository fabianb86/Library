import React from "react";
import { Container, Row } from "react-bootstrap";
// import "./libros.css";
import DataGrid from "../../grid/grid";

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
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container id="libros-buscar-container">
        <Row>
          <h1>Catálogo de libros</h1>
        </Row>
        <Row>
          <DataGrid url="/libros" columns={columns} />
        </Row>
      </Container>
    );
  }
}
