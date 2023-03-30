import classes from './Slider.module.css'
import money from "./images/money.jpg";
import medicine from "./images/medicine.jpg";
import words from "./images/words.jpg";

const Slider = ()=>{
      
  var counter= 1;
  setInterval(function(){
    document.getElementById('radio'+counter).checked = true;
    counter++;
    if(counter>3){
      counter=1;
    }
  },5000);
  
    return(
        <div className={classes.slider}>
            <div className={classes.slides}>
                <input type='radio' name="radio-btn" id="radio1"/>
                <input type='radio' name="radio-btn" id="radio2"/>
                <input type='radio' name="radio-btn" id="radio3"/>
                
                <div className={`${classes.slide} ${classes.first}`}>
                <img src={medicine} alt="medicine cover" />
                </div>

                
                <div className={classes.slide}>
                <img src={money} alt="money cover" />
                </div>

                
                <div className={classes.slide}>
                <img src={words} alt="words cover" />
                </div>

            </div>

            <div className={classes.navAuto}>
                <div className={classes.autoBtn1}></div>
                <div className={classes.autoBtn2}></div>
                <div className={classes.autoBtn3}></div>
            </div>

            <div className={classes.navManual}>
                <label for="radio1" className={classes.manualBtn}></label>
                <label for="radio2" className={classes.manualBtn}></label>
                <label for="radio3" className={classes.manualBtn}></label>
            </div>


        </div>
    )
}

export default Slider;