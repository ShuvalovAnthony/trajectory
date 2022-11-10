import Themes from '../apps/Themes'
import { CheckAuth } from "../auth/CheckAuth";
import { createSignal, createResource, createEffect, For, Accessor } from "solid-js";
import { fetchCourses } from "../apps/Utils";

// вынести темы отдельно
const Planpage = () => {
    const [courseId, setCourseId] = createSignal(0);
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
                                                            <button type="button" class="btn btn-light" onClick={() => setCourseId(course.id)}>Открыть</button>
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
