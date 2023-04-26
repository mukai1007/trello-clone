import { useState, useEffect } from "react";

import { Button, Modal, Input, DatePicker, Space } from "antd";
import { TagOutlined, ProjectOutlined, AlignLeftOutlined } from "@ant-design/icons";

import "./_card_modal.scss";

const CardModal = (props) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [dedline, setDedline] = useState([])

  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const {
    visible,
    cardTitle,
    handleHideModal,
    cardDescription,
    cardDedline,
    handleEditCard,
    cardKey,
    listKey,
  } = props;

  useEffect(() => {
    setDescription(cardDescription);
  }, [cardDescription]);

  const handleDateChange = (data, dataString) => {
    const joinedDate = dataString.join('-')
    setDedline(joinedDate)
  }

  const saveData = () => {
    handleDedline(handleEditCard, listKey, cardKey)
  }

  const handleDedline = (callback, listKey, cardKey) => {
    const updatedCard = {
      title: cardTitle,
      dedline: dedline,
    };

    callback({ listKey, cardKey, card: updatedCard }).then(() => {
      console.log(updatedCard);
    });
  }

  const handleEnableEditing = () => {
    setEditing(true);
  };

  const handleDisableEditing = () => {
    setEditing(false);
    setDescription("");
  };

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitForm = (event, callback, listKey, cardKey) => {
    event.preventDefault();

    const updatedCard = {
      title: cardTitle,
      description: description ? description : "",
    };
    callback({ listKey, cardKey, card: updatedCard }).then(() => {
      handleDisableEditing();
    });
  };
  return (
    <Modal
      title={
        <div>
          <h4 style={{ margin: 0 }}>
            <ProjectOutlined style={{ marginRight: "8px" }} />
            <span>{cardTitle}</span>
          </h4>
        </div>
      }
      visible={visible}
      onCancel={() => {
        handleHideModal();
        handleDisableEditing();
      }}
      footer={null}
    >
      <div className="labels-container" style={{ marginBottom: "24px" }}>
        <h4>
          <TagOutlined style={{ marginRight: "8px" }} />
          <span>Метки</span>
        </h4>
        <div className="labels-selection">
          <Button type="primary" style={{ marginRight: "4px" }}>
            Низкий
          </Button>
          <Button
            type="primary"
            style={{
              marginRight: "4px",
              backgroundColor: "#ebc36a",
              borderColor: "#ebc36a",
            }}
          >
            Средний
          </Button>
          <Button
            type="primary"
            style={{
              marginRight: "4px",
              backgroundColor: "#c74235",
              borderColor: "#c74235",
            }}
          >
            Сложный
          </Button>
        </div>
      </div>
      <div>
        <Space direction="vertical" size={12}>
          <RangePicker onChange={handleDateChange} format={"DD.MM.YY"}/>
        </Space>
        <Button onClick={saveData} className="date">Сохранить</Button>
        <h4>Дедлайн: {cardDedline}</h4>
      </div>
      <div className="description-container">
        <h4>
          <AlignLeftOutlined style={{ marginRight: "8px" }} />{" "}
          <span>Описание</span>
        </h4>
        <div className="description-content">
          {editing ? (
            <>
              <form
                onSubmit={(event) =>
                  handleSubmitForm(event, handleEditCard, listKey, cardKey)
                }
              >
                <TextArea
                  value={description}
                  onChange={(e) => handleInputChange(e)}
                  placeholder={
                    description === ""
                      ? "Add a more detailed description..."
                      : description
                  }
                  autoFocus
                />
                <Button
                  onClick={(event) =>
                    handleSubmitForm(event, handleEditCard, listKey, cardKey)
                  }
                >
                  Сохранить
                </Button>
                <Button onClick={handleDisableEditing}>Отменить</Button>
              </form>
            </>
          ) : (
            <div onClick={handleEnableEditing}>
              {cardDescription ? (
                <span>{cardDescription}</span>
              ) : (
                <span>Добавьте более подробное описание...</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CardModal
