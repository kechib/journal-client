import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { indexJournals } from '../../api/journals'

class JournalIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of the journals in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      journals: null
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
      <Link to={`/journals/${journal.id}`} key={journal.id}>
        <Button className="w-100" variant="primary">
          {journal.title}
        </Button>
      </Link>
    ))

    return (
      <div className="index">
        <h3>Journal Entries</h3>
        <Card>
          <Card.Title>See All Your Entries</Card.Title>
          <Card.Body>{journalsJsx}</Card.Body>
        </Card>
      </div>
    )
  }
}

export default JournalIndex
