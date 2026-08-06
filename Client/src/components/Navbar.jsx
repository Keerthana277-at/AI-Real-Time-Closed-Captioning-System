function Navbar({ onLogout }){
    return (
         <nav className="navbar">
        <div>
             <h2>AI Closed Captioning System</h2>

            <button onClick={onLogout}>
                Logout
            </button>
        </div>
           
         </nav> 
    );
}

export default Navbar;