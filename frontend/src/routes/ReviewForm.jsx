import { SERVER_URL } from "api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";
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
const Submit = styled.button`
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
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, resetField } = useForm();
  const rid = params.id;
  const [isFetching, setIsFetching] = useState(false);

  const submit = async ({ title, text, rating }) => {
    setIsFetching(true);
    const response = await fetch(`${SERVER_URL}/review/${rid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        rating: Number(rating),
        text,
      }),
    });

    const data = await response.json();
    console.log(response.status, data);
    if (response.ok) {
      resetField("title");
      resetField("rating");
      resetField("text");
    } else {
      alert("You have already written a review");
    }
    setIsFetching(false);
    navigate(-1);
  };

  return (
    <>
      <BackBtn onClick={() => navigate(-1)}>Back</BackBtn>
      <Container>
        <h1>Review Your Stay</h1>
        <Form onSubmit={handleSubmit(submit)}>
          <Input>
            <label>Review Title</label>
            <input {...register("title", { required: "Please enter title" })} />
          </Input>
          <Input>
            <label>Rating</label>
            <input
              {...register("rating", { required: "Please enter rating" })}
              type="number"
              defaultValue={5}
              min={0}
              max={5}
            />
          </Input>
          <Input>
            <label>Review Details</label>
            <input
              {...register("text", { required: "Please enter details" })}
            />
          </Input>
          <Submit type="submit" id="submit-btn">
            {isFetching ? <Ellipsis color="white" size={30} /> : "Submit"}
          </Submit>{" "}
        </Form>
      </Container>
    </>
  );
}

export default ReviewForm;
