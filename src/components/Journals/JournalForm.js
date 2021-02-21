import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DateTimeField from 'react-bootstrap-datetimepicker'
const JournalForm = ({ journal, handleSubmit, handleChange, handleTimeChange }) => (
  <Form className="showJournal"
    onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label>Title</Form.Label>
      <Form.Control className= "input"
        placeholder="What's up with you?"
        // This name should line up with the state we want to change
        name='title'
        value={journal.title}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Content</Form.Label>
      <Form.Control
        placeholder='A Brief Desciption Of Your Day'
        // This name should line up with the state we want to change
        name='content'
        value={journal.content}
        onChange={handleChange}

      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Feelings</Form.Label>
      <Form.Control
        placeholder='How do you feel?'
        // This name should line up with the state we want to change
        name='feeling'
        value={journal.feeling}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Created</Form.Label>
      <DateTimeField
        // placeholder=""
        // This name should line up with the state we want to change
        name='created'
        value={journal.created}
        onChange={handleTimeChange}
      />
      <Button className='primary' variant="primary" type="submit">
        Submit
      </Button>
    </Form.Group>
  </Form>
)
export default JournalForm
