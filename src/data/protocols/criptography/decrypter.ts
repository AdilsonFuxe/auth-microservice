export interface Decrypter {
  decrypt: (value: string) => Promise<string|null>
}
