import { CustomError } from './CustomError'

export class PrismaError extends CustomError {
  statusCode = 400

  constructor(public error: any) {
    super('Unexpected DB error')

    Object.setPrototypeOf(this, PrismaError.prototype)
  }

  serializeErrors() {
    if (this.error.code === 'P2002') {
      return this.error.meta.target.map((field: string) => {
        return { message: 'Field constraint failed', field: field }
      })
    } else {
      return { message: 'Unexpected DB error', field: null }
    }
  }
}
