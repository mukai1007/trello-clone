import { Button } from "antd";

import "./_create_board_card.scss";

const CreateBoardCard = (props) => {
  return (
    <Button className="create-board-card" onClick={props.onClick}>
      Создать новую доску...
    </Button>
  );
}

export default CreateBoardCard
