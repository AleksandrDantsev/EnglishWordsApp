import React from "react";
import st from "./HomePage.module.scss";
import { Link } from "react-router-dom";

const HomePage:React.FC  = () => {
    return(
        <div className={st.homeConteiner}>
            <div className={st.home}>
                <aside className={st.home_getStarted}>
                    <span className={st.home_first_title}>to Learn</span>
                    <span className={st.home_second_title}>English</span>
                    <div className={st.buttonLinkToAnotherPage}>
                        <Link to="menuApp">
                            <button className={st.home_bt_gt_st} 
                                    type="button">Get started</button>
                        </Link>
                    </div>
                </aside>
                <div className={st.home_image}>
                    <div className={st.home_picture}>
                        <img src={"./public/pictures/back.jpeg"} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default HomePage;