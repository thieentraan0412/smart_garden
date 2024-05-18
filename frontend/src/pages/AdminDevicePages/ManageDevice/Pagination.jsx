
function Pagination() {
    return (
        <div className="pagination my-5">
            <ul className="page d-flex text-center mx-auto">
                <li className="mx-2"><a href="#">&lt;</a></li>
                <li className="mx-2"><a href="#">1</a></li>
                <li className="mx-2"><a href="#">2</a></li>
                <li className="mx-2"><a href="#">...</a></li>
                <li className="mx-2"><a href="#">5</a></li>
                <li className="mx-2"><a href="#">&gt;</a></li>
            </ul>
        </div>
    );
}

export default Pagination;