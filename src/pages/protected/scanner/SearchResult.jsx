import { useLocation, useNavigate } from "react-router-dom";

export default function SearchResults() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const results = state?.results || [];

    if (results.length === 0) {
        return <h1 className="text-center text-red-500">No results found</h1>;
    }

    return (
        <div className="p-6 text-white">
            <h1 className="text-xl mb-4">Search Results</h1>

            <table className="min-w-full bg-gray-800">
                <thead>
                    <tr className="bg-gray-700">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {results.map((user) => (
                        <tr key={user._id} className="text-center border-b">
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>

                            <td>
                                <button
                                    onClick={() => navigate(`/scanner/ticket/${user._id}`)}
                                    className="bg-blue-600 px-3 py-1 rounded"
                                >
                                    View Ticket
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}