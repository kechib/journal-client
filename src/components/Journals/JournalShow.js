import React, { Component, Fragment } from 'react'

// Import withRouter to have access to "history"
import { withRouter, Redirect, Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'

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
    const { user, msgAlert, clearJournal, showjournal } = this.props
    const { id } = showjournal
    // make a delete axios request
    deleteJournal(user, id)
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
    const { deleted } = this.state
    const { showjournal } = this.props

    // if we don't have a journals yet
    if (!showjournal) {
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
      return <Redirect to="/journals" />
    } else {
      // if we have our journal
      journalJsx = (
        <Fragment>
          <h3>Title:{showjournal.title}</h3>
          <p>Your Entry: {showjournal.content}</p>
          <p>Feeling:{showjournal.feeling}</p>
          <button onClick={this.handleDelete}>Delete Journal</button>
          <button>
            <Link to={'/journals-edit/'}>Update Journal</Link>
          </button>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <h2>Show Journals Page</h2>
        {deleted ? <Redirect to="/journals/:journalId/"/> : journalJsx}
      </Fragment>
    )
  }
}

export default withRouter(JournalShow)
