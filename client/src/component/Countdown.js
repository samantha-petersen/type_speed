import styled from 'styled-components'

const Timer = styled.div`
  display: flex;
  justify-content: center;
  color: var(--moss);
  font-size: 1.3em;
  width: 50%;
  gap: 10px;
  margin: 22px auto;
  letter-spacing: 3px;
  border-top: 1px solid var(--moss);
  border-bottom: 1px solid var(--moss);
  padding: 0.5em;
  position: relative;
  top: -80px;
`

const P = styled.p`
  color: var(--moss);
`

function Countdown({ seconds }) {
  let calculatedMinutes = Math.floor(seconds / 60)
  let calculatedSeconds = seconds % 60

  const handleTimeDisplay = () => {
    let displaySeconds = calculatedSeconds < 10 ? `0${calculatedSeconds}` : calculatedSeconds
    return `0${calculatedMinutes}:${displaySeconds}`
  }

  return (
    <Timer>
      <P>Timer</P>
      <P>{handleTimeDisplay()}</P>
    </Timer>
  )
}

export default Countdown