import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


import {
    Container,
    Row,
    Col,
    Button,
    Form,
    InputGroup,
    Badge,
    Card,
    Navbar,
    Nav,
} from "react-bootstrap";

const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page")) || 1;

    const [searchText, setSearchText] = useState("");      // For input field
    const [searchQuery, setSearchQuery] = useState("");    // Actual value used in URL


    useEffect(() => {
        let url = `http://localhost:4500/api/question?page=${page}&limit=9`;

        if (searchQuery) {
            url += `&search=${encodeURIComponent(searchQuery)}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data.questions || []);
                setTotalPages(Math.ceil((data.total || 0) / 9));
            })
            .catch((err) => console.error("Failed to fetch questions", err));
    }, [page, searchQuery]);

    const handleSearch = () => {
        setSearchParams({ page: 1 }); // Optional: reset to page 1 on search
        setSearchQuery(searchText);
    };


    return (
        <div className="bg-dark text-light min-vh-100">
            {/* Top Navbar */}
            <Navbar bg="dark" variant="dark" className="py-3">
                <Container>
                    <Navbar.Brand href="#" className="fs-3">StackIt</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Button variant="outline-light">Login</Button>
                    </Nav>
                </Container>
            </Navbar>


            <Container className="pt-3">
                {/* Filter + Search Row */}
                <Row className="align-items-center mb-4">
                    <Col md="auto">
                        <Button variant="primary">Ask New Question</Button>
                    </Col>

                    <Col>
                        <InputGroup>
                            <Form.Control
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            />
                            <Button variant="light" onClick={handleSearch}>🔍</Button>
                        </InputGroup>

                    </Col>
                </Row>

                {/* Question List */}
                <Row className="g-4">
                    <AnimatePresence>
                        {questions.map((q) => (
                            <motion.div
                                key={q._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Col md={12}>
                                    <Card bg="secondary" text="light" className="h-100 p-3" style={{ minHeight: "180px" }}>
                                        <Card.Body>
                                            <Card.Title>{q.title}</Card.Title>
                                            <Card.Text style={{ whiteSpace: "pre-line" }}>{q.description}</Card.Text>
                                            <div className="mb-2">
                                                {q.tags?.map((tag, i) => (
                                                    <Badge bg="dark" className="me-1" key={i}>{tag}</Badge>
                                                ))}
                                            </div>
                                            <div className="text-muted small">{q.author?.username ?? "Anon"}</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                </Row>


                {/* Pagination */}
                <Row className="mt-5 justify-content-center">
                    <Col md="auto">
                        <nav>
                            <ul className="pagination pagination-dark d-flex align-items-center gap-2">
                                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                    <button className="page-link bg-dark text-light" onClick={() => setSearchParams({ page: page - 1 })}>
                                        &lt;
                                    </button>
                                </li>

                                <li className="page-item disabled">
                                    <span className="page-link bg-dark text-light border-0">{page}</span>
                                </li>

                                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link bg-dark text-light" onClick={() => setSearchParams({ page: page + 1 })}>
                                        &gt;
                                    </button>
                                </li>
                            </ul>

                        </nav>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default HomePage;
