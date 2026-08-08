import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard";
import Captioncard from "../components/Captioncard";
import "../styles/dashboard.css"
import { getCaptions } from "../services/api";

function Dashboard (){

    const [originalText,setOriginalText] = useState("");
    const [simplifiedText,setSimplifiedText] = useState("");
    const [translatedText,setTranslatedText] = useState("");
    const [isRecording,setIsRecording] = useState(false);
    const [status,setStatus] = useState("");
    const [mediaRecorder,setMediaRecorder] = useState(null);
    const navigate = useNavigate();

    const [captions,setCaptions] = useState([]);

    useEffect(()=>{
        const fetchHistory = async () => {
            try{
                const data = await getCaptions();

                console.log("CAPTION HISTORY:",data);

                setCaptions(data.captions);
            }catch(error){
                console.log("History error:",error);
            }
        };
        fetchHistory();
    },[]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const startRecording = async () => {
        try{
            const stream = await navigator.mediaDevices.getUserMedia({
                audio:true
            });

            const recorder = new MediaRecorder(stream);

            const audioChunks = [];

            recorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            // recorder.onstop = async () => {
            //     const audioBlob = new Blob(audioChunks,{
            //         type:"audio/webm"
            //     });

            //     console.log("Audio recorded:",audioBlob);

            //     stream.getTracks().forEach(track => track.stop());

            //     setStatus("Processing...");
            //     setIsRecording(false);
            // };

            recorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks,{
                    type:"audio/webm"
                });

                console.log("Audio recorded:",audioBlob);

                stream.getTracks().forEach((track)=> {
                    track.stop();
                });

                setIsRecording(false);
                setStatus("Processing....");

                try{
                    const formData = new FormData();
                    formData.append(
                        "audio",
                        audioBlob,
                        "recording.webm"
                    );

                    const token = localStorage.getItem("token");

                    const response = await fetch(
                        "http://localhost:5000/api/speech/transcribe",
                        {
                            method:"POST",
                            headers:{
                                Authorization:`Bearer ${token}`
                            },
                            body:formData
                        }
                    );

                    const data = await response.json();

                    console.log("TRANSCRIPTION RESPONSE:",data);

                    if(!response.ok){
                        throw new Error(
                            data.message || "Trascription failed"
                        );
                    }
                    setOriginalText(data.caption.originalText);
                    setSimplifiedText(data.caption.simplifiedText);
                    setTranslatedText(data.caption.translatedText);


                    setStatus("Caption ready");
                }catch(error){
                    console.error("Caption error:",error);
                    setStatus(error.message);
                }
            };

            recorder.start();

            setMediaRecorder(recorder);
            setIsRecording(true);
            setStatus("Listening....");
        }catch(error){
            console.error("Microphone error:",error);
            setStatus("Microphone permission denied.");
        }

       
};

     const stopRecording = () => {
            if(mediaRecorder)
                mediaRecorder.stop();
        }

   return (
    <div className="dashboard">

        <Navbar onLogout={handleLogout} />

        <main className="dashboard-content">

            <div className="welcome-section">
                <h1>Welcome, Keerthana 👋</h1>
                <p>
                    Real-time captions made simple and accessible.
                </p>
            </div>

            {/* Recording section */}
            <section className="recording-section">

                <div className={
                    isRecording
                        ? "recording-indicator active"
                        : "recording-indicator"
                }>
                    <span className="status-dot"></span>

                    {isRecording
                        ? "Listening..."
                        : "Ready to caption"}
                </div>

                <button
                    className={
                        isRecording
                            ? "stop-btn"
                            : "start-btn"
                    }
                    onClick={
                        isRecording
                            ? stopRecording
                            : startRecording
                    }
                >
                    {isRecording
                        ? "🛑 Stop Captioning"
                        : "🎤 Start Captioning"}
                </button>

                {status && (
                    <p className="processing-status">
                        {status}
                    </p>
                )}

            </section>


            {/* Live caption */}
            <section className="live-caption">

                <div className="section-title">
                    <span>🔴</span>
                    <h2>Live Caption</h2>
                </div>

                <p className="live-caption-text">
                    {originalText || "Your caption will appear here..."}
                </p>

            </section>


            {/* Simplified caption */}
            <Captioncard
                title="✨ Simplified Caption"
                text={simplifiedText}
            />


            {/* Tamil translation */}
            <Captioncard
                title="🌐 Tamil Translation"
                text={translatedText}
            />


            {/* History */}
            <div className="history-section">

    <h2>📜 Recent Caption History</h2>

    {captions.length === 0 ? (
        <p>No caption history yet.</p>
    ) : (
        captions.map((caption) => (
            <HistoryCard
                key={caption._id}
                caption={caption}
            />
        ))
    )}

</div>

        </main>

    </div>
 );
}

export default Dashboard;