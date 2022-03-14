import styled from 'styled-components'

const Section = styled.section`
  background: var(--khaki);
  border-radius: 3em 1em 3em 1em;
  height: 610px;
  width: 600px;
  margin: 0 auto;
`

const ParagraphsContainer = styled.div`
  width: 70%;
  height: 480px;
  margin: 0 auto;
  font-size: 1.5em;
  overflow-y: scroll;
  overflow: hidden;
  grid-column: 1;
  grid-row: 1;
  text-align: left;
  line-height: 48px;
  font-family: 'Be Vietnam Pro', sans-serif;
  color: rgb(121 85 72);
`

const InputArea = styled.textarea`
  height: 480px;
  margin: 0 auto;
  width: 85%;
  letter-spacing: 6px;
  /* height: 50px; */
  font-size: 1.5em;
  resize: none;
  opacity: 0;
  cursor: default;
  grid-column: 1;
  grid-row: 1;
  font-family: 'Be Vietnam Pro', sans-serif;
  line-height: 1.8em;
`

const TextColor = styled.span`
  border-radius: 4px;
  border: 1px solid var(--khaki);
  padding: 0 2px;
`

function TextArea({ paragraphs, userInput, typingDisplay, handleUserInput }) {
  const correctCol = 'rgb(189 223 177)'
  const incorrectCol = 'rgb(252 186 164)'

  if (typingDisplay) {
    document.querySelector('textarea').focus()
  }

  return (
    <Section className='game-container' id={typingDisplay ? null : 'hidden'}>
      <ParagraphsContainer className='paragraphs'>
        {paragraphs.map((string, i) => {
          let color = ''
          if (i < userInput.length) {
            string === userInput[i] ? color = correctCol : color = incorrectCol
          }
          return (
            <TextColor
              className='letter'
              style={{ backgroundColor: color }}
              key={i + string}>{string}
            </TextColor>
          )
        })}
      </ParagraphsContainer>
      <InputArea
        className='text-input'
        onChange={handleUserInput}
      ></InputArea>
    </Section>
  )
}

export default TextArea
