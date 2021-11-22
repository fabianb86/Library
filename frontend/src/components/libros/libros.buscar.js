import React from "react";
import { request } from "../helper/helper";
import { Container, Row } from "react-bootstrap";
import "./libros.css";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

const products = [
  {
    titulo: "Programación orientada a objetos en Java",
    autor: "FRANCISCO BLASCO",
    palabrasClaves: "polimorfismo, herencia, POO, encapculamiento, ",
    fechaPublicacion: "15-05-2019",
    editorial: "Ediciones de la U",
    resumen: "El objetivo principal de este libro es presentar al lector los fundamentos de la Programación Orientada a Objetos. Focalizamos la atención en conceptos como el encapsulamiento, la herencia, el polimorfismo, composición, delegación, clases envoltorio, reflection, genéricos, lanzamiento, intercepción, tratamiento de excepciones, etc.",
    unidades: 2,
  }
];
const columns = [{
  dataField: 'titulo',
  text: 'Titulo'
}, {
  dataField: 'autor',
  text: 'Autor'
}, {
  dataField: 'palabrasClaves',
  text: 'Palabras Claves'
}, {
  dataField: 'fechaPublicacion',
  text: 'Fecha Publicacion'
}, {
  dataField: 'editorial',
  text: 'Editorial'
}, {
  dataField: 'resumen',
  text: 'Resumen'
},
{
  dataField: 'unidades',
  text: 'Unidades'
}];

export default class librosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const options = {
      custom: true,
      totalSize: products.length
    };
    return (
      <Container id="libros-buscar-container">
        <Row>
          <h1>Catálogo de libros</h1>
        </Row>
        <Row>
          <PaginationProvider
            pagination={ paginationFactory(options) }
          >
            {
              ({
                paginationProps,
                paginationTableProps
              }) => (
                <div>
                  <BootstrapTable
                    keyField="id"
                    data={ products }
                    columns={ columns }
                    { ...paginationTableProps }
                  />
                  <PaginationListStandalone
                    { ...paginationProps }
                  />
                </div>
              )
            }
          </PaginationProvider>
        </Row>
      </Container>
    );
  }
}