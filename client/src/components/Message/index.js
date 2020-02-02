import React,{useState,useRef, useEffect} from 'react';
import './message.scss'
import classnames from 'classnames'
import { Time,Readed } from 'components'
import { Avatar } from 'containers'
import { Popover, Button, Icon } from 'antd';
import waveSvg from 'assets/image/wave.svg';
import playSvg from 'assets/image/play.svg';
import pauseSvg from 'assets/image/pause.svg'
import { convertCurrentTime, isAudio} from 'utils/helpers'
import reactStringReplace from 'react-string-replace'
import { Emoji } from 'emoji-mart';

const Message = ({ 
    text,
    date,
    user,
    isMe,
    readed,
    attachments,
    isTyping, 
    audio,
    onRemoveMessage,
    setPreviewImage,
    isVisiable,
    setIsVisiable
}) => {

 const renderAttachments = (item) => {
   if(item.ext !== 'webm') {
     return  <div onClick={() => setPreviewImage(item.url)} key={item._id} className="message__attachments-item">
     <div className="message__attachments-item-overlay" >
       <Icon type="eye" style={{color: 'white', fontSize: '18px'}}/>
     </div>
       <img src={item.url} alt={item.fileName} />
   </div>
   }
   else {
     return <MessageAudio audioSrc={item.url} key={item._id}/>
   }
 }

 
    const MessageAudio = ({ audioSrc }) => {
        const audioElem = useRef(null);
        const [isPlaying, setIsPlaying] = useState(false);
        const [progress, setProgress] = useState(0);
        const [currentTime, setCurrentTime] = useState(0);
      
        const togglePlay = () => {
          if (!isPlaying) {
            audioElem.current.play();
          } else {
            audioElem.current.pause();
          }
        };
      
        useEffect(() => {
          audioElem.current.addEventListener(
            'playing',
            () => {
              setIsPlaying(true);
            },
            false,
          );
          audioElem.current.addEventListener(
            'ended',
            () => {
              setIsPlaying(false);
              setProgress(0);
              setCurrentTime(0);
            },
            false,
          );
          audioElem.current.addEventListener(
            'pause',
            () => {
              setIsPlaying(false);
            },
            false,
          );
          audioElem.current.addEventListener('timeupdate', () => {
            const duration = (audioElem.current && audioElem.current.duration) || 0;
            setCurrentTime(audioElem.current.currentTime);
            setProgress((audioElem.current.currentTime / duration) * 100);
          });
        }, []);
        return (
            <div className="message__audio">
              <audio ref={audioElem} src={audioSrc} preload="auto" />
              <div className="message__audio-progress" style={{ width: progress + '%' }} />
              <div className="message__audio-info">
                <div className="message__audio-btn">
                  <button onClick={togglePlay}>
                    {isPlaying ? (
                      <img src={pauseSvg} alt="Pause svg" />
                    ) : (
                      <img src={playSvg} alt="Play svg" />
                    )}
                  </button>
                </div>
                <div className="message__audio-wave">
                  <img src={waveSvg} alt="Wave svg" />
                </div>
                <span className="message__audio-duration">{convertCurrentTime(currentTime)}</span>
              </div>
            </div>
          );
        };
      
    return (
        <div className={classnames(
         'message', {'message--isme': isMe,
         'message--is-typing' : isTyping,
         'message--image': isAudio(attachments) && attachments && attachments.length  === 1 && !text,
         "message--is-audio": isAudio(attachments),
         })}>
            <div className="message__content">
             { (<Readed isMe={isMe} isReaded={readed}/>) }
            { isMe && <Popover content={
            <div>
              <Button onClick={onRemoveMessage}>Удалить сообщение</Button>
            </div>
            }
            trigger="click">
              <div className="message__icon-actions">
            <Button type="link" shape="circle" icon="ellipsis" />
              </div>
            </Popover>}
            <div className="message__avatar">
                <Avatar user={user} setIsVisiable={setIsVisiable} isVisiable={isVisiable} noWay={true}/>
            </div>
            <div className="message__info">
              <div className="message__user">
                {user.fullname}
              </div>
                {(text || isTyping) && 
                <div className="message__bubble">
                    {text && 
                    <p className="message__text">
                      {reactStringReplace(text,/:(.+?):/g, (match, i) => (
                      <Emoji emoji={match} set="apple" size={24} key={i}/>
                    ))}
                    </p>
                    }
                   {isTyping &&  <div className="message__typing">
                         <span />
                         <span />
                         <span />
                    </div>}
                </div>}

                {audio && <MessageAudio audioSrc={audio}/>}

                    {attachments &&  
                    (<div className="message__attachments">
                        {attachments.map((item) =>  renderAttachments(item))} 
                    </div>
                    )}
                    { date && <span className="message__date">
                        <Time date={date}/>    
                    </span>}
            </div>
            </div>
        </div>
    )
}

export default Message;