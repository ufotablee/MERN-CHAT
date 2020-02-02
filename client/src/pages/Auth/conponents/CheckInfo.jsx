import React,{useState, useEffect} from 'react'
import { Result, Button, Spin } from 'antd';
import { userApi } from 'utils/api'
import { WhiteBlock } from 'components'

const renderTextInfo = ({ hash, verified }) => {
    if (hash) {
      if (verified) {
        return {
          status: 'success',
          title: 'Готово!',
          message: 'Аккаунт успешно подтвержден!',
        };
      } else {
        return {
          status: 'error',
          title: 'Ошибка',
          message: 'Вы указали несуществующий или неверный хеш.',
        };
      }
    } else {
      return {
        status: 'info',
        title: 'Подтвердите почту',
        message: 'Ссылка с подтверждением аккаунта отправлена на E-Mail.',
      };
    }
  };
  
  const CheckInfo = ({ location, history }) => {
    const hash = location.search.split('hash=')[1];
    const [verified, setVerified] = useState(false);
    const [checking, setChecking] = useState(!!hash);
    const [info, setInfo] = useState(renderTextInfo({ hash, checking, verified }));
  
    

    useEffect(() => {

      const setStatus = ({ checking, verified }) => {
        setInfo(renderTextInfo({ hash, checking, verified }));
        setVerified(verified);
        setChecking(checking);
      };

      if (hash) {
        userApi
          .verify(hash)
          .then(() => {
            setStatus({ verified: true, checking: false });
          })
          .catch(() => {
            setStatus({ verified: false, checking: false });
          });
      }
    }, [hash]);
  
    return (
      <div className="verify-block">
        <WhiteBlock>
          {!checking ? (
            <Result
              status={info.status}
              title={info.title}
              subTitle={info.message}
              extra={
                info.status === 'success' &&
                verified && (
                  <Button type="primary" onClick={() => history.push('/signin')}>
                    Войти
                  </Button>
                )
              }
            />
          ) : (
            <div className="verify-block__loading">
              <Spin size="large" />
            </div>
          )
          }
        </WhiteBlock>
      </div>
    );
  };
  

export default CheckInfo;