import { useState, useRef } from "react";

import { Button, Input } from "antd";

import "./_create_card.scss";

const CreateCard = (props) => {
  const [cardTitle, setCardTitle] = useState("");
  const cardRef = useRef(null)
  const { 
    listKey, 
    handleCreateCard, 
    creatingCard, 
    handleCreatingCard 
  } = props;

  const createCardKeyPress = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault()
      cardRef.current.click()
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (cardTitle !== "") {
      handleCreateCard({ cardTitle, listKey });
      setCardTitle("");
      handleCreatingCard(false);
    }
  };

  const { TextArea } = Input;

  return (
    <div className="create-card">
      {creatingCard ? (
        <div className="create-card-form-container">
          <TextArea
            value={cardTitle}
            placeholder="Ввести заголовок для этой карточки"
            onSubmit={(event) => handleOnSubmit(event)}
            rows={2}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
            onKeyDown={createCardKeyPress}
          />
          <Button
            type="primary"
            style={{
              borderRadius: "12px",
              fontWeight: 500,
              border: "rgb(60, 64, 82)",
              backgroundImage: "linear-gradient(45deg, #606c88, #3f4c6b)",
              marginRight: "8px",
            }}
            onClick={(event) => handleOnSubmit(event)}
            ref={cardRef}
          >
            Создать
          </Button>
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
            onClick={() => {
              setCardTitle("");
              handleCreatingCard(false);
            }}
          >
            X
          </Button>
        </div>
      ) : (
        <a onClick={handleCreatingCard}>+ Добавить карточку</a>
      )}
    </div>
  );
}

export default CreateCard
