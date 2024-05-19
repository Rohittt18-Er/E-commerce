import React from 'react';
import { Toast, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ChatBox = ({ toast, onClose, title }) => {
    return (
        <Toast show={toast} onClose={onClose} className="mx-auto">
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>
                <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                    {Array.from({ length: 30 }).map((_, idx) => (
                        <React.Fragment key={idx}>
                            <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                                <b>User wrote:</b> Hello, world! This is a chat message.
                            </p>
                            <p>
                                <b>Admin wrote:</b> Hello, world! This is a chat message.
                            </p>
                        </React.Fragment>
                    ))}
                </div>

                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Write a message</Form.Label>
                        <Form.Control as="textarea" rows={2} />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </Toast.Body>
        </Toast>
    );
};

ChatBox.propTypes = {
    toast: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default ChatBox;
