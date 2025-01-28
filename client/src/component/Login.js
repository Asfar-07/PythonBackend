import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authslice";

export default function Loginpage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(
    "We'll never share your email with anyone else."
  );
  const [responsecolor, setResponsecolor] = useState("text-primary");
  const [action, setAction] = useState(true);
  const [bresponce, setBresponse] = useState(false);
  const navigate = useNavigate();
  // var User = true
  // dispatch(setUser(User))
  function handleSignSubmit(event) {
    const UserData = {
      name: username,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/Sign", UserData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.term === true) {
          dispatch(setUser(UserData))
          setEmail("");
          setUsername("");
          setPassword("");
          setResponse("We'll never share your email with anyone else.");
          navigate("/");
        } else {
          setResponsecolor("text-danger");
          setResponse(response.data.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
  function handleLoginSubmit(event) {
    const UserData = {
      name: username,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/Login", UserData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.term === true) {
          dispatch(setUser(UserData))
          setEmail("");
          setUsername("");
          setPassword("");
          navigate("/");
        } else {
          setResponsecolor("text-danger");
          setBresponse(true);
          setResponse(response.data.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
  return (
    <>
      <div
        className="d-flex bg-dark flud-container justify-content-center align-items-center"
        style={{ height: "100vh" }}
        data-bs-theme="dark"
      >
        <Form
          style={{ width: "30%" }}
          onSubmit={(event) => {
            event.preventDefault();
            if (action) {
              handleSignSubmit();
            } else {
              handleLoginSubmit();
            }
          }}
        >
          {action ? (
            <h2 className="text-light text-center">Sign</h2>
          ) : (
            <h2 className="text-light text-center">Login</h2>
          )}
          {bresponce && (
            <Alert key="danger" variant="danger">
              Email or Password incorrect, You want create new{" "}
              <Alert.Link
                onClick={() => {
                  action ? setAction(false) : setAction(true);
                  setBresponse(false);
                  setResponse("We'll never share your email with anyone else.");
                  setResponsecolor("text-primary");
                  setEmail("");
                  setUsername("");
                  setPassword("");
                }}
              >
                account?
              </Alert.Link>{" "}
            </Alert>
          )}
          {action && (
            <Form.Group
              className="mb-3 text-light"
              controlId="formBasicUsername"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3 text-light" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <Form.Text className={responsecolor}>{response}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 text-light" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </Form.Group>
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              action ? setAction(false) : setAction(true);
              setBresponse(false);
              setResponse("We'll never share your email with anyone else.");
              setResponsecolor("text-primary");
              setEmail("");
              setUsername("");
              setPassword("");
            }}
          >
            {action ? <p>Already have account?</p> : <p>Create new account</p>}
          </span>
          <Button variant="primary" className="w-100 my-4" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
