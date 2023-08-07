import React from 'react';

const SingleBondView = ({ bond }) => {
    const {expanded, ...other} = bond;
    bond = other;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="card" style={{width: '30rem', margin: '0 auto'}}>
            <div className="card-header bg-primary text-white">
                Bond Details
            </div>
            <ul className="list-group list-group-flush">
                {Object.entries(bond).map(([key, value]) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                        <span>{key.toLowerCase().includes('date') ? formatDate(value) : value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SingleBondView;
