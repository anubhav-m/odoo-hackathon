import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Badge, Spinner } from "react-bootstrap";

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);


    useEffect(() => {
        const fetchQuestionAndAnswers = async () => {
            try {
                const res = await fetch(`http://localhost:4500/api/question/${id}`);
                const data = await res.json();
                setQuestion(data.question);

                const answerRes = await fetch(`http://localhost:4500/api/answer/${id}`);
                const answerData = await answerRes.json();
                setAnswers(answerData.answers); // your backend returns { answers: [...] }

                setLoading(false);
            } catch (err) {
                console.error("Failed to load question or answers", err);
                setLoading(false);
            }
        };

        fetchQuestionAndAnswers();
    }, [id]);

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
            <Container className="text-light pt-5">
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
