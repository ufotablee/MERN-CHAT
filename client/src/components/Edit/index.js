import React from 'react';
import { Input } from 'antd';
import { Button } from 'components'
import './edit.scss'
const Edit = ({value,handleChangeInput,handleChangeData}) => {


    return ( 
        <div className="edit">
            <div className="pd">
            <Input placeholder="fullname" name="fullname" value={value.fullname} onChange={handleChangeInput}/>
            <Input placeholder="email" name="email" value={value.email} onChange={handleChangeInput}/>
            <div className="edit__btn">
             <Button onClick={handleChangeData}>Edit</Button>
            </div>
            </div>
        </div>
     );
}
 
export default Edit;