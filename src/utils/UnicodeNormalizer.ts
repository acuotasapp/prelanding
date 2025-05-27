export default class UnicodeNormalizer {
  constructor() { }

  public normalize(input: string): string {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[¿¡“”‘’«»]/g, "")
      .replace(/[^\p{L}\p{N}\p{P}\p{Z}\p{Emoji}]/gu, "");
  }

  public escapeUtf8(input: string): string {
    const escapedString: string = this.normalize(input)
    const arrayChar: string[] = escapedString.split("")
    const escapedChars: string[] = arrayChar.map(this.escapeUTF8Char)

    return escapedChars.join("")
  }

  private escapeUTF8Char(char: string): string {
    const code = char.codePointAt(0);
    return code && code > 127 ? `\\u{${code.toString(16)}}` : char;
  }
}