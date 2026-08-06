function Captioncard({ title,text }){
    return (
        <div className="caption-card">
            <h3>{title}</h3>

            <p>
                {text || "No caption yet..."}
            </p>
        </div>
    );
}

export default Captioncard;