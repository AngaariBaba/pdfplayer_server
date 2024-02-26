import React from 'react'
import style from './WelcomeBox.module.css'
import AI from './AI'

function WelcomeBox() {
    return (
      <>        <div className={style.welcomebox}>
 <div className={style.fancytextcontainer}>
      <p className={style.mainText}>
        WE WELCOME YOU TO  <span className={style.fancySpan}>Pdf Reader BookVerse </span>
        <AI />
      </p>
     
     
    </div>
 
            <p className={style.welcomemessage}>Get Your Pdf Played Online<br/>
            <span className={style.welcomesubmessage}>Upload again for new questions!</span></p>
        </div>



        </>
    )
    

}

export default WelcomeBox
