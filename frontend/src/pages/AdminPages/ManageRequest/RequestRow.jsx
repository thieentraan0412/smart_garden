import { useRef } from "react";
import del from "../../../assets/delete.png";
import ViewRequestModal from "./ViewRequestModal";
import DeleteRequestModal from "./DeleteRequestModal";
function RequestRow(props) {
    const trRef = useRef(null);
    return (
        <tr ref={trRef} className={props.request.status ? "text-muted" : undefined}>
            <td>{props.request.name}</td>
            <td>{props.request.sender}</td>
            <td>{props.request.date}</td>
            <td>
                < ViewRequestModal par={trRef} request={props.request} />
                < DeleteRequestModal request={props.request} />
            </td>
        </tr>
    );
}

export default RequestRow;