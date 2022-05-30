//Returning the length of the array of orders
export const getTotalOrders = (orders) => {
  if (orders.records) {
    return orders.records.length;
  } 
  return "";
}

//Creating a string using the current year and month in the form of "YYYY-MM"
//Finding matching filter results in the array of orders whose value of "order_placed" start with the same year and month
//Returning the length of matching results
export const getOrdersThisMonth = (orders) => {
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const yearMonth = currentYear + "-" + currentMonth;
  if (orders.records) {
    const ordersThisMonth = orders.records.filter(orderObj => orderObj.fields.order_placed.slice(0, 6) === yearMonth);
    return ordersThisMonth.length;
  }
  return "";
}

//Finding filter results in the array of orders whose value of "order_status" match "in_progress"
//Returning then length of matching results
export const getOrdersInProgress = (orders) => {
  if (orders.records) {
    return orders.records.filter(orderObj => orderObj.fields.order_status === "in_progress").length;
  }
  return "";
}

//Creating an array "prices" that contains the price of each item in the array of orders
//Using "reduce" method to calculate the total amount
export const getRevenue = (orders) => {
  if (orders.records) {
    const prices = orders.records.map(orderObj => Number(orderObj.fields.price));
    const revenue = prices.reduce((prevValue, currentValue) => prevValue + currentValue).toFixed(2);
    return revenue;
  }
  return "";
  }

//Parsing the value of "order_place" into the number of milliseconds since Jan 1, 1970 and comparing and sorting them in a descending order
export const getRecentOrders = (orders, numOfOrders) => {
  if (orders.records) {
    const compare = (a, b) => {
      if (Date.parse(a.fields.order_placed) < Date.parse(b.fields.order_placed)) {
        return 1;
      } else if (Date.parse(a.fields.order_placed) > Date.parse(b.fields.order_placed)) {
        return -1;
      } else {
        return 0;
      }
    }
    return orders.records.sort(compare).slice(0, numOfOrders);
  }
  return "";
}