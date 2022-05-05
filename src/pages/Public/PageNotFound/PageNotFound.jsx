import ErrorPage from "components/ErrorPage/ErrorPage";

const PageNotFound = () => {
  return (
    <ErrorPage code='404' heading='Không tìm thấy nội dung'>
      <p>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
      <p>Vui lòng kiểm tra lại URL và thử lại hoặc nhấn nút để trở về trang chủ</p>
    </ErrorPage>
  );
};

export default PageNotFound;
