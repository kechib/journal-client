import React, { Component, Fragment } from 'react'
import './ShowJournal.scss'
// Import withRouter to have access to "history"
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// import Iframe from 'react-iframe'
// import SpotifyPlayer from 'react-spotify-web-playback'
import Embed from 'react-music-embed'
import Spinner from 'react-bootstrap/Spinner'
import { showJournal, deleteJournal } from '../../api/journals'

class JournalShow extends Component {
  constructor (props) {
    super(props)

    // initially our journals state will be null, until it is fetched from the api
    this.state = {
      journal: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    // make a request for a single journal entry

    showJournal(user, match.params.journalId)
      // set the journals state, to the journals we got back in the response's data
      .then(res => this.setState({ journal: res.data.journal }))

      .then(() => msgAlert({
        heading: 'Showing Journal Successfully',
        message: 'The journal entry is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Journal Failed',
          message: 'Failed to show journals with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleDelete = event => {
    const { user, match, msgAlert, clearJournal } = this.props
    // const { id } = showjournal
    // const { journal } = this.state
    // make a delete axios request
    deleteJournal(user, match.params.journalId)
      // set the deleted variable to true, to redirect to the journals page in render
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted Journal Successfully!',
        message: 'Journal deleted!',
        variant: 'success'
      }))
      .then(() => clearJournal())
      .catch(error => {
        msgAlert({
          heading: 'Deleting Journal Failed',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    let journalJsx
    const { deleted, journal } = this.state
    // const { showjournal } = this.props

    // if we don't have a journals yet
    if (!journal) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the journals is deleted
    if (deleted) {
      // redirect to the journals index page
      return <Redirect to="/journals/" />
    } else {
      journalJsx = (
        <Fragment>
          <div className="displayJournal">
            <Card style={{ width: '50rem' }}>
              <Card.Body>
                <Card.Title>
                  <h3>Title: {journal.title}</h3>
                </Card.Title>
                <Card.Text>
                  <section>
                    <h3>Your Journal Entry:<p>{journal.content}</p></h3>
                  </section>
                </Card.Text>
                <Card.Text>
                  <section>
                    <h3>Feeling: <Embed url = {journal.feeling}/></h3>
                  </section>
                </Card.Text>
                <Card.Text>
                  <h3>Created: {journal.created}</h3>
                </Card.Text>
                <Button className='primary' variant="primary" onClick={this.handleDelete}>Delete Journal</Button>
                <Button>
                  <Link to={'/journals-edit/'}>Update Journal</Link>
                </Button>
              </Card.Body>
            </Card>
          </div>
          {/* {deleted ? <Redirect to="/journals/:journalId/"/> : journalJsx} */}
        </Fragment>
      )
    }
    return (
      <Fragment>
        <h2>Show Journals Page</h2>
        {deleted ? <Redirect to="/journals-show/:journalId/"/> : journalJsx}
      </Fragment>
    )
  }
}

export default withRouter(JournalShow)
