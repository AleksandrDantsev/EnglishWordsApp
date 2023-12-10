import React from "react";
import st from "./HomePage.module.scss";
import { Link } from "react-router-dom";

const HomePage:React.FC  = () => {
    return(
        <div className={st.homeConteiner}>
            <div className={st.home}>
                <aside className={st.home_getStarted}>
                    <span className={st.home_first_title}>Learn</span>
                    <span className={st.home_second_title}>English</span>
                    <span className={st.home_three_title}>effectively</span>
                    <Link to="menuApp"><button className={st.home_bt_gt_st} type="button">Get started</button></Link>
                </aside>
                <div className={st.home_image}>
                    <div className={st.home_picture}>
                        <img src={"./public/pictures/flagEngland.jpg"} alt="flag" />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default HomePage;