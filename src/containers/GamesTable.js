import {useTable} from "react-table";
import {useMemo} from "react";

export default function GamesTable(props) {

    const columns = useMemo(() => [
            {
                "Header": "Name",
                "accessor": "name",
                "show": false,
                Cell: (cell) => (
                    <div className="columns is-variable is-1 is-vcentered mr-2">
                        <div className="column is-6  is-centered">
                            <figure className="image is-256x256"
                            >
                                <img src={cell.row.original.background_image} alt="game" style={{
                                    // maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)",
                                    // WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%",
                                    maxHeight: "256px",
                                    maxWidth: "256px",
                                    objectFit: "cover"
                                }}/>
                            </figure>
                        </div>
                        <div className="column is-4 is-left">
                            <p className="title is-6">{cell.row.original.name}</p>
                        </div>
                        <div className="column is-2" style={{display: "flex"}}>
                            <button className="button" onClick={() => props.selectedCallback(cell.row.original)}>
                                <span className="icon is-large has-text-grey">
                                    <i className="fas fa-3x fa-caret-right"/>
                                </span>
                            </button>
                        </div>
                    </div>
                )
            }
        ],
        [props]
    );

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
    } = useTable({
            columns,
            data: props.data
        }
    )

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
