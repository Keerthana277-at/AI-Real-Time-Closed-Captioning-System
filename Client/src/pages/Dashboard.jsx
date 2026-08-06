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

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <Navbar onLogout={handleLogout}/>
            <h2 >Welcome, Keerthana 👋</h2>
            <button>🎤 Start Captioning</button>
           <Captioncard title="Original Caprion" text={originalText}/>
           <Captioncard title="Simplified text" text={simplifiedText}/>
           <Captioncard title="Tamil translation" text={translatedText}/> 
           <HistoryCard/> 
        </div>
        
    );
}

export default Dashboard;