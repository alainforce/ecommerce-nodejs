
const holidays2025 = [
  '2025-01-01', '2025-01-06',
  '2025-02-02', '2025-02-04', '2025-02-11',
  '2025-03-13', '2025-03-15', '2025-03-29',
  '2025-04-21', '2025-05-01', '2025-05-31',
  '2025-06-02', '2025-06-05', '2025-06-06',
  // …others as needed
];
function isHoliday(date) {
  
  date.getDay()
  return holidays2025.includes(date.toISOString().split('T')[0]);
}

function addBusinessDays(startDate, daysToAdd = 3) {
  let date = new Date(startDate);
  let addedDays = 0;

 

  while (addedDays < daysToAdd) {
    date.setDate(date.getDate() + 1);

    const isSunday = date.getDay() === 0;
    const isHolidayFlag = isHoliday(date);

    if (!isSunday && !isHolidayFlag) {
      addedDays++;
    }
  }

  return date

}

export default addBusinessDays;