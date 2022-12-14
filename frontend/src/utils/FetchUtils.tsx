export const fetchStep = async (stepid: number) =>
    (await fetch(`http://${import.meta.env.VITE_URL_ADRESS_PORT8}/api/v1/step/${stepid}/`,
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
    (await fetch(`http://${import.meta.env.VITE_URL_ADRESS_PORT8}/api/v1/stepstatus/${stepid}/step_status_check/`,
        {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
            },
        }
    )).json();


export async function fetchThemes() {
    return (await fetch(`http://${import.meta.env.VITE_URL_ADRESS_PORT8}/api/v1/theme/`)).json()
}

export async function fetchCourses() {
    return (await fetch(`http://${import.meta.env.VITE_URL_ADRESS_PORT8}/api/v1/course/`)).json()
}


export const fetchThemesByCourse = async (courseid: number) =>
    (await fetch(`http://${import.meta.env.VITE_URL_ADRESS_PORT8}/api/v1/theme/${courseid}/theme_by_course/`,
        {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
            },
        }
    )).json();


export async function fetchSteps() {
    return (await fetch(`http://${import.meta.env.VITE_URL_ADRESS_PORT8}/api/v1/step/steps_by_theme_with_status/`,
        {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
            },
        }
    )).json()
}



export const setStepStatus = async (stepid: number, stepstatusid: number, status: string) =>
(await fetch(`http://${import.meta.env.VITE_URL_ADRESS_PORT8}/api/v1/stepstatus/${stepstatusid}/`,
    {
        method: 'PUT',
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
        },
        body: JSON.stringify({
            "status": status,
            "step": stepid
        })
    }
));


export const fetchNotes = async (stepid: number) =>
(await fetch(`http://${import.meta.env.VITE_URL_ADRESS_PORT8}/api/v1/note/${stepid}/note_by_step/`,
    {
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
        },
    }
)).json();