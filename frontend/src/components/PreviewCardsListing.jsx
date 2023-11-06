import React from "react";
import PreviewCard from "./PreviewCard";
import styled from "styled-components";

const StyledCardsListing = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px 50px;
  gap: 25px;
`;

function PreviewCardsListing({ listings }) {
  return (
    <div>
      <StyledCardsListing>
        {listings?.slice(0, 20).map((previewCard) => (
          <PreviewCard key={previewCard.rid} previewCard={previewCard} />
        ))}
      </StyledCardsListing>
    </div>
  );
}

export default PreviewCardsListing;
