import './Vial.css';

export default function Vial({ balls, isSelected, onClick, isCandle }) {
    // Max capacity is 4
    const capacity = 4;

    return (
        <div
            className={`vial${isCandle ? ' candle' : ''}${isSelected ? ' selected' : ''}`}
            onClick={onClick}
            style={{ position: 'relative' }}
        >
            {isCandle && (
                <>
                    <div className="candle-flame">
                        <svg width="36" height="54" viewBox="0 0 36 54">
                            <ellipse cx="18" cy="18" rx="8" ry="16" fill="gold" opacity="0.8"/>
                            <ellipse cx="18" cy="10" rx="5" ry="10" fill="orange" opacity="0.7"/>
                            <ellipse cx="18" cy="5" rx="2.5" ry="5" fill="white" opacity="0.9"/>
                            <ellipse cx="18" cy="30" rx="2" ry="4" fill="#333" opacity="0.7"/> {/* wick shadow */}
                        </svg>
                    </div>
                    <div className="candle-melted-top" style={{ backgroundColor: balls[0] }}>
                        <svg width="44" height="24" viewBox="0 0 44 24" style={{ display: 'block' }}>
                            <path d="M0,12 Q11,0 22,12 Q33,24 44,12 V24 H0 Z" fill={balls[0]} opacity="0.95"/>
                            <ellipse cx="22" cy="10" rx="4" ry="2" fill="#fff8" opacity="0.7"/>
                        </svg>
                        <div className="candle-wick"></div>
                    </div>
                    <div className="candle-body" style={{ backgroundColor: balls[0] }}></div>
                </>
            )}
            {!isCandle && (
                <div className="vial-content">
                    {balls.map((color, index) => (
                        <div
                            key={index}
                            className="ball"
                            style={{ backgroundColor: color }}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
}
