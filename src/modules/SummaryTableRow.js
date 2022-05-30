export const SummaryTableRow = ({title, value}) => {
    return (<tr>
        <th class="summary-table-header">{title}</th>
        <td class="summary-table-cell">{value}</td>
      </tr>)
}