import styled from "styled-components";

interface ThemeShapeProps {
  bottomAligned?: boolean;
  filled?: boolean;
}

const StepsWrapper = styled.div<{ leftAlign?: boolean }>`
  position: relative;
  padding-bottom: ${({leftAlign}) => leftAlign ? "4rem" : 0 };
  margin-top: ${({leftAlign}) => leftAlign ? "auto" : 0 };
  background-color:${(props) => props.theme.colors.senary};
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: none;
  }
`

interface StepProps {
  leftAlign?: boolean
}

const Step = styled.div<StepProps>`
  /* margin-left: ${({leftAlign}) => leftAlign ? 0 : "auto" };
  margin-right: ${({leftAlign}) => leftAlign ? "auto" : 0 }; */
  border-bottom: 3px solid ${({theme}) => theme.colors.primary};
  height: 55px;
  position:  ${({leftAlign}) => leftAlign ? "static" : "absolute" };
  right: 0;
`

const StepOne = styled(Step)`
  width: 20%;
  top: 0;
`

const StepTwo = styled(Step)`
  width: 15%;
  top: 55px;
`

const StepThree = styled(Step)`
  width: 10%;
  top: 110px;
`

export default function BlogThemeShape(props: ThemeShapeProps){
  if(props.bottomAligned){
    return (
      <StepsWrapper leftAlign>
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