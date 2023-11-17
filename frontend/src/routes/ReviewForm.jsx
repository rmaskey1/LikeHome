import React from "react";
import styled from "styled-components";

const BackBtn = styled.button`
  background: transparent;
  margin-top: 24px;
  margin-left: 22px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
const Container = styled.div`
  margin-left: 140px;
  margin-top: 10px;
  color: rgba(41, 53, 69, 1);

  h1 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 42px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 16px;
    font-weight: 400;
  }
  input {
    width: 748px;
    height: 37px;
    border: 1px solid rgba(176, 176, 176, 1);
    border-radius: 20px;
    padding: 0 15px;
  }
`;
const Submit = styled.input`
  width: 500px;
  height: 36px;
  margin-left: 115px;
  border-radius: 20px;
  background: rgba(207, 49, 106, 1);
  font-family: Rubik;
  font-size: 16px;
  font-weight: 700;
  color: white;
  cursor: pointer;
`;
function ReviewForm() {
  return (
    <>
      <BackBtn>Back</BackBtn>
      <Container>
        <h1>Review Your Stay</h1>
        <Form>
          <Input>
            <label>Review Title</label>
            <input />
          </Input>
          <Input>
            <label>Rating</label>
            <input type="number" defaultValue={5} min={0} max={5} />
          </Input>
          <Input>
            <label>Review Details</label>
            <input />
          </Input>
          <Submit type="submit" value={"Submit"} />
        </Form>
      </Container>
    </>
  );
}

export default ReviewForm;
