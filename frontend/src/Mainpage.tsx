import { createSignal, createResource, createEffect, For } from "solid-js";

const Main = () => {
    return (
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header class="mb-auto">
                <div>
                    <h3 class="float-md-start mb-0">Trajectory</h3>
                    <nav class="nav nav-masthead justify-content-center float-md-end">
                        <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>
                        <a class="nav-link fw-bold py-1 px-0" href="#">Plans</a>
                        <a class="nav-link fw-bold py-1 px-0" href="#">Explore</a>
                    </nav>
                </div>
            </header>

            <main class="px-3">
                <h1>Trajectory</h1>
                <p class="lead"> - is a web service to improve your self learning expirience</p>
                <p class="lead">
                    <a href="#" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
                </p>
            </main>

            <footer class="mt-auto text-white-50">
                <p><a href="https://t.me/a_s_shuv" target="_blank" class="text-white">a_s_shuv</a></p>
            </footer>
        </div>
    );
};

export default Main; 
