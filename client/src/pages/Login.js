import { Card, Form, Button } from "react-bootstrap";
const Login = () => {
  const LoginBox = () => (
    <Card className="w-50 mx-auto">
      <Card.Body>
        <Card.Title className="mb-3">Login</Card.Title>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter username here"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password here"
            />
          </Form.Group>
          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
  return (
    <div>
      <LoginBox />
    </div>
  );
};
export default Login;
