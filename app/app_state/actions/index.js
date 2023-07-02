export const cellClicked = (cellIdentifier) =>{
    return {
        type: 'CELLCLICK',
        payload:{cellIdentifier}
    }
}
export const pieceMoved = () =>{
    return {
        type: 'PIECEMOVED'
    }
}