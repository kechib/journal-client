import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Moment from 'moment'
import Spinner from 'react-bootstrap/Spinner'
import './JournalIndex.scss'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import { indexJournals } from '../../api/journals'

class JournalIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of the journals in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      journals: null,
      show: true
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    indexJournals(user)
      .then(res => this.setState({ journals: res.data.journals }))
      .then(() => msgAlert({
        heading: 'Loaded Journals Successfully',
        message: 'Journal Entries Are Here! Pick One!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Journals',
          message: 'Oops somethingwent wrong: ' + error.message
        })
      })
  }

  render () {
    // destructure our journals state
    const { journals } = this.state
    const { setJournal } = this.props
    // if we haven't fetched any journals yet from the API
    if (!journals) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>

      )
    }

    const journalsJsx = journals.map(journal => (

      <Link onClick={() => setJournal(journal)} to={`/journals-show/${journal.id}/`} key={journal.id}>
        <Card className="index-card">
          <div className="index">

            <div className="main-content">
              {/* evry time you click its going to set the user journal to what you click on */}
              <div className="moleskine-wrapper">
                <div className="moleskine-notebook">
                  <div className="notebook-cover blue">
                    <div className="notebook-skin"><Button className="w-100" variant="primary">
                      {journal.title}
                    </Button></div>
                  </div>
                  <div className="notebook-page ruled"></div>
                </div>
              </div>
            </div>
          </div>
          <Card.Footer>
            <small className="text-muted">{journal.created}</small>
          </Card.Footer>
        </Card>

      </Link>

    ))

    return (
      <CardGroup>
        <Card>
          <Card.Title className="card-title"><h1>See All Your Journal Entries<small>Hover on any notebook...</small></h1></Card.Title>
          <Card.Body>{journalsJsx}</Card.Body>
        </Card>
      </CardGroup>

    )
  }
}

export default JournalIndex
