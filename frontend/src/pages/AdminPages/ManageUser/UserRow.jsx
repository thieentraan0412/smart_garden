import { useRef } from 'react';
import ViewUserModal from "./ViewUserModal";
import UpdateUserModal from "./UpdateUserModal";
import DisableUserModal from "./DisableUserModal";
import DeleteUserModal from "./DeleteUserModal";
function UserRow(props) {
    const trRef = useRef(null);
    return (
        <tr ref={trRef} className={props.user.status ? "text-muted" : undefined}>
            <td>{props.user.name}</td>
            <td>{props.user.account}</td>
            <td>{props.user.phone}</td>
            <td className="text-center">
                <ViewUserModal par={trRef} user={props.user} />
                <UpdateUserModal user={props.user} />
                <DisableUserModal user={props.user} />
                <DeleteUserModal user={props.user} />
            </td>
        </tr>
    );
}

export default UserRow;