function HistoryCard({ caption }) {

    return (
        <div className="history-card">

            <h3>📝 Original Caption</h3>
            <p>{caption.originalText}</p>

            <h3>✨ Simplified Caption</h3>
            <p>{caption.simplifiedText}</p>

            <h3>🌐 Tamil Translation</h3>
            <p>{caption.translatedText}</p>

            <small>
                {new Date(caption.createdAt).toLocaleString()}
            </small>

        </div>
    );
}

export default HistoryCard;