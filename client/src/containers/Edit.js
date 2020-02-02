import React, {useState} from 'react';
import { Edit as BaseEdit } from 'components'
import { userActions } from 'redux/actions'
import { connect } from 'react-redux'


const Edit = (props) => {
    const { setChangeInfo,data} = props
    const [ value,setValue ] = useState({
        fullname: '',
        email:''
    })
   
    const handleChangeInput = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
   
    const handleChangeData = () => {
        return (
        value.fullname === '' ? value.fullname = data.fullname : value.fullname,
        value.email === '' ? value.email = data.email : value.email,
        setChangeInfo(data._id, value)
        )
    }
    return (
        <BaseEdit 
        value={value}
        handleChangeInput={handleChangeInput}
        handleChangeData={handleChangeData}
        />
    )
}
export default connect(({user}) => {
   return user
},userActions)(Edit)