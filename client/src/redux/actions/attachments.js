const actions = {
    setAttachments: items => ({
      type: "ATTACHMENTS:SET_ITEMS",
      payload: items
    }),
    removeAttachments: file => ({
      type: "ATTACHMENTS:REMOVE_ITEM",
      payload: file
    })
  };
  
  export default actions;