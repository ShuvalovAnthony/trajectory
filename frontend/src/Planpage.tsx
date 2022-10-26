import { createSignal, createResource, createEffect, For } from "solid-js";

const Planpage = () => {
    return (
        <main class="d-flex">
            <div class="flex-shrink-0 p-3 bg-dark" style="width: 250px;">
                <a class="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
                    <span class="fs-2 fw-semibold">Plans</span>
                </a>
                <ul class="list-unstyled ps-0">
                    <li class="mb-1">
                        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                            Home
                        </button>
                        <div class="collapse show" id="home-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Overview</a></li>
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Updates</a></li>
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Reports</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            Dashboard
                        </button>
                        <div class="collapse" id="dashboard-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Overview</a></li>
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Weekly</a></li>
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Monthly</a></li>
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Annually</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                            Orders
                        </button>
                        <div class="collapse" id="orders-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">New</a></li>
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Processed</a></li>
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Shipped</a></li>
                                <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Returned</a></li>
                            </ul>
                        </div>
                    </li>          
                </ul>
            </div>
        </main>

    );
};

export default Planpage; 
