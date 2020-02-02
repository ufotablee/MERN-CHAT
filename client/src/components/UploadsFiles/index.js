import React, { useState, useEffect } from 'react'
import { Upload, Modal } from 'antd';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const UploadsFiles = (props) => {
  const { attachments,removeAttachments } = props

  const [previewVisible, setPreviewVisible] = useState(false)
  const [fileList, setFileList] = useState()
  const [previewImage, setPreviewImage] = useState()

  useEffect( () => {
    setFileList(attachments)
  },[attachments])

 const handleCancel = () => setPreviewVisible(false);

 const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={file => removeAttachments(file)}
        >
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
  )
}
export default UploadsFiles;
 
