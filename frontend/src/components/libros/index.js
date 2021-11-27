import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import LibrosBuscar from "./crud/buscar";
import LibrosCrear from "./crud/crear";
import "./libros.css";
export default class Libros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  render() {
    return (
      <Container id="libros-container">
        <Row>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="buscar"
            onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">Buscar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">Crear</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === "buscar" ? (
            <LibrosBuscar />
          ) : (
            <LibrosCrear changeTab={this.changeTab} />
          )}
        </Row>
      </Container>
    );
  }
}
