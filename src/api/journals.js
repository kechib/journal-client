import apiUrl from '../apiConfig'
import axios from 'axios'

export const createJournal = (user, journal) => {
  // console.log('journal is', journal)
  // console.log('user is', user)
  return axios({
    url: apiUrl + '/journals/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { journal }
  })
}

export const indexJournals = (user) => {
  // console.log('user.token is ', user.token)
  return axios({
    url: apiUrl + '/journals/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showJournal = (user, journalId) => {
  // console.log('journalId is ', journalId)
  // console.log('user.token is ', user.token)

  return axios({
    url: apiUrl + '/journals/' + journalId + '/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateJournal = (user, journal, id) => {
  // console.log('user is', user)
  return axios({
    url: apiUrl + '/journals/' + id + '/',
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { journal }
  })
}

export const deleteJournal = (user, journalId) => {
  return axios({
    url: apiUrl + '/journals/' + journalId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
