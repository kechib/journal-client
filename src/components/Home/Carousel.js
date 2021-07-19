import Carousel from 'react-bootstrap/Carousel'
import React, { Component } from 'react'

export class BootstrapCarousel extends Component {
  render () {
    return (
      <div className="Carousel">
        <div className='container-fluid'>
          <div className="row title" >
            <div className="col-sm-8 btn btn-warning">
           How To Use JournalMia
            </div>
          </div>
        </div>
        <div className='container-fluid' style={{ display: 'block', width: 700, padding: 30 }}>
          <Carousel keyboard={false} pauseOnHover={true}>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={'https://media.giphy.com/media/9kcbwk0MCM85KPlbpw/giphy.gif'}
                alt="First slide"
              />
            </Carousel.Item >
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={'https://media.giphy.com/media/OuqAPIWuhFcIy8J3ZU/giphy.gif'}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={'https://media.giphy.com/media/5CGPYcex946PrNaT60/giphy.gif'}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={'https://media.giphy.com/media/dmDx0xUtiISMWxKaVT/giphy.gif'}
                alt="Forth slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>

      </div>

    )
  }
}

export default BootstrapCarousel
