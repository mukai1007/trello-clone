import { useState, useRef, useEffect } from "react";

import { Button, Input, Modal, Form } from "antd";

const CreateBoardModal = (props) => {
  const [boardTitle, setBoardTitle] = useState("");
  const boardRef = useRef(null)
  const inputRef = useRef(null)

  const { 
    onCloseModal, 
    onCreateBoard, 
    visible 
  } = props;

  useEffect(() => {
    if(visible && inputRef.current) {
      inputRef.current.focus()
    }
    setBoardTitle("")
  }, [visible])

  const handleCancel = () => {
    onCloseModal()
    setBoardTitle("");
    if(inputRef.current) {
      inputRef.current = null
    }
  };

  const createBoardKeyPress = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault()
      boardRef.current.click()
    }
  }

  const handleCreateBoard = (event) => {
    event.preventDefault();
    if (boardTitle !== "") {
      onCreateBoard({ title: boardTitle });
      setBoardTitle("");
    }
  };

  const handleBoardTitleChange = (event) => {
    setBoardTitle(event.target.value);
  };

  return (
    <Modal
      title="Создать доску"
      width="320px"
      style={{ top: 60 }}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form onSubmit={(event) => handleCreateBoard(event)} onKeyDown={createBoardKeyPress}>
        <Input
          style={{ marginBottom: 16 }}
          placeholder="Добавить название доски"
          onChange={(event) => handleBoardTitleChange(event)}
          value={boardTitle}
          ref={inputRef}
        />
        <Button
          disabled={boardTitle === ""}
          type="primary"
          onClick={(event) => handleCreateBoard(event)}
          key="0"
          ref={boardRef}
        >
          Создать
        </Button>
      </Form>
    </Modal>
  );
}

export default CreateBoardModal
