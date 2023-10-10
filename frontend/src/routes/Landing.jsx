import React from "react";
import styled from "styled-components";
import background from "../img/hotel-room.jpg";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
`;

const Welcome = styled.div`
  color: rgb(293545);
  font-weight: bold;
  font-size: 60px;
  font-familiy: rubik;
  margin-left: 200px;
  margin-top: 150px;
`;

const Subtext = styled.div`
  color: rgb(293545);
  font-size: 20px;
  font-familiy: rubik;
  font-weight: normal;
  margin-top: 20px;
  
`;

const Picture = styled.div`
    margin-left: 150px;
    margin-top: 80px;

    div img {
        border-radius: 15px 0px 0px 15px;
        box-shadow: 10px 10px rgba(207,49,106);
        height : 100%;
        width: 100%;
    }
  
`;

const Grid = styled.div`
    display: flex;
    
`;


function Landing() {
    return (
        <Container>
            <Grid>
                <Welcome> 
                    Welcome to <br />
                    LikeHome!<br />
                    <Subtext>Making Every Stay An Insightful Journey.</Subtext>
                </Welcome>
                
                <Picture>
                        <div> 
                            <img src={background} alt = "hotel-room-landing"/>
                        </div>
                </Picture>
            </Grid>
        </Container>
    );

}

export default Landing;
