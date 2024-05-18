
function UpdateRequest(props) {
    return (
        <>
            <div className="my-3">
                ID: {props.request.registerGarden.id}
            </div >
            <div className="my-3">
                Tên mảnh vườn: {props.request.registerGarden.name}
            </div>
            <div className="my-3">
                Loại cây trồng: {props.request.registerGarden.type}
            </div>
            <div className="my-3">
                Vị trí: {props.request.registerGarden.location}
            </div>
            <div className="my-3">
                Diện tích: {props.request.registerGarden.area} hecta
            </div>
        </>
    )
}

export default UpdateRequest