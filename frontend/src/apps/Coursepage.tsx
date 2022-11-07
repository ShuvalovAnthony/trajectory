import Themes from '../apps/Themes'
import { CheckAuth } from "../auth/CheckAuth";

// вынести темы отдельно
const Planpage = () => {
    return (
        <>
        {CheckAuth() ? (
            
                <Themes />
            
        )
        :
        (
            <></>
        )}
        </>
    );
};

export default Planpage;
