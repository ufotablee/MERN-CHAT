import React,{useEffect,useState} from 'react';
import './home.scss'
import { Messages,ChatInput,Status, SideBar  } from 'containers'
import { withRouter } from 'react-router'
import { dialogsActions } from 'redux/actions'
import { connect } from 'react-redux'
import { Profile } from 'containers'

const Home = (props) =>  {
   const [isVisiable, setIsVisiable] = useState(false)
   
   useEffect(() => {
     const { setCurrentDialogId } = props;
     const { pathname } = props.location;
     const dialogId = pathname.split('/').pop();
     setCurrentDialogId(dialogId);
   }, [props]);
 
   useEffect( () => {
     window.addEventListener('click', e => {  
     return e.target.className === 'overlay' ? setIsVisiable(false) : null
   })
  },[])
   
return ( 
   <section className="home">
     {isVisiable ? <Profile isVisiable={isVisiable} setIsVisiable={setIsVisiable}/> : null}
   <div className="chat">
     <SideBar />
     {(
       <div className="chat__dialog">
         <Status setIsVisiable={setIsVisiable} isVisiable={isVisiable}/>
         <Messages setIsVisiable={setIsVisiable} isVisiable={isVisiable}/>
         <div className="chat__dialog-input">
           <ChatInput />
         </div>
       </div>
     )}
   </div>
 </section>
        );
}
  
export default withRouter(connect(({dialogs})=> dialogs,dialogsActions)(Home));