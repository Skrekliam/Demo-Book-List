import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  ButtonGroup,
  Jumbotron,
  Col,
  Container,
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import ip from "../../consts";

export default function Dashboard(props) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`http://${ip}:3001/books`)
      .then((res) => {
        setData(res.data);
        console.log("Data loaded successfully");
      })
      .catch((err) => alert(err));
  }, [refresh]);

  const handleDelete = (event) => {
    console.log(event);
    let id = event.target.id;
    let confirmDel = window.confirm(
      `You realy want to delete book with index ${id}?`
    );
    if (confirmDel) {
      axios
        .delete(`http://${ip}:3001/books/${id}`)
        .then((res) => alert("Book deleted successfully"))
        .catch((err) => alert(`Error: \t ${err}`));
    }
    setRefresh(!refresh);
  };

  let listBooks = data.map((el) => (
    <tr key={el.id}>
      <td>{el.id}</td>
      <td>{el.book_name}</td>
      <td>{el.author_name}</td>
      <td>{el.category}</td>
      <td>{el.ISBN}</td>
      <td>
        <ButtonGroup>
          <Link
            to={{
              pathname: `/book/${el.id}`,
            }}
          >
            <Button variant="warning">Edit</Button>
          </Link>
          <Button
            variant="outline-danger"
            size="sm"
            id={el.id}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  // console.log(listBooks);

  return (
    <div>
      <Jumbotron>
        <Col xl={5}>
          <h1>{document.title}</h1>
          <p>Here you can add books to your list, remove, or edit them</p>
        </Col>
        <Col xl={3}>
          <Link to="/book">
            <Button variant="outline-primary" size="sm">
              Add Book &gt;
            </Button>
          </Link>
        </Col>
      </Jumbotron>
      <Container>
        <Table striped bordered hover>
          <thead variant="dark">
            <tr>
              <th>#</th>
              <th>Book title</th>
              <th>Author name</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{listBooks}</tbody>
        </Table>
      </Container>
    </div>
  );
}
