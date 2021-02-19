import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { updateJournal } from '../../api/journals'
import JournalForm from './JournalForm'

class JournalEdit extends Component {
  constructor (props) {
    super(props)

    // initially our journals title and director will be empty until they are filled in
    this.state = {
      journal: {
        title: '',
        content: '',
        feeling: ''
      },
      // createdId will be null, until we successfully create a journal
      updated: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { journal } = this.state
    // console.log(match.params)
    // create a journal, pass it the journal data and the user for its token

    updateJournal(journal, user)
      // set the createdId to the id of the journal we just created
      .then(res => {
        this.setState({ updated: res.data.journal })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Journals Successfully Updated',
        message: 'Journals has been successfully updated.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Journals',
          message: 'Could not create journal with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()

    this.setState(state => {
      // return our state change
      return {
        // set the journal state, to what it used to be (...state.journal)
        // but replace the property with `name` to its current `value`
        // ex. name could be `title` or `director`
        journal: { ...state.journal, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    // destructure our journal and createdId state
    const { journal, updated } = this.state
    // if the journal has been created and we set its id
    if (updated) {
      // redirect to the journals show page
      return <Redirect to={`/journals/${journal.id}`} />
    }

    return (
      <Fragment>
        <h3>Edit Journals</h3>
        <JournalForm
          journal={journal}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default withRouter(JournalEdit)
