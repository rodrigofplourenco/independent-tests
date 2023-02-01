import { randomUUID } from 'crypto'
import { once } from 'events'
import { createServer } from 'http'

export const Database = new Map()

function respondJson(data, response) {
  return response.end(JSON.stringify(data))
}

async function handler(request, response) {
  const { method } = request

  if (method === 'GET') {
    return respondJson([...Database.values()], response)
  }

  if (method === 'POST') {
    const body = JSON.parse(await once(request, 'data'))

    const id = randomUUID()

    Database.set(id, body)

    console.log('Recebido', body);

    return respondJson({ ok: 1}, response)
  }

  if (method === 'DELETE') {
    Database.clear()
    
    return respondJson({ ok: 1}, response)
  }
}

export default createServer(handler)