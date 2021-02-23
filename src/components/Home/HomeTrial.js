import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// Importing the sign up and sign in component
// import SignUpForm from './../SignUp/SignUpForm'
// import SignInForm from './../SignIn/SignInForm'

// Importing components for sign in and sign up submit handlers
import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// // Home SCSS
// import './Home.scss'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      signIn: {
        email: '',
        password: ''
      },
      signUp: {
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }
  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { user } = this.props
    const { email, password, passwordConfirmation } = this.state
    // const { signIn, signUp } = this.state

    const headingStyle = {
      color: '#000',
      padding: '50px 0'
    }

    const bodyStyle = {
      color: '#000',
      fontSize: '24px',
      padding: '10px 0'
    }

    const boxStyle = {
      backgroundImage: 'url(https://media.giphy.com/media/65Fq73XuktUnB3IaPR/giphy.gif)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '450px'
    }

    const authorizedJsx = (
      <Fragment>
        <div className="col-12 col-lg-4 col-md-4 col-sm-12">
          <div className="box">
            <p className="text-center">Placeholder</p>
          </div>
        </div>
        <div className="col-12 col-lg-8 col-md-8 col-sm-12">
          <div className="box">
            <h3 className="text-center" style={headingStyle}>Come Chat With Oi App</h3>
          </div>
        </div>
      </Fragment>
    )

    const unauthorizedJsx = (
      <Fragment>
        <div className="col-12 col-lg-4">
          <div className="section-title">Sign In</div>
          <div className="box">
            <h3>Sign In</h3>
            <Form onSubmit={this.onSignIn}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                  Submit
              </Button>
            </Form>
          </div>
          <div className="col-12 col-lg-4">
            <h3>Sign Up</h3>
            <Form onSubmit={this.onSignUp}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="passwordConfirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  required
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                    Submit
              </Button>
            </Form>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="section-title-spacer"></div>
          <div className="box mb-3" style={boxStyle}></div>
          <div className="box mb-3">
            <h3 className="text-center m-0" style={bodyStyle}>A Journal that plays your tunes!</h3>
          </div>
        </div>
      </Fragment>
    )

    return (
      <Fragment>
        <div className="row">
          { user ? authorizedJsx : unauthorizedJsx }
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Home)
