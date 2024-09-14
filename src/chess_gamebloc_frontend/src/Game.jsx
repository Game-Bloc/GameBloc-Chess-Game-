import React, { useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import CustomDialog from './components/CustomDialog';

function Game({players, room, orientation, cleanup}) {
    
    const chess = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(chess.fen());
    const [over, setOver] = useState("");

    // the function for onDrop of pieces
    function onDrop(params) {
        
    }

    // rendered Chess UI
    return (
        <>
            <div className='board'>
                <Chessboard position={fen} onPieceDrop={onDrop} />
            </div>
            <CustomDialog 
                open={Boolean(over)}
                title={over}
            />
        </>
    )

}






