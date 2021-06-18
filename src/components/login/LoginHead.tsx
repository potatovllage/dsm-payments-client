import styled from "@emotion/styled";

const LoginHead = () => {
  return (
    <LoginHeadWrap>
      <h1>DSM-Payments for AppWeb</h1>
      <p>DSM Payments System</p>
    </LoginHeadWrap>
  );
};

const LoginHeadWrap = styled.div`
  padding: 20px 40px;
  background-color: #2a77f4;
  color: white;
  > img {
    width: 124px;
    height: 72px;
    border-radius: 4px;
  }
  > h1 {
    line-height: 2;
    font-size: 14px;
  }
  > p {
    line-height: 2;
    font-size: 12px;
    color: #e2e2e2;
  }
`;

export default LoginHead;
