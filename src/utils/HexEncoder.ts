export default class HexEncoder {
  public encode(input: string): string {
    const arr: string[] = Array.from(input);
    const hexArray: string[] = arr.map(this.charToHex);
    return hexArray.join('');
  }

  private charToHex(char: string): string {
    return char.charCodeAt(0).toString(16).padStart(2, '0');
  }
}