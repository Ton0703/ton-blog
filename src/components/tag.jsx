import React from 'react'

function tag({name, count}) {
    return (
        <div className='tag'>
            <div className="tag-left">
                {name}
            </div>
            <div className="tag-right">
                {count}
            </div>
        </div>
    )
}

export default tag
