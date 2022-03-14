import styled from 'styled-components'

const Button = styled.button`
  font-family: 'Lato',sans-serif;
  border: none;
  margin: 0.5em;
  background: var(--moss);
  width: 200px;
  height: 80px;
  border-radius: 15px;
  color: rgb(255 255 255);
  font-size: 1em;
  font-weight: 600;
  transition: 0.35s;
  &:hover {
    background: var(--darkmoss);
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--khaki);
  height: 610px;
  border-radius: 3em 1em 3em 1em;
  width: 600px;
  flex-direction: column;
  margin: 0 auto;
`

function SetMinutes({ getParagraphs, btnDisplay }) {
  return (
    <ButtonContainer className='SetTimerBtn' id={btnDisplay ? null : 'hidden'}>
      <Button onClick={() => getParagraphs(1)}>ONE MINUTE</Button>
      <Button onClick={() => getParagraphs(3)}>THREE MINUTES</Button>
      <Button onClick={() => getParagraphs(5)}>FIVE MINUTES</Button>
    </ButtonContainer>
  )
}

export default SetMinutes