import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod"
import { randomUUID } from "crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", async (req, reply) => {

    // Create a Transaction
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"])
    })

    const { title, amount, type } = createTransactionBodySchema.parse(req.body);

    let { sessionId } = req.cookies;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie('sessionId', sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 7 days 
      })
    }


    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId
    })

    return reply.status(201).send()
  })

  // Get all transactions
  app.get("/", {
    preHandler: [checkSessionIdExists]
  }, async (req, reply) => {
    const { sessionId } = req.cookies;

    const transactions = await knex("transactions").where("session_id", sessionId);

    return reply.status(200).send({ transactions })
  })

  // Get by a ID
  app.get("/:id", {
    preHandler: [checkSessionIdExists]
  }, async (req, reply) => {
    const { sessionId } = req.cookies;

    const createTransactionIDSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = createTransactionIDSchema.parse(req.params)

    const transaction = await knex("transactions").where({
      session_id: sessionId,
      id
    }).first()

    if (!transaction) {
      return reply.status(404).send("The transaction was not found!")
    }

    return reply.status(200).send(transaction)
  })


  // getting a resume about transactions
  app.get("/summary", {
    preHandler: [checkSessionIdExists]
  }, async (res, suply) => {
    const { sessionId } = res.cookies;

    const summary = await knex("transactions")
      .where("session_id", sessionId)
      .sum("amount", { as: "amount" })

    return suply.status(200).send({ summary })
  })
}