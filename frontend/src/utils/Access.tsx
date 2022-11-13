import { createResource, createSignal, createEffect } from "solid-js";


export const fetchCourseAccess = async (courseid: number) =>
(await fetch(`http://127.0.0.1:8000/api/v1/courseaccess/${courseid}/access_check/`,
    {
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + window.localStorage.getItem("AuthToken"),
        },
    }
)).json();



const [access, setAccess] = createSignal(true);

export function courseAccess(courseid: any) {
    const [course_access] = createResource(Number(courseid), fetchCourseAccess);
    
    createEffect(() => {
        if (course_access()) {
            const date = new Date(course_access().expire_date);
            const full_ac = course_access().full_access;
            var d = new Date();
            
            if (date >= d || full_ac) {
                setAccess(true)
            }
            else {
                setAccess(false)
            }
        }
    })
    return access()
    };