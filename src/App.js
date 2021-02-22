import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// importing Journal components
import JournalCreate from './components/Journals/JournalCreate'
import JournalIndex from './components/Journals/JournalIndex'
import JournalShow from './components/Journals/JournalShow'
import JournalEdit from './components/Journals/JournalEdit'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      journal: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setJournal = journal => this.setState({ journal })

  // Combining setUser and setJournal to avoid rendering twice and not having
  // the journal data ready.
  setUserJournal = data => this.setState({ user: data.user, journal: data.journal })

clearJournal = () => this.setState({ journal: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user, journal } = this.state

    return (
      <Fragment>
        <Header user={user} journal={journal}/>
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/home' render={() => (
            <Home msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-pw' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          {/* Journal Routes */}
          <AuthenticatedRoute user={user} path='/journals-create/' render={() => (
            <JournalCreate msgAlert={this.msgAlert} user={user} setUserJournal={this.setUserJournal}/>
          )} />
          <AuthenticatedRoute user={user} path='/journals/' render={() => (
            <JournalIndex msgAlert={this.msgAlert} user={user} setJournal={this.setJournal} setUserJournal={this.setUserJournal} />
          )} />
          <AuthenticatedRoute user={user} path='/journals-show/:journalId' render={() => (
            <JournalShow msgAlert={this.msgAlert} user={user} journal={journal} clearJournal={this.clearJournal} />
          )} />
          <AuthenticatedRoute user={user} path="/journals-edit/" render={() => (
            <JournalEdit msgAlert={this.msgAlert} user={user} editjournal={journal} setUserJournal={this.setUserJournal}/>
          )} />

        </main>
      </Fragment>
    )
  }
}

export default App
