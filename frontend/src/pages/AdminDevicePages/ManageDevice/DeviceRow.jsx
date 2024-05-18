import ViewDeviceModal from "./ViewDeviceModal";
import UpdateDeviceModal from "./UpdateDeviceModal";
import DisableDeviceModal from "./DisableDeviceModal";
import DeviceType from "../DeviceType/DeviceType";

function DeviceRow(props) {
    
    // props = props.filter(props => props.device.type === window.TYPE);
    return (
        // <tr ref={trRef} className={props.device.status == "bình thường" ? "text-muted" : undefined}>
        <tr>
            <td>{props.device.id}</td>
            <td>{props.device.name}</td>
            <td>({props.device.coordinates.x},{props.device.coordinates.y})</td>
            <td>{props.device.install_date}</td>
            <td className={props.device.status ?  undefined: "text-danger"}>{props.device.status ? "Hoạt động" : "Đang hỏng"}</td>
            <td className="text-center">
                <ViewDeviceModal device={props.device} />
                <UpdateDeviceModal device={props.device} />
                <DisableDeviceModal device={props.device} />
            </td>
        </ tr>
    );
}

export default DeviceRow;