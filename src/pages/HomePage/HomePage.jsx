import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { db } from "../../firebase";
import { Button } from "antd";

import { mergeDataWithKey } from "../../utils";
import { Loader, CreateBoardCard, CreateBoardModal } from "../../components/index";

import "./_home_page.scss";

const Boards = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    db.onceGetBoards()
      .then((snapshot) => {
        if (!snapshot.val()) {
          setLoading(false);
          return;
        }
        setBoards(mergeDataWithKey(snapshot.val()));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleCreateBoard = (board) => {
    db.doCreateBoard(board).then((response) => {
      console.log(response);
      const updatedBoards = [...boards];
      updatedBoards.push(response);
      setBoards(updatedBoards);
      setModalOpen(false);
    });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="boards-view-container">
          <div className="boards-container">
            {boards.map((board, index) => {
              return (
                <>
                  <Link
                    index={index}
                    to={{
                      pathname: `b/${board.key}`,
                      state: { boardKey: board.key },
                    }}
                  >
                    <Button className="board-card">{board.title}</Button>
                  </Link>
                </>
              );
            })}
            <CreateBoardCard onClick={() => handleModalOpen()} />
          </div>

          <CreateBoardModal
            onCreateBoard={handleCreateBoard}
            onCloseModal={handleModalClose}
            visible={modalOpen}
          />
        </div>
      )}
    </>
  );
}

export default Boards;
