import assert from 'node:assert/strict'
import test from 'node:test'
import request from 'supertest'
import app from './index'

test('rejects invalid contact payloads', async () => {
  const response = await request(app).post('/api/contact').send({ name: 'A', email: 'not-an-email', message: 'short' })
  assert.equal(response.status, 400)
  assert.equal(response.body.error, 'Please check the form fields and try again.')
})

test('rejects honeypot submissions', async () => {
  const response = await request(app).post('/api/contact').send({
    name: 'Valid Name', email: 'valid@example.com', subject: '', message: 'A valid message here', website: 'bot',
  })
  assert.equal(response.status, 400)
  assert.equal(response.body.error, 'Unable to process this request.')
})

test('limits contact requests after five attempts', async () => {
  const payload = { name: 'Valid Name', email: 'valid@example.com', subject: '', message: 'A valid message here' }
  const responses = await Promise.all(Array.from({ length: 6 }, () => request(app).post('/api/contact').send(payload)))
  assert.equal(responses[5].status, 429)
})
