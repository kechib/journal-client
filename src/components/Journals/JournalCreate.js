import React, { Component, Fragment } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Redirect } from 'react-router-dom'

import { createJournal } from '../../api/journals'
import JournalForm from './JournalForm'

class JournalCreate extends Component {
  constructor (props) {
    super(props)

    // initially our journals title, content, and feeling will be empty until they are filled in
    this.state = {
      journal: {
        title: '',
        content: '',
        feeling: ''

      },
      // createdId will be null, until we successfully create a journal
      created: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { journal } = this.state
    console.log('this is the user', user)
    // create a journal, pass it the journal data and the user for its token
    createJournal(journal, user)
      // set the createdId to the id of the journal we just created
      // .then(res => this.setState({ createdId: res.data.journal._id }))
      .then(res => {
        this.setState({ created: true })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Journal Successfully',
        message: `Journal has been created successfully. You a definitely ${res.data.journal.feeling}!`,
        variant: 'success'
      }))
      .catch(error => {
        if (error.response.status === 422) {
          msgAlert({
            heading: 'Failed to Create Journal',
            message: 'A user can not have more than 1 journal',
            variant: 'danger'
          })
        } else {
          msgAlert({
            heading: 'Failed to Create Journal',
            message: 'Could not create journal with error: ' + error.message,
            variant: 'danger'
          })
        }
      })
  }

  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()

    // change the state
    this.setState(state => {
      // return our state changge
      return {
        // set the journal state, to what it used to be (...state.journal)
        // but replace the property with `name` to its current `value`
        // ex. name could be `title` or `director`
        journal: { ...state.journal, [event.target.name]: event.target.value }
      }
    })
  }

  addEmoji = event => {
    const emoji = event.native
    this.setState({
      feeling: this.state.feeling + emoji
    })
  }

  render () {
    // destructure our journal and createdId state
    const { journal, created } = this.state

    // if the journal has been created and we set its id
    if (created) {
      // redirect to the journals show page
      return <Redirect to={`/journals/${journal.title}`} />
    }

    return (
      <Fragment>
        <h3>Create A Journal Entry</h3>

        <JournalForm
          journal={journal}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          addEmoji={this.addEmoji}
        />
        <Picker onSelect={this.addEmoji} />
      </Fragment>
    )
  }
}

export default JournalCreate