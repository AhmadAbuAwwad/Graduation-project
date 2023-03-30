import Button from '../UI/Button/Button';
import classes from './Icons.module.css'

const Icons = (props)=>{

    const seeMoreHandler = ()=>{
        props.refValue.current?.scrollIntoView({behavior: 'smooth'});
    }
    const imageClickHandler=()=>{
        console.log("inside image handler");
        props.onClick();
    }
    return(
        <div className={classes.iconsContainer}>
            <img src={props.imgSrc} className={classes.iconImage} onClick={imageClickHandler}></img>
            <div className={classes.textDiv}>{props.text}</div>
            <Button className={classes.seeMoreButton} onClick={seeMoreHandler}>عرض المزيد</Button>
        </div>
    )
}

export default Icons;