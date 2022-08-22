export class NotFoundError extends Error {
  constructor (paramName: string) {
    super(`this ${paramName} not found`)
    this.name = 'NotFoundError'
  }
}
