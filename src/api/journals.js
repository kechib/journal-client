import apiUrl from '../apiConfig'
import axios from 'axios'

export const createJournal = (user, journal) => {
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
  return axios({
    url: apiUrl + '/journals/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showJournal = (journalId, user, journal) => {
  return axios({
    url: apiUrl + '/journals/' + journalId,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateJournal = (user, journal) => {
  return axios({
    url: apiUrl + '/journal/',
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { journal }
  })
}

export const deleteJournal = user => {
  return axios({
    url: apiUrl + '/journal/',
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
