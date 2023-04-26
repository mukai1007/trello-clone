import { useState } from "react";

import { Button, Input } from "antd";
import { CreateBtn, CloseBtn } from "../shared/ui/index";

import "./_create_list.scss";

const CreateList = (props) => {
  const [listTitle, setListTitle] = useState("");
  const [editing, setEditing] = useState(false);

  const { handleCreateList } = props;

  const handleEnableEditing = () => {
    setEditing(true);
  };

  const handleDisableEditing = () => {
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleCreateList(listTitle);
    setEditing(false);
    setListTitle("");
  };
  return (
    <div className="create-list">
      {editing ? (
        <form
          onBlur={handleDisableEditing}
          onSubmit={(e) => handleSubmitForm(e)}
          className="create-list-form"
        >
          <Input
            placeholder="Ввести заголовок списка"
            onChange={(e) => handleInputChange(e)}
            autoFocus
          />
          <div className="btns">
            <CreateBtn onClick={() => console.log('click')}/>
            <CloseBtn/>
          </div>
          
        </form>
      ) : (
        <Button className="create-list-button" onClick={handleEnableEditing}>
          + Добавить еще одну колонку
        </Button>
      )}
    </div>
  );
}

export default CreateList
