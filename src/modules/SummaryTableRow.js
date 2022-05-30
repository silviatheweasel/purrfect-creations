export const SummaryTableRow = ({title, value}) => {
    return (<tr>
        <th className="summary-table-header">{title}</th>
        <td className="summary-table-cell">{value}</td>
      </tr>)
}