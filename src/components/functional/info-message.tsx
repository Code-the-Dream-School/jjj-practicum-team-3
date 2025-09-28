import React from 'react'

function InfoMessage({ message }: { message: string}) {
    return (
        <div className="border bg-gray-200 p-5 rounded-sm text-sm">{message}</div>
    )
}

export default InfoMessage