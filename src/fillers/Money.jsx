import React from 'react';

const Money = ({ value }) => {
    return (
        <>
        {Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
            }).format(value)}
        </>
    );
}

export default Money;