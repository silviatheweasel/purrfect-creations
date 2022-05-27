export const getTotalOrders = (orders) => {
    if (orders.records) {
      return orders.records.length;
    } 
    return "";
}

export const getOrdersThisMonth = (orders) => {
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const yearMonth = currentYear + "-" + currentMonth;
  if (orders.records) {
    const ordersThisMonth = orders.records.filter(orderObj => orderObj.createdTime.slice(0, 6) === yearMonth);
    return ordersThisMonth.length;
  }
  return "";
}

export const getOrdersInProgress = (orders) => {
    if (orders.records) {
      return orders.records.filter(orderObj => orderObj.fields.order_status === "in_progress").length;
    }
    return "";
}

export const getRevenue = (orders) => {
    if (orders.records) {
      const prices = orders.records.map(orderObj => Number(orderObj.fields.price));
      const revenue = prices.reduce((prevValue, currentValue) => prevValue + currentValue).toFixed(2);
      return revenue;
    }
    return "";
  }

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
  }
