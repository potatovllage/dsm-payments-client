import { Link } from "react-router-dom";

import LoginCommon from "./LoginCommon";

import useValue from "../../utils/hooks/public/useValue";
import { postStudentLogin } from "../../utils/apis";

const Login = () => {
  const { value: id, onChange: onChangeId } = useValue();
  const { value: password, onChange: onChangePassword } = useValue();

  return (
    <LoginCommon
      id={id}
      password={password}
      onChangeId={onChangeId}
      onChangePassword={onChangePassword}
      postLogin={postStudentLogin}
    >
      <p>
        <Link to="/teacher/login">선생님이신가요?</Link>
      </p>
    </LoginCommon>
  );
};

export default Login;
