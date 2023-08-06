import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { Form, Row, Col, Button } from "react-bootstrap";
import { uploadFile } from "../store/features/file/fileUploadSlice";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const fileUploadStatus = useSelector((state) => state.file.status);
  const fileUploadError = useSelector((state) => state.file.error);

  let sender_id;
  let sender_name;
  if (isLoggedIn) {
    sender_id = user.id;
    sender_name = user.name;
  }
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [emails, setEmails] = useState([""]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const addNewEmailField = () => {
    if (emails.length < 5) {
      setEmails([...emails, ""]);
    }
  };

  const removeEmailField = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(uploadFile({ sender_id, sender_name, file, emails }));
    console.log("File:", file);
    console.log("Emails:", emails);
  };

  return (
    <>
      {isLoggedIn ? (
        <Container className="mt-5">
          <h3>Welcome Back</h3>
          <h5>
            {user.name}, {user.email}
          </h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="file">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>

            {emails.map((email, index) => (
              <Row key={index}>
                <Col xs={8}>
                  <Form.Group controlId={`emailAddress-${index}`}>
                    <Form.Label>Email Address {index + 1}</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={4} className="d-flex align-items-end">
                  {index > 0 && (
                    <Button
                      variant="danger"
                      onClick={() => removeEmailField(index)}
                      className="ml-2"
                    >
                      Remove
                    </Button>
                  )}
                </Col>
              </Row>
            ))}

            {emails.length < 5 && (
              <Button
                className="mt-3 me-3"
                variant="secondary"
                onClick={addNewEmailField}
              >
                Add Another Email
              </Button>
            )}

            <Button
              disabled={fileUploadStatus === "loading"}
              className="mt-3 me-3"
              type="submit"
            >
              Submit{" "}
            </Button>
            {fileUploadStatus === "loading" && (
              <h5 className="text-secondary mt-3">Loading...</h5>
            )}
            {fileUploadStatus === "succeeded" && (
              <h5 className="text-success mt-3">File shared succesfully.</h5>
            )}
            {fileUploadError && (
              <h5 className="text-success mt-3">Error: {fileUploadError}</h5>
            )}
          </Form>
        </Container>
      ) : (
        <Container className="mt-5">
          Click the links below to
          <h4 className="text-primary">
            <LoginModal /> / <RegisterModal /> .
          </h4>
        </Container>
      )}
    </>
  );
};

export default Home;
