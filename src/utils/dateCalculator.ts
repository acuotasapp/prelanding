export interface IDateCalculator {
  getDates(): string[];
}

export class DateCalculator implements IDateCalculator {
  private today: Date;
  private dates: string[];
  private currentMonth: number;
  private currentYear: number;
  private VALID_DAYS: number[] = [15, 30];
  private installments: number;

  constructor(installments: number) {
    this.installments = installments;
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0); // Normaliza a medianoche
    this.dates = [this.formatDate(this.today)];
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
  }

  public getDates(): string[] {
    this.calculateDates();
    return this.dates
  }

  private calculateDates(): void {
    while (this.dates.length < this.installments) {
      for (const day of this.VALID_DAYS) {
        const date = this.calculateDate(day);
        if (!this.isValidDate(date, day)) continue;
        if (!this.isFarEnough(date)) continue;

        this.dates.push(this.formatDate(date));
        if (this.dates.length === this.installments) break;
      }

      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
    }
  }

  private calculateDate(day: number) {
    return new Date(this.currentYear, this.currentMonth, day)
  }

  private isValidDate(date: Date, day: number): boolean {
    return date.getDate() === day;
  }

  private isFarEnough(date: Date): boolean {
    const differenceInDays = Math.ceil((date.getTime() - this.today.getTime()) / (1000 * 60 * 60 * 24));
    return differenceInDays > 3;
  }

  private formatDate(date: Date): string {
    const dd = date.getDate().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
}


