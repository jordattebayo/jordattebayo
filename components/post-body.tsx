import styled from 'styled-components'

type Props = {
  content: string
}

const BodyContainer = styled.div`
	max-width: 660px;
	margin: 0 auto;
`

const PostBody = ({ content }: Props) => {
  return (
    <BodyContainer className="max-w-2xl mx-auto">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </BodyContainer>
  )
}

export default PostBody