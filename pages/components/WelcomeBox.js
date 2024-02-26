import React from 'react'
import style from './WelcomeBox.module.css'
import AI from './AI'

function WelcomeBox() {
    return (
      <>        <div className={style.welcomebox}>
 <div className={style.fancytextcontainer}>
      <p className={style.mainText}>
        WE WELCOME YOU TO  <span className={style.fancySpan}>PDF READER SECTIOn </span>
        <AI />
      </p>
     
     
    </div>
 
            <p className={style.welcomemessage}>Get your pdf Narrated Right Now!<br/>
            <span className={style.welcomesubmessage}>Upload again for new questions!</span></p>
        </div>



        </>
    )
    

}

export default WelcomeBox
