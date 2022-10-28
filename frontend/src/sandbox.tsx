<For each={themes()}>{(theme: any, index: Accessor<number>) =>
                        <li class="mb-1">
                            <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={'#' + theme.title} aria-expanded="false">
                                {theme.title}
                            </button>
                            <div class="collapse" id={theme.title}>
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Overview</a></li>
                                    <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Updates</a></li>
                                    <li><a href="#" class="link-light d-inline-flex text-decoration-none rounded">Reports</a></li>
                                </ul>
                            </div>
                        </li>
                    }</For>