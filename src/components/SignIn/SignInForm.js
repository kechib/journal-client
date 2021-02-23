import React, { Fragment } from 'react'

// Import react elements
import { Form, Button } from 'react-bootstrap'

const SignInForm = ({ email, password, onSignIn, handleChange }) => {
  return (
    <Fragment>
      <Form onSubmit={onSignIn}>
        <Form.Group controlId="email">
          <Form.Control
            required
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}

          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            required
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}

          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="w-100"
        >
          Submit
        </Button>
      </Form>
    </Fragment>
  )
}

export default SignInForm
