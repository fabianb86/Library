import React from "react";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

export default class LibrosCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rediret: false,
      message: {
        text: "",
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
      .post("/libros", this.state.libro)
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
        this.setState({ loading: true });
      });
  }

  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab("buscar");
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

        <Loading show={this.state.loading} />

        <Row>
          <h1>Crear Nuevo Libro</h1>
        </Row>

        <Form>
          <Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    onChange={(e) => this.setValue("titulo", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control
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
                    onChange={(e) =>
                      this.setValue("fechaPublicacion", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Palabras Clave</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.setValue("palabrasClaves", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Unidades</Form.Label>
                  <Form.Control
                    onChange={(e) => this.setValue("unidades", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Editorial</Form.Label>
                  <Form.Control
                    onChange={(e) => this.setValue("editorial", e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Resumen</Form.Label>
                  <Form.Control
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
            onClick={() => console.log(this.guardarLibros())}
          >
            Crear Nuevo Libro
          </Button>
        </Form>
      </Container>
    );
  }
}
