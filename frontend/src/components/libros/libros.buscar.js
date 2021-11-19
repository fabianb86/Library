import React from "react";
import { request } from "../helper/helper";
import { Container, Row } from "react-bootstrap";
import "./libros.css";

export default class librosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container id="libros-buscar-container">
        <Row>
          <h1>Página destinada para el home.</h1>
          <h1>En esta se ubicará el catálogo de libros</h1>
        </Row>
      </Container>
    );
  }
}