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
            var current_date = new Date();
            const user_expire_date = new Date(course_access().expire_date);

            const user_full_access = course_access().full_access;
            
            if (user_expire_date >= current_date || user_full_access) {
                setAccess(true)
            }
            else {
                setAccess(false)
            }
        }
    })
    return access()
    };

