import { Request, Response } from 'express'

export async function check(_: Request, res: Response) {
  res.send('ok')
}
