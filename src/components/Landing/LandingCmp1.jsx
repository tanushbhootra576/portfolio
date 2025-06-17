import SplitText from "./SplitText";
import "./Landing.css";
import ShinyText from "./Shinytext";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};




export const LandingCmp1 = () => {
  return (
    <div className="landing-cmp1" >
      <h1 className="landing-title">
        <SplitText
          text="Tanush Bhootra"
          delay={100}
          duration={0.5}
          ease="power2.out"
          splitType="lines, words, chars"
          from={{ opacity: 0, y: 50 }}
          to={{ opacity: 1, y: 0 }}
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </h1>

      <div className="landing-subtitle">
        <ShinyText text="Building Tomorrow with Code and Creativity" disabled={false} speed={10} className='custom-class' />
      </div>



    </div>
  );
}
