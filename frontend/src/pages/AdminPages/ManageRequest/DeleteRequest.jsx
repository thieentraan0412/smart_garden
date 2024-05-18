

function DeleteRequest(props) {

    return (
        <>
            <div className="my-3">
                ID: {props.request.registerGarden.id}
            </div>
            <div className="my-3">
                Tên mảnh vườn: {props.request.registerGarden.name}
            </div>
        </>
    )
}

export default DeleteRequest