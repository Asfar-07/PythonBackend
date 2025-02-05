import React from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Frondpage.css";

export default function Frondpage() {
  return (
    <div>
      <Header />
      <Container className="bg-warning mw-100 pt-2" style={{ height: "100vh" }}>
        <main>
          <h1 className="m-4">
          This is a Python client-side application without using any backend framework.
          </h1>
          <p>react with bootstrap</p>
          {/* <Container>
              <Link>Button1</Link>
              <Link>Button2</Link>
            </Container> */}
        </main>
      </Container>
    </div>
  );
}
