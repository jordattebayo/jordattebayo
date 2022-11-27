import styled from "styled-components";

const FooterWrapper = styled.div`
    position: relative;
    margin-top: auto;
    margin-left: auto;
    height: 50px;
    width: 50px;

`

const Footer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 12vw;
    z-index: 5;
`

export default function StickyFooter() {

    return (
        <FooterWrapper>
            <Footer>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
            </Footer>
        </FooterWrapper>
    )
}