import { Button } from "antd";

import "./_loader.scss";

const Loader = () => {
  return (
    <div className="loader-container" style={{ textAlign: "center" }}>
      <Button shape="circle" loading className="loader" />
    </div>
  );
}

export default Loader
