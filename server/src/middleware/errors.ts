import { Request, Response, NextFunction } from 'express'

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Not Found' })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(err)
  }
  res.status(status).json({ message })
}

