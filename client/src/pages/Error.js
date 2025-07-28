import { Link } from "react-router-dom";

function Error() {
    return (
        <section className="card home-card text-center">
            <h1 className="error-title">Something went wrong</h1>
            <Link to="/" className="btn-primary" style={{ marginTop: '1.5em' }}>Go Home</Link>
        </section>
    );
}

export default Error;