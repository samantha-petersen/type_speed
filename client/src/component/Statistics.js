import styled from 'styled-components'

const Title = styled.h2`
  color: var(--moss);
  margin: 0;
  font-size: 5em;
  font-family: 'Abril Fatface';
`

const StatisticsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  background: var(--khaki);
  color: rgb(255 255 255);
  height: 610px;
  border-radius: 3em 1em 3em 1em;
  width: 600px;
  flex-direction: column;
  margin: 0 auto;
`

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
  align-self: center;
  transition: 0.35s;
  &:hover {
    background: var(--darkmoss);
  }
`

const Highlight = styled.span`
  color: var(--chocolate);
  border: none;
  font-size: 1.5em;
`

function Statistics({ statistics, statsDisplay, setMinutesDisplay, setStatsDisplay }) {
  const accuracy = statistics.accuracy < 1 ? statistics.accuracy.toFixed(2).slice(2) : 100
  const wpm = statistics.wpm % 1 === 0 ? statistics.wpm : statistics.wpm.toFixed(1)

  const again = () => {
    setMinutesDisplay(true)
    setStatsDisplay(false)
  }

  return (
    <StatisticsContainer id={statsDisplay ? null : 'hidden'}>
      <Title>Time's up!</Title>
      <p>You typed with <Highlight>{wpm}</Highlight> WPM with <Highlight>{accuracy}%</Highlight> accuracy.</p>
      <Button onClick={again}>TRY AGAIN</Button>
    </StatisticsContainer>
  )
}

export default Statistics