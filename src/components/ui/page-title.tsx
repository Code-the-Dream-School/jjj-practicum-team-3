import React from "react";

function PageTitle({title}: {title: string}) {
    return (
        <div className='text-xl font-bold text-primary'>
            {title}
        </div>
    )
}

export default PageTitle;