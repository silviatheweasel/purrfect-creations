import './App.css';
import { useState, useEffect } from "react";

import { 
  getTotalOrders, 
  getOrdersThisMonth, 
  getOrdersInProgress,
  getRevenue,
  getRecentOrders 
} from "../utilities/methods";

import { RecentOrdersTableRow, RecentOrdersHeaderRow } from "../modules/RecentOrdersTableRow";

function App() {
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const retriveData = async () => {
      const url = "https://api.airtable.com/v0/app8wLQrrIMrnn673";
      const apiKey = process.env.REACT_APP_API_KEY;
      const endpoint = url + "/Orders?api_key=" + apiKey;
      try {
          const data = await fetch(endpoint);
          const jsonData = await data.json();
          setOrders(jsonData);
      } catch(error) {
          setIsError(true);
      }
    }
    retriveData();
  }, []);

  if (isError) {
    return <p>Sorry, there has been an error loading data, please try again later.</p>
  }

  const createRecentOrdersTable = () => {
    const recentOrders = getRecentOrders(orders, 5);
    if (recentOrders) {
      return (<table>
        <thead>
          <RecentOrdersHeaderRow order={recentOrders[0]}/>
        </thead>
        <tbody>
          {recentOrders.map(order => <RecentOrdersTableRow order={order}/>)}
        </tbody>
      </table>)
    }
  }

  return (
    <div className="App">
      <header>Purrfect Creations</header>
      <main>
        <table>
          <tbody>
          <tr>
            <th>Total Orders</th>
            <td>{getTotalOrders(orders)}</td>
          </tr>
          <tr>
            <th>Total Orders This Month</th>
            <td>{getOrdersThisMonth(orders)}</td>
          </tr>
          <tr>
            <th>Orders in Progress</th>
            <td>{getOrdersInProgress(orders)}</td>
          </tr>
          <tr>
            <th>Revenue</th>
            <td>{getRevenue(orders)}</td>
          </tr>
          </tbody>
        </table>
        <div>Recent Orders</div>
        {createRecentOrdersTable()}
      </main>
    </div>
  );
}

export default App;
