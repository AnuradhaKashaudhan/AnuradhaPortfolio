import assert from 'node:assert/strict'
import test from 'node:test'
import request from 'supertest'
import app from './index'

test('reports server health', async () => {
  const response = await request(app).get('/health')
  assert.equal(response.status, 200)
  assert.deepEqual(response.body, { status: 'ok' })
})

test('serves the client app for the root and SPA routes', async () => {
  for (const route of ['/', '/projects/nvis', '/resume/general']) {
    const response = await request(app).get(route)
    assert.equal(response.status, 200)
    assert.match(response.headers['content-type'], /text\/html/)
    assert.match(response.headers['cache-control'], /no-cache/)
    assert.match(response.text, /<div id="root"><\/div>/)
  }
})

test('serves public resume and certificate files from the client build', async () => {
  const resume = await request(app).get('/AnuradhaCVG.pdf')
  assert.equal(resume.status, 200)
  assert.match(resume.headers['content-type'], /application\/pdf/)

  const certificate = await request(app).get('/certificates/ai-ml-real-world.png')
  assert.equal(certificate.status, 200)
  assert.match(certificate.headers['content-type'], /image\/png/)
})

test('returns JSON for unknown API routes', async () => {
  const response = await request(app).get('/api/unknown')
  assert.equal(response.status, 404)
  assert.match(response.headers['content-type'], /application\/json/)
  assert.deepEqual(response.body, { error: 'API route not found.' })
})

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
  const payload = { name: 'A', email: 'invalid', message: 'short' }
  const responses = await Promise.all(Array.from({ length: 6 }, () => request(app).post('/api/contact').send(payload)))
  assert.equal(responses[5].status, 429)
})
