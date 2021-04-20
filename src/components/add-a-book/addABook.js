import React from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import GenresList from "./genreLists";

export default function addABook() {
  return (
    <Col xl={12}>
      <Col xl={2}>
        <Button variant="outline-primary" size="sm" block>
              &lt; Dashboard
            </Button>
        </Col>
      <Form >
        <Form.Group as={Row} controlId="formHorizontalBTitle">
          <Form.Label column sm={2}>
            Book title
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter here book title" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalAName">
          <Form.Label column sm={2}>
            Author name
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter here author name" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Category
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="select">
              <GenresList />
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalISBN">
          <Form.Label column sm={2}>
          International Standard Book Number
          </Form.Label>
          <Col sm={10}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">
                ISBN
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Enter here international Standard Book Number"
            />
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" size="lg" block>
              Add Book
            </Button>
            
          </Col>
        </Form.Group>
      </Form>
    </Col>
  );
}
