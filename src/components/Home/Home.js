import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import BootstrapCarousel from './Carousel.js'
const Home = ({ user }) => {
  // const headingStyle = {
  //   border: '10px solid white',
  //   backgroundColor: '#af499a',
  //   width: '800px'
  //   // padding: '50px 0'
  // }

  const bodyStyle = {
    color: '#FFFF',
    fontSize: '24px',
    padding: '10px 0'
  }

  const boxStyle = {
    backgroundImage: 'url(https://media4.giphy.com/media/37QGcaJlyeVd5xouGB/giphy.gif)',
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
    height: '450px',
    width: '400px'
  }
  const buttonStyle = {
    height: '80px',
    // paddingBottom: '50px'
    display: 'inline-block',
    marginRight: '10px'

  }

  const authorizedJsx = (
    <Fragment>
      <BootstrapCarousel></BootstrapCarousel>
      <ListGroup horizontal>
        <ListGroup.Item disabled>How to Grab a Link From Apple Music</ListGroup.Item>
        <ListGroup.Item variant="info"> Step One: Go To Apple Music</ListGroup.Item>
        <ListGroup.Item variant="info"> Step Two: Search For Your Artist!</ListGroup.Item>
        <ListGroup.Item variant="info">Step Three: Go to the Menu of Your Song Choice</ListGroup.Item>
        <ListGroup.Item variant="info">Step Four: Scroll To Share, Then Select Copy Link!</ListGroup.Item>
        <ListGroup.Item variant="info">Step Five: Add Your Link to the Feelings Section of `Create Your Journal Entries`!</ListGroup.Item>
        <ListGroup.Item variant="info">Step Six: View Your Entry And Listen To Your Tune!</ListGroup.Item>
        <Button href="https://music.apple.com/us/browse" target="_blank">Start Here!</Button>
      </ListGroup>

      { /*   <div className="col-12 col-lg-4 col-md-4 col-sm-12">
        <div className="box" style={headingStyle}>
          <h2>Welcome To JournalMia</h2>
          <h3>Information About this site</h3>
          <p className="text-center">Journal Mia is an online Journal where you write your personal journal entries about whatever you want. Describe your feelings in songs grabbing an embedded link from Apple Music!</p>
          <section><h2>How to Grab an embedded Link From Apple Music</h2>
            <ul><li>1: Go To Apple Music, In a new tab, go to <span className='link'>`https://music.apple.com/us/browse`</span></li>
              <li>2: Search For the sing of your choice!</li>
              <li>3: Go to the song options and look for the <span>`share`</span> option</li>
              <li>4: Select the <span>`copy link` option</span></li>
              <li>5: Fill Out The Form & Add the embedded link copy to to the <span>`feelings`</span> section of the Create Entry form <span className='link'><Link to='/journals-create/'><span className='create-link'>Create Entry Here</span></Link></span></li>
              <li>6: Go to View All My Entries section To view Your Entry!</li>
            </ul></section>
        </div>
      </div>
        // <div className="col-12 col-lg-8 col-md-8 col-sm-12">
      //   <div className="box">
      //     <h3 className="text-center" >Come Chat With Oi App</h3>
      //   </div>
      </div> */}
    </Fragment>
  )
  const unauthorizedJsx = (
    <Fragment>
      <div className="col-12 col-lg-8">
        <div className="section-title-spacer"></div>
        <div style={boxStyle}></div>
        <div className="box mb-3">
          <h3 className="text-center m-0" style={bodyStyle}>A Journal that plays your tunes!</h3>
        </div>
        <Button className="homebutton" style={buttonStyle}><Link to={'/sign-up/'}>Create An Account</Link></Button>
        <Button className="homebutton"style={buttonStyle}><Link to={'/sign-in/'}>Sign In</Link></Button>
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
