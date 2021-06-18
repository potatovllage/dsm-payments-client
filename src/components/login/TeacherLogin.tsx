import { Link } from "react-router-dom";

import LoginCommon from "./LoginCommon";

import { postTeacherLogin } from "../../utils/apis";
import useValue from "../../utils/hooks/public/useValue";

const TeacherLogin = () => {
  const { value: id, onChange: onChangeId } = useValue();
  const { value: password, onChange: onChangePassword } = useValue();

  return (
    <LoginCommon
      id={id}
      password={password}
      onChangeId={onChangeId}
      onChangePassword={onChangePassword}
      postLogin={postTeacherLogin}
    >
      <p>
        <Link to="/login">학생이신가요?</Link>
      </p>
    </LoginCommon>
  );
};

export default TeacherLogin;
