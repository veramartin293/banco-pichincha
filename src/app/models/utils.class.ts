export class Utils {
  // dateString => yyyy-MM-dd
  static getDateObjFromString(dateString: string): Date {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);
    return date;
  }

  // return date in yyyy-MM-dd format
  static getformattedDateString(date: Date): string {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [
      date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  }
}
