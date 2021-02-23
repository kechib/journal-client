import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
const Home = ({ user }) => {
  const headingStyle = {
    color: '#000',
    padding: '50px 0'
  }

  const bodyStyle = {
    color: '#FFFF',
    fontSize: '24px',
    padding: '10px 0'
  }

  const boxStyle = {
    backgroundImage: 'url(https://media.giphy.com/media/65Fq73XuktUnB3IaPR/giphy.gif)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '450px'
  }
  const buttonStyle = {
    height: '50px',
    paddingBottom: '50px',
    alignItems: 'center'
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
      <Button className="homebutton" ><Link to={'/sign-up/'}>Create An Account</Link></Button>
      <Button className="homebutton"style={buttonStyle}><Link to={'/sign-in/'}>Sign In</Link></Button>
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
export default Home
