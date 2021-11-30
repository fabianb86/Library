import React from "react";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

import ConfirmationPrompts from "../../prompts/confirmation";

export default class LibrosEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idLibro: this.props.getIdLibro(),
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      confirmation: {
        title: "Modificar Libro",
        text: "¿Deseas modificar el libro?",
        show: false,
      },
      loading: false,
      libro: {
        titulo: "",
        autor: "",
        palabrasClaves: "",
        fechaPublicacion: "",
        editorial: "",
        resumen: "",
        unidades: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getLibro();
  }

  getLibro() {
    this.setState({ loading: true });
    request
      .get(`/libros/${this.state.idLibro}`)
      .then((response) => {
        this.setState({
          libro: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  setValue(index, value) {
    this.setState({
      libro: {
        ...this.state.libro,
        [index]: value,
      },
    });
  }

  guardarLibros() {
    this.setState({ loading: true });
    request
      .put(`/libros/${this.state.idLibro}`, this.state.libro)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab("buscar");
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
      this.guardarLibros()
    );
  }

  render() {
    return (
      <Container id="libros-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={1500}
          onExited={this.onExitedMessage}
        />

        <ConfirmationPrompts
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
        <Loading show={this.state.loading} />

        <Row>
          <h1>Editar Libro</h1>
        </Row>

        <Form>
          <Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    value={this.state.libro.titulo}
                    onChange={(e) => this.setValue("titulo", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control
                    value={this.state.libro.autor}
                    onChange={(e) => this.setValue("autor", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Row>

          <Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Fecha de Publicación</Form.Label>
                  <Form.Control
                    value={this.state.libro.fechaPublicacion}
                    onChange={(e) =>
                      this.setValue("fechaPublicacion", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Palabras Clave</Form.Label>
                  <Form.Control
                    value={this.state.libro.palabrasClaves}
                    onChange={(e) =>
                      this.setValue("palabrasClaves", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Unidades</Form.Label>
                  <Form.Control
                    value={this.state.libro.unidades}
                    onChange={(e) => this.setValue("unidades", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Editorial</Form.Label>
                  <Form.Control
                    value={this.state.libro.editorial}
                    onChange={(e) => this.setValue("editorial", e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Resumen</Form.Label>
                  <Form.Control
                    value={this.state.libro.resumen}
                    as="textarea"
                    rows={5}
                    onChange={(e) => this.setValue("resumen", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Row>

          <Button
            variant="primary"
            onClick={() =>
              this.setState({
                confirmation: { ...this.state.confirmation, show: true },
              })
            }
          >
            Guardar Libro
          </Button>
        </Form>
      </Container>
    );
  }
}
