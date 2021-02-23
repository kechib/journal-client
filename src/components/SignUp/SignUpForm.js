import React, { Fragment } from 'react'

// Import react elements
import { Form, Button } from 'react-bootstrap'

const SignUpForm = ({ email, password, passwordConfirmation, onSignUp, handleChange }) => {
  return (
    <Fragment>
      <Form onSubmit={onSignUp}>
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
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={handleChange}

          />
        </Form.Group>
        <Form.Group controlId="passwordConfirmation">
          <Form.Control
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
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

export default SignUpForm
