import Themes from '../apps/Themes'
import { CheckAuth } from "../auth/CheckAuth";
import { createSignal, createResource, createEffect, For, Accessor, createMemo } from "solid-js";
import { fetchCourses } from "../apps/Utils";
import { useParams, A } from "@solidjs/router"


// вынести темы отдельно
const Planpage = (courseid: any) => {
    const params = useParams();

    const [courseId, setCourseId] = createSignal(params.courseid);
    const [courses, setCourses] = createSignal();
    const [courseList] = createResource(fetchCourses);


    createEffect(() => {
        if (courseList()) {
            setCourses(courseList().results);
        }
    })


    return (
        <>
            {CheckAuth() && courseId() ? (
                <Themes course={courseId()} />
            )
                :
                (
                    <>
                        <main class="px-3 text-center">
                            <p style="margin-bottom:1cm"></p>
                            <h1>Выберите курс</h1>
                            <br></br>
                            <div class="row justify-content-center">
                                    <For each={Object(courses())}>
                                        {(course: any, index: Accessor<number>) => {
                                            return <>
                                                <div class="col-3">
                                                    <div class="card text-bg-secondary">
                                                        <div class="card-body">
                                                            <h5 class="card-title">{ course.title }</h5>
                                                            <p class="card-text">{ course.description }</p>
                                                            <A href={String(course.id)} class="text-light"><h5>Открыть</h5></A>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        }
                                    </For>
                            </div>
                        </main>
                    </>
                )}
        </>
    );
};

export default Planpage;
