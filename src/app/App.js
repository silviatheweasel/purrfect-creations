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
import { SummaryTableRow } from "../modules/SummaryTableRow";

function App() {
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(false);
  const [selectValue, setSelectValue] = useState({value: "5"});

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
  }, [selectValue]);

  if (isError) {
    return <p>Sorry, there has been an error loading data, please try again later.</p>
  }

  const createRecentOrdersTable = () => {
    const recentOrders = getRecentOrders(orders, parseInt(selectValue.value));
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

  const handleChange = (event) => {
    setSelectValue({value: event.target.value});
    event.preventDefault();
  }

  return (
    <div className="App">
      <header>
        <h1>Purrfect Creations Tracker</h1>
      </header>
      <main>
        <table>
          <tbody>
          <SummaryTableRow 
            title="Total Orders"
            value={getTotalOrders(orders)}
          />
          <SummaryTableRow 
            title="Total Orders This Month"
            value={getOrdersThisMonth(orders)}
          />
          <SummaryTableRow 
            title="Orders in Progress"
            value={getOrdersInProgress(orders)}
          />          
          <SummaryTableRow 
            title="Revenue"
            value={getRevenue(orders)}
          />         
          </tbody>
        </table>
        <div>
          <h2>Recent Orders</h2>
          <select value={selectValue.value} onChange={handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        {createRecentOrdersTable()}
      </main>
    </div>
  );
}

export default App;
