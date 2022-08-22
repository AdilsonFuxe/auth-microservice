export class ContactInUseError extends Error {
  constructor () {
    super('The received contact is already in use')
    this.name = 'ContactInUseError'
  }
}
