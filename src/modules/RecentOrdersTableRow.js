export const RecentOrdersTableRow = (order) => {
    const values = Object.values(order.order.fields);
    return (<tr key={order.order.id}>
       {values.map((value, i) => <td key={order.order.id + i}>{value}</td>)}
    </tr>)
}

export const RecentOrdersHeaderRow = (order) => {
    let keys = Object.keys(order.order.fields);
    return (<tr>
        {keys.map((key, i) => <th key={"recentOrdersHeader" + i}>{key.replace("_", " ").toUpperCase()}</th>)}
    </tr>)
}