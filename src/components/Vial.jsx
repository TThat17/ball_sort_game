import './Vial.css';

export default function Vial({ balls, isSelected, onClick }) {
    // Max capacity is 4
    const capacity = 4;

    return (
        <div
            className={`vial ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="vial-content">
                {balls.map((color, index) => (
                    <div
                        key={index}
                        className="ball"
                        style={{ backgroundColor: color }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
