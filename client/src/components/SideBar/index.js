import React from 'react'
import {Icon,Button, Modal,Select, Input, Form } from 'antd'
import { Dialogs  } from 'containers'
import './sidebar.scss'
const { Option } = Select;
const { TextArea } = Input;
const SideBar = ({
    user,
    users, 
    onClose, 
    onShow,
    visible, 
    Isloading,
    inputValue, 
    handleChange,
    handleSearch,
    onSelectUser,
    onAddDialog,
    messageValue,
    handleChangeMessage,
    selectedUserId
}) => {
    const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);
    return (  
        <div className='chat__sidebar'>
        <div className='chat__sidebar-header'>
           <div>
              <Icon type="team" />
              <span>Список диалогов</span>
           </div>
           <Button onClick={onShow} type='link' shape="circle" icon="form"/>
        </div>
        <div className="chat__sidebar-dialogs">
        { user && <Dialogs userId={ user && user._id}/>}
        </div>
        <Modal
        title="Basic Mdoal"
        visible={visible}
        onOk={onAddDialog}
        onCancel={onClose}
        footer={[
            <Button key="black" onClick={onClose}>
                Закрыть
            </Button>,
            <Button 
            disabled={!messageValue}
            key="submit" 
            type="primary" 
            loading={Isloading} 
            onClick={onAddDialog}>
                Создать
            </Button>
        ]}>
            <Form >
            <Form.Item label="Введите имя пользователя или E-Mail">
            <Select
                showSearch
                value={inputValue}
                placeholder={'Найти пользователя'}
                style={{ width: '100%'}}
                defaultActiveFirstOption={false}
                showArrow={false}
                onSelect={onSelectUser}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
            </Form.Item>
            { selectedUserId && <Form.Item label="Введите сообщение">
            <TextArea 
            placeholder="Ваше Сообщение"
            value={messageValue}
            onChange={handleChangeMessage}
            autosize={{minRows: 2, maxRows: 6}}/>
            </Form.Item>}
            </Form>
        </Modal>
     </div>
     );
}
 
export default SideBar;