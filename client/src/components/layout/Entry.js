import React from 'react';

const Entry = () => {
    const dbRequest = () => {
        console.log('HHH');
    };

    return (
        <div>
            <button className='btn btn-primary' onClick={() => dbRequest()}>
                Register
            </button>
        </div>
    );
};

export default Entry;
