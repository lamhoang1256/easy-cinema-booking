import Tag from "components/tag/Tag";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./addComment.scss";

const AddComment = () => {
  const { idDetail } = useParams();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="addComment">
      <Tag kind="secondary" marginTop="14px">
        Thêm nhận xét mới
      </Tag>
      <textarea
        name="addComment-textarea"
        className="addComment-textarea"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Viết nhận xét..."
      ></textarea>
      {error !== "" && <span className="text--primary">{error}</span>}
      <button className="btn btn--primary addComment-btn">Nhận xét</button>
    </div>
  );
};

export default AddComment;
