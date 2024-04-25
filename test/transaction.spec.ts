import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from 'supertest'
import { execSync } from "child_process";
import { app } from "../src/app";

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  })

  afterAll(async () => {
    await app.close();
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })


  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)

    const cookies = createTransactionResponse.get('Set-Cookie')!

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000
      })
    ])
  })

  it('should be able to list a specific transaction by id', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)

    const cookies = createTransactionResponse.get('Set-Cookie')!

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionID = listTransactionsResponse.body.transactions[0].id;

    const transaction = await request(app.server)
      .get(`/transactions/${transactionID}`)
      .set('Cookie', cookies)


    expect(transaction.body).toEqual(expect.objectContaining({
      title: 'New transaction',
      amount: 5000
    }))
  })

  it.only('should be able to get a summary', async () => {
    const createFirstTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)

    const cookies = createFirstTransactionResponse.get('Set-Cookie')!

    const createSecondTransactionReponse = await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit Transaction',
        amount: 2000,
        type: 'debit',
      })


    const summaryTransactions = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)

    console.log(summaryTransactions.body)

    expect(summaryTransactions.body.summary).toEqual([{
      amount: 3000
    }])
  })

})