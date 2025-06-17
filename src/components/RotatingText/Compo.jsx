import CircularText from './CircularText';
import './Compo.css';
const Compo = () => {
    return (
        <div className="chat-compo-container">
            <div>
                <CircularText
                    text="Coder | Editor | Developer | "
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                />
            </div>
        </div>
    );
};

export default Compo;
