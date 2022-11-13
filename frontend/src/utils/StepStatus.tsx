interface stepStatus{
    [key: string] : string
}

export function stepStatus(stepstatus: string) {
    let statuses:stepStatus = {
        'NS': '⚪️',
        'OW': '🟡',
        'WA': '🔴',
        'OK': '🟢',
    }
    return statuses[stepstatus]
}


export function isStep(step: any) {
    try { return step.title }
    catch { return false }
}