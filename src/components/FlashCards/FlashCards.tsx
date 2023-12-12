import React from "react";
import st from "./FlashCards.module.scss";


const FlashCards:React.FC = () => {
    return(
        <div className={st.flashCardsWrapper}>
            <div className={st.flashCardsTop}>
                <div className={st.flashCard_picture}>
                    <img src="https://strela-coach.ru/wp-content/uploads/2018/09/nike-run.jpg" alt="picterCard" />
                    <div className={st.falshCardActionPanel}>
                        <div className={st.flasCardSoundBt}>r</div>
                        <div className={st.flasCardEdit}>r</div>
                    </div>
                </div>
                <div className={st.flashCard_buttonRightCard}>
                        <ul className={st.btFlashCards}>
                            <li>r</li>
                            <li>e</li>
                            <li>r</li>
                            <li>e</li>
                            <li>q</li>
                        </ul>
                </div>
            </div>
            <div className={st.falschCard_word}>word</div>
            <div className={st.flashCard_bottomPanel}>
                <div className={st.flashCard_describeCard}>
                    <div className={st.falschCard_definitionExamples}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil voluptatibus praesentium suscipit in facere iure culpa at amet temporibus quisquam voluptate omnis illum qui sequi ea, magni tempora provident. At.</div>
                </div>
                
            </div>
        </div>
    );
}


export default FlashCards;