import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Card, Form, Button, Alert} from "react-bootstrap";

export default function AskQuestion() {
  const [form, setForm] = useState({ title:"", description:"", tags:"" });
  const [error,  setError] = useState(null);
  const nav              = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return nav("/signup");        // token vanished mid‑session

    try {
      const res  = await fetch("http://localhost:4500/api/question", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization  : `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map(t=>t.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      nav(`/question/${data.question._id}`);  // go to the new question
    } catch (err) {
      setError(err.message || "Failed to post question");
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
      <Container style={{maxWidth:"700px"}}>
        <Card bg="secondary" text="light" className="p-4">
          <Card.Body>
            <Card.Title className="fs-3 text-center mb-4">Ask a New Question</Card.Title>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Tags (comma‑separated)</Form.Label>
                <Form.Control
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="e.g. react, hooks"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
