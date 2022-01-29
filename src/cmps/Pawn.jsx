import React, { useEffect, useState } from 'react';


export function Pawn({pawnType}) {

    const [pawnColor, setPawnColor] = useState('')

    useEffect(() => {
        if (pawnType.includes('black')) setPawnColor('pawn-black')
        if (pawnType.includes('white')) setPawnColor('pawn-white')
        if (pawnType.includes('clue')) setPawnColor('pawn-clue')
        if (pawnType === 'blank') setPawnColor('')
    }, [pawnType])

    return (
        <div className="pawn-container">
            <div className={pawnColor}></div>
        </div>
    )
}