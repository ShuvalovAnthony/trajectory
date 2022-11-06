import { CheckAuth } from "../auth/CheckAuth";
import { Logout } from "../auth/Logout";

const Header = () => {
    return (
        <header class="mb-auto">
            <div>
                <h3 class="float-md-start mb-0">Trajectory</h3>
                <nav class="nav nav-masthead justify-content-center float-md-end">
                    <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="/">Домой</a>
                    {CheckAuth() ? (
                        <>
                            <a class="nav-link fw-bold py-1 px-0 active" href="/courses">Курсы</a>
                            <a onClick={Logout} class="nav-link fw-bold py-1 px-0 active" href="/logout">Выйти</a>
                        </>
                    )
                        : (
                            <>
                                <a class="nav-link fw-bold py-1 px-0 active" href="/login">Войти</a>
                                <a class="nav-link fw-bold py-1 px-0 active" href="/register">Регистрация</a>
                            </>
                        )
                    }
                </nav>
            </div>
        </header>
    );
};

export default Header; 
