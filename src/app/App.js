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
  const [recordsToDisplay, setRecordesToDisplay] = useState([]);

  useEffect(() => {
    const retriveData = async () => {
      const url = "https://api.airtable.com/v0/app8wLQrrIMrnn673";
      const apiKey = process.env.REACT_APP_API_KEY;
      const endpoint = url + "/Orders?api_key=" + apiKey;
      try {
        const data = await fetch(endpoint);
        const jsonData = await data.json();
        const recentOrders = getRecentOrders(jsonData, parseInt(selectValue.value));
        setOrders(jsonData);
        setRecordesToDisplay(recentOrders);
      } catch(error) {
        setIsError(true);
      }
    }
    retriveData();
  }, [selectValue, recordsToDisplay]);

  if (isError) {
    return <p>Sorry, there has been an error loading data, please try again later.</p>
  }

  const createRecentOrdersTable = (recordsToDisplay) => {
    if (recordsToDisplay) {
      return (<table class="recent-orders-table">
        <thead class="recent-records-header">
          <RecentOrdersHeaderRow order={recordsToDisplay[0]}/>
        </thead>
        <tbody>
          {recordsToDisplay.map(order => <RecentOrdersTableRow order={order}/>)}
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
        <h1>Purrfect Creations Order Summary</h1>
      </header>
      <main>
        <table class="summary-table">
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
        <div class="recent-orders-wrapper">
          <div class="order-selector-wrapper">
            <h2>Recent Orders</h2>
            <select value={selectValue.value} onChange={handleChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div class="recent-orders-container">
            {recordsToDisplay.length > 0 && createRecentOrdersTable(recordsToDisplay)}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
