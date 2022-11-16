import styled from "styled-components";

const StepsWrapper = styled.div`
  width: 99vw;  
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: none;
  }
`
const Step = styled.div`
  margin-left: auto;
  margin-right: 0;
  background-color: ${({theme}) => theme.colors.primary};
  height: 55px;
`

const StepOne = styled(Step)`
  width: 30%;
`

const StepTwo = styled(Step)`
  width: 20%;
`

const StepThree = styled(Step)`
  width: 10%;
`

export default function ThemeShape(){
    return (
        <StepsWrapper>
          <StepOne></StepOne>
          <StepTwo></StepTwo>
          <StepThree></StepThree>
      </StepsWrapper>
    )
}