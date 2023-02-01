import { describe, test } from '@jest/globals';
import superTest from 'supertest';
import Server, { Database } from '../../src/server.js';

describe('API E2E Test Suite', () => {
  afterEach(() => {
    Database.clear();
  });
  
  test('POST / -> Should save an item and return ok', async () => {
    const response = await superTest(Server).post('/').send({
      nome: 'Rodrigo Lourenço',
      age: 20
    })
    
    const expectedResponse = { ok: 1 }
    
    expect(JSON.parse(response.text)).toStrictEqual(expectedResponse)
  })
  
  test('GET / -> Should return an array', async () => {
    const response = await superTest(Server).get('/')

    const data = JSON.parse(response.text)

    expect(data).toBeInstanceOf(Array)
    expect(data.length).toEqual(0)
  })
  
  test('DELETE / -> Should clear database', async () => {
    const response = await superTest(Server).delete('/')

    const expectedResponse = { ok: 1 }
    const data = JSON.parse(response.text)

    expect(data).toStrictEqual(expectedResponse)
  })
})