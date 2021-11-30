import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import LibrosBuscar from "./crud/buscar";
import LibrosCrear from "./crud/crear";
import LibrosEditar from "./crud/editar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./libros.css";
export default class Libros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdLibro = this.setIdLibro.bind(this);
    this.getIdLibro = this.getIdLibro.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdLibro(id) {
    this.setState({ _id: id });
  }

  getIdLibro() {
    return this.state._id;
  }

  render() {
    return (
      <Container id="libros-container">
        <Row id="botones">
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="buscar"
            onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">
                <FontAwesomeIcon icon={faSearch} />
                Buscar
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">
                <FontAwesomeIcon icon={faPlus} />
                Crear
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === "buscar" ? (
            <LibrosBuscar
              changeTab={this.changeTab}
              setIdLibro={this.setIdLibro}
            />
          ) : this.state.currentTab === "crear" ? (
            <LibrosCrear changeTab={this.changeTab} />
          ) : (
            <LibrosEditar
              changeTab={this.changeTab}
              getIdLibro={this.getIdLibro}
            />
          )}
        </Row>
      </Container>
    );
  }
}
