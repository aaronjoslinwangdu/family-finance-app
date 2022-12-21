export const groupBy = (items, key, dateRange) => {
  return items.reduce((storage, item) => {
    let keyVal;
    switch(dateRange) {
      default:
      case 'day':
        keyVal = getDayOfYear(new Date(item[key]));
        break;
      case 'week':
        keyVal = getWeek(new Date(item[key]));
        break;
      case 'month':
        keyVal = new Date(item[key]).getMonth();
        break;
    }
    storage[keyVal] = storage[keyVal] || [];
    storage[keyVal].push(item);
    return storage;
  }, {});
}


const getDayOfYear = (date) => {
  const timestamp1 = Date.UTC(date.getFullYear(), date.getMonth(),date.getDate());
  const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);
  const differenceInMs = timestamp1 - timestamp2;
  return differenceInMs / 1000 / 60 / 60 / 24;
}


const getWeek = (curr) => {
  const start = new Date(curr.getFullYear(), 0, 1);
  const days = Math.floor((curr - start) / (24 * 60 * 60 * 1000));
  return Math.ceil(days / 7);
}