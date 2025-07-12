import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Badge, Spinner } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [user, setUser] = useState(null);
    const [newAnswer, setNewAnswer] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchQuestionAndAnswers = async () => {
            try {
                const res = await fetch(`http://localhost:4500/api/question/${id}`);
                const data = await res.json();
                setQuestion(data.question);

                const answerRes = await fetch(`http://localhost:4500/api/answer/${id}`);
                const answerData = await answerRes.json();
                setAnswers(answerData.answers);
            } catch (err) {
                console.error("Failed to load question or answers", err);
            } finally {
                setLoading(false);
            }
        };

        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:4500/api/auth/verify", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (res.ok && data.user) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error("Auth check failed", err);
            }
        };

        fetchQuestionAndAnswers();
        checkAuth(); // 🔁 always re-check after navigating to this page

    }, [id, localStorage.getItem("token")]); // 👈 force rerun on token change


    const handleSubmitAnswer = async () => {
        const token = localStorage.getItem("token");

        if (!token || !user) {
            // 👇 redirect unauthenticated users
            return navigate("/signup");
        }

        if (!newAnswer.trim()) return;

        try {
            const res = await fetch(`http://localhost:4500/api/answer/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content: newAnswer }),
            });

            const data = await res.json();

            if (res.ok) {
                setAnswers([...answers, { ...data.answer, author: { username: user.username } }]);
                setNewAnswer("");
            } else {
                console.error("Submit error:", data.message);
            }
        } catch (err) {
            console.error("Failed to submit answer", err);
        }
    };



    if (loading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="light" />
            </div>
        );

    if (!question)
        return <div className="text-center mt-5">Question not found</div>;

    return (
        <div className="bg-dark min-vh-100">
            <Container className="text-light pt-5 pb-5">
                <Card bg="secondary" text="light" className="mb-4">
                    <Card.Body>
                        <Card.Title className="fs-2">{question.title}</Card.Title>
                        <Card.Text className="fs-5">{question.description}</Card.Text>
                        <div className="mb-2">
                            {question.tags?.map((tag, i) => (
                                <Badge bg="dark" className="me-2" key={i}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <div className="text-muted small">
                            Asked by {question.author?.username || "Anon"}
                        </div>
                    </Card.Body>
                </Card>

                <h4 className="mb-3">Answers</h4>
                <Card bg="secondary" text="light" className="mb-4 mt-4">
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Your Answer</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                placeholder="Write your answer here..."
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="mt-3"
                            onClick={handleSubmitAnswer}
                        >
                            Submit Answer
                        </Button>
                    </Card.Body>
                </Card>


                {answers.length > 0 ? (
                    answers.map((ans) => (
                        <Card key={ans._id} bg="secondary" text="light" className="mb-3">
                            <Card.Body>
                                <Card.Text>{ans.content}</Card.Text>
                                <div className="text-muted small">
                                    Answered by {ans.author?.username || "Anon"}
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No answers yet.</p>
                )}
            </Container>
        </div>
    );
};

export default QuestionDetail;
