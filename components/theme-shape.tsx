import styled from "styled-components";

interface ThemeShapeProps {
  bottomAligned?: boolean;
  filled?: boolean;
}

const StepsWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.senary};
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: none;
  }
`

interface StepProps {
  leftAlign?: boolean
}

const Step = styled.div<StepProps>`
  margin-left: ${({leftAlign}) => leftAlign ? 0 : "auto" };
  margin-right: ${({leftAlign}) => leftAlign ? "auto" : 0 };
  background-color: ${({theme}) => theme.colors.primary};
  height: 55px;
`

const StepOne = styled(Step)`
  width: 30%;
`

const StepTwo = styled(Step)`
  width: 25%;
`

const StepThree = styled(Step)`
  width: 20%;
`

export default function ThemeShape(props: ThemeShapeProps){
  if(props.bottomAligned){
    return (
      <StepsWrapper>
        <StepThree leftAlign></StepThree>
        <StepTwo leftAlign></StepTwo>
        <StepOne leftAlign></StepOne>
    </StepsWrapper>
    )
  }
  return (
    <StepsWrapper>
      <StepOne></StepOne>
      <StepTwo></StepTwo>
      <StepThree></StepThree>
  </StepsWrapper>
)

}