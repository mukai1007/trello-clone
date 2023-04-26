import React from 'react'
import { Button } from 'antd';

const CreateBtn = () => {
  return (
    <div>
        <Button
            type="primary"
            style={{
              borderRadius: "12px",
              fontWeight: 500,
              border: "rgb(60, 64, 82)",
              backgroundImage: "linear-gradient(45deg, #606c88, #3f4c6b)",
              marginRight: "8px",
            }}
          >
            Создать
        </Button>
    </div>
  )
}

export default CreateBtn