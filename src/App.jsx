import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Boards from './pages/Boards/Boards';
import BoardsPage from './pages/BoardsPage/BoardPage'
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/Signup/Signup';


function App() {
  // const boardData = {
  //   active:0,
  //   boards:[
  //     {
  //       name:'My Trello Board',
  //       bgcolor:'#069',
  //       list:[
  //         {id:"1",title:"To do",items:[{id:"cdrFt",title:"Project Description 1"}]},
  //         {id:"2",title:"In Progress",items:[{id:"cdrFv",title:"Project Description 2"}]},
  //         {id:"3",title:"Done",items:[{id:"cdrFb",title:"Project Description 3"}]}
  //       ]
  //     }
  //   ]
  // }
  // const [allboard,setAllBoard] = useState(boardData); 
  
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/createboard" element={<BoardsPage />} /> */}
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/boards/:boardId" element={<Boards />} />
          <Route path="/" element={<Home />} /> {/* Set HomePage as the default route */}
        </Routes>
    </Router>
  )
}

export default App
