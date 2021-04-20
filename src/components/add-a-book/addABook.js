import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  Alert,
  Container,
} from "react-bootstrap";
import GenresList from "./genreLists";

export default function AddABook() {
  const [bTitle, setbTitle] = useState("");
  const [aName, setaName] = useState("");
  const [cat, setCat] = useState("Drama");
  const [ISBN, setISBN] = useState("");
  

  function handleCat(e) {
    setCat(e.target.value);
  }

  async function handleClick(event) {
    event.preventDefault();
    let ind = await axios.get("http://localhost:3001/books").then((res) => {
      return res.data.length;
    });

    axios.post("http://localhost:3001/books", {
      id: ind,
      book_name: bTitle,
      author_name: aName,
      category: cat,
      ISBN: ISBN,
    })
      .then(res => alert('Book successfully added\nRefreshing page'))
      .catch((err) => alert('something went wrong: '+ err + '\nRefreshing page'));

      window.location.reload()

  }

  return (
    <>
      <Col xl={2} sm={2} md={2}>
        <Button variant="outline-primary" size="sm" block>
          &lt; Dashboard
        </Button>
      </Col>
      <Container>
        <Col xl={12}>
          <br />
          <br />
          <Col xl={9}>
            <Form>
              <Form.Group as={Row} controlId="bTitle">
                <Form.Label column sm={2}>
                  Book title
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={bTitle}

                    style={{ borderColor: bTitle.length > 0 ? "green" : "red" }}
                    onChange={(e) => {
                      setbTitle(e.target.value);
                    }}
                    placeholder="Enter here book title"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="aName">
                <Form.Label column sm={2}>
                  Author name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={aName}
                    style={{ borderColor: aName.length > 0 ? "green" : "red" }}
                    onChange={(e) => setaName(e.target.value)}
                    placeholder="Enter here author name"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Category
                </Form.Label>
                <Col sm={10}>
                  <Form.Control as="select" onChange={handleCat}>
                    <GenresList />
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="ISBN">
                <Form.Label column sm={2}>
                  International Standard Book Number
                </Form.Label>
                <Col sm={10}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">ISBN</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="number"
                      value={ISBN}

                      onChange={(e) => setISBN(e.target.value)}
                      style={{
                        borderColor: ISBN.length === 13 ? "green" : "red",
                      }}
                      placeholder="Enter here international Standard Book Number"
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Alert
                    variant="danger"
                    style={{display:
                      aName.length > 0 &&
                      bTitle.length > 0 &&
                      ISBN.length === 13 ? 'none' : ''}}
                    
                  >
                    <Alert.Heading>Red bordered inputs cannot be empty!</Alert.Heading>
                    <p style={{display:bTitle.length>0 ? 'none' : ''}}>Please enter Book title</p>
                    <p style={{display:aName.length>0 ? 'none' : ''}}>Please enter Author name</p>
                    <p style={{display:ISBN.length === 13 ? 'none' : ''}}>Please enter correct ISBN number (13 digits) {13 - ISBN.length}  left</p>
                  </Alert>
                  <Button
                    type="submit"
                    size="lg"
                    block
                    onClick={handleClick}
                    disabled={
                      aName.length < 1 ||
                      bTitle.length < 1 ||
                      ISBN.length !== 13
                    }
                  >
                    Add Book
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Col>
      </Container>
    </>
  );
}
