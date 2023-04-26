import React from 'react'
import { Button } from 'antd'

const CloseBtn = () => {
  return (
    <div>
         <Button
            type="primary"
            shape="circle"
            style={{
              fontWeight: 500,
              color: "#3f4c6b",
              backgroundColor: "#fff",
              boxShadow: "none",
              border: "1px solid #3f4c6b",
            }}
            // onClick={() => {
            //   setCardTitle("");
            //   handleCreatingCard(false);
            // }}
          >
            X
          </Button>
    </div>
  )
}

export default CloseBtn