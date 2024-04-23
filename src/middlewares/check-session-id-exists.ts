import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";

export async function checkSessionIdExists(req: FastifyRequest, reply: FastifyReply) {
  
  const sessionId = req.cookies.sessionId;

  if(!sessionId) {
    return reply.status(401).send({
      error: "Unauthorized action!"
    })
  }

}