import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Spinner animation="border" role="status" className="mt-5">
      <span className="sr-only"></span>
    </Spinner>
  );
};

export default Loading;
