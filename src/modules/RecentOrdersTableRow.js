export const RecentOrdersHeaderRow = ({order}) => {
    let keys = Object.keys(order.fields);
    return (<tr className="recent-orders-header-row">
        {keys.map((key, i) => <th key={"recentOrdersHeader" + i}>{key.replace("_", " ").toUpperCase()}</th>)}
    </tr>)
}

export const RecentOrdersTableRow = ({order}) => {
    const values = Object.values(order.fields);
    return (<tr key={order.id}>
       {values.map((value, i) => <td key={order.id + i}>{value}</td>)}
    </tr>)
}
