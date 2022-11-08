export const fetchStep = async (stepid: number) =>
    (await fetch(`http://127.0.0.1:8000/api/v1/step/${stepid}/`,
        {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
            },
        }
    )).json();


export const fetchStepStatus = async (stepid: number) =>
    (await fetch(`http://127.0.0.1:8000/api/v1/stepstatus/${stepid}/step_status_check/`,
        {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
            },
        }
    )).json();


export const stepStatusOK = async (stepid: number,stepstatusid: number) =>
    ( await fetch(`http://127.0.0.1:8000/api/v1/stepstatus/${stepstatusid}/`,
    {
        method: 'PUT',
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
        },
        body: JSON.stringify({
            "status": "OK",
            "step": stepid
        })
    }
    ));
