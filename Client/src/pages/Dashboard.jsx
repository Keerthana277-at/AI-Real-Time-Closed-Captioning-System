import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard";
import Captioncard from "../components/Captioncard";
import "../styles/dashboard.css"

function Dashboard (){

    const [originalText,setOriginalText] = useState("");
    const [simplifiedText,setSimplifiedText] = useState("");
    const [translatedText,setTranslatedText] = useState("");
    const [isRecording,setIsRecording] = useState("");
    const [status,setStatus] = useState("");
    const [mediaRecorder,setMediaRecorder] = useState("");
    const navigate = useNavigate();

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

            recorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks,{
                    type:"audio/webm"
                });

                console.log("Audio recorded:",audioBlob);

                stream.getTracks().forEach(track => track.stop());

                setStatus("Processing...");
                setIsRecording(false);
            };

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
        <div className="dashboard-container">
            <Navbar onLogout={handleLogout}/>
            <h2 >Welcome, Keerthana 👋</h2>
            <button className="start-btn"
            onClick={isRecording ? stopRecording : startRecording}>{isRecording ? "🛑 Stop Captioning" : "🎤 Start Captioning"}
            </button>
            {status && <p className="status">{status}</p>}
           <Captioncard title="Original Caprion" text={originalText}/>
           <Captioncard title="Simplified text" text={simplifiedText}/>
           <Captioncard title="Tamil translation" text={translatedText}/> 
           <HistoryCard/> 
        </div>
        
    );
}

export default Dashboard;