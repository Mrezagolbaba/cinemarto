export const getYear = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    return year;
}