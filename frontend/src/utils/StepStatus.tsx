interface stepStatus{
    [key: string] : string
}

export function stepStatus (stepstatus: string) {
    let statuses:stepStatus = {
        'NS': '⚪️',
        'OW': '🟡',
        'WA': '🔴',
        'OK': '🟢',
    }
    return statuses[stepstatus]
}