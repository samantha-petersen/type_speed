import '../style/App.css';
import { useState } from 'react'
import SetMinutes from './SetMinutes.js'
import TextArea from './TextArea.js'
import Countdown from "./Countdown"
import axios from 'axios'
import styled from 'styled-components'
import Statistics from './Statistics'

const Section = styled.section`
  text-align: -webkit-center;
  position: relative;
  top: -60px;
`

const Heading = styled.h1`
  color: var(--chocolate);
  margin: 0;
  font-size: 17em;
  font-family: 'Abril Fatface';
  font-weight: 200;
`

const SubHeading = styled.h2`
  color: var(--chocolate);
  margin: 0;
  font-size: 4em;
  font-family: 'Abril Fatface';
  font-weight: 200;
  letter-spacing: 49px;
  position: relative;
  top: -70px;
`

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 260px;
`
const BackgroundContainer = styled.div`
  position: relative;
  left: 0;
  right: 0;
  bottom: -350px;
  z-index: -1;
`

const defaultStats = {
  wpm: 0,
  accuracy: 0
}

function App() {
  // State for typing speed
  const [paragraphs, setParagraphs] = useState([])
  const [userInput, setUserInput] = useState([])
  const [statistics, setStatistics] = useState(defaultStats)
  // State for visibility components
  const [minutesDisplay, setMinutesDisplay] = useState(true)
  const [textAreaDisplay, setTextAreaDisplay] = useState(false)
  const [statsDisplay, setStatsDisplay] = useState(false)
  // State for inacuracy count
  const [inaccuracteCount, setInaccurateCount] = useState(0)
  // State for countdown
  let [seconds, setSeconds] = useState(null)
  const [min, setMin] = useState(0)
  const [isTimerOn, setIsTimerOn] = useState(false)
  // State for interval ID
  const [intervalId, setIntervalId] = useState(null)

  function getParagraphs(min) {
    const amount = {
      1: 5,
      3: 20,
      5: 30
    }
    axios.get(`/api/paragraphs/${amount[min]}`)
      .then(res => {
        const array = res.data.map(responseObj => responseObj.paragraph)
        setParagraphs(array.join(' ').split(''))
      })
      .then(setMinutesDisplay(false), setTextAreaDisplay(true))
      .then(setSeconds(min * 60), setMin(min))
  }

  function handleUserInput(e) {
    const newValue = e.target.value.split('')
    const inputType = e.nativeEvent.inputType

    setUserInput(newValue)
    handleInterval()
    inaccuracyCounter(newValue, inputType)
    handleAutoScroll(inputType)

  }

  const handleInterval = () => {
    if (!isTimerOn && seconds > 0) {
      let id = setInterval(() => {
        seconds--
        setSeconds(seconds)
      }, 1000)
      setIsTimerOn(true)
      setIntervalId(id)
    }
  }

  const inaccuracyCounter = (newValue, inputType) => {
    newValue.forEach((letter, i) => {
      if (inputType === 'insertText') {
        letter !== paragraphs[i] ? setInaccurateCount(inaccuracteCount + 1) : setInaccurateCount(inaccuracteCount)
      }
    })
  }

  const handleAutoScroll = (inputType) => {
    const allSpanLetter = document.querySelectorAll('.letter')
    const currentInputLocation = allSpanLetter[userInput.length].getBoundingClientRect().right
    const nextInputLocation = allSpanLetter[userInput.length + 1].getBoundingClientRect().right

    if (inputType === 'deleteContentBackward' && currentInputLocation > nextInputLocation) {
      document.querySelector('.paragraphs').scrollTop -= 46
    } else if (currentInputLocation > nextInputLocation) {
      document.querySelector('.paragraphs').scrollTop += 46
    }
  }

  // Checks if there is an Interval ID & if the time has reached 0
  if (intervalId != null) {
    if (seconds === 0) {
      end()
    }
  }

  // Resets most State back to default value
  function end() {
    clearInterval(intervalId)
    setIntervalId(null)
    setIsTimerOn(false)
    setSeconds(null)
    setParagraphs([])
    setUserInput([])
    setInaccurateCount(0)
    document.querySelector('textarea').value = null
    setStatistics({
      wpm: (userInput.length / 5) / min,
      accuracy: (userInput.length - inaccuracteCount) / userInput.length
    })
    setStatsDisplay(true)
    setTextAreaDisplay(false)
    setMin(0)
  }

  return (
    <Section>
      <Heading>TYPING</Heading>
      <Container className='content-container'>
        <SetMinutes
          getParagraphs={getParagraphs}
          btnDisplay={minutesDisplay}
        />
        <TextArea
          paragraphs={paragraphs}
          userInput={userInput}
          typingDisplay={textAreaDisplay}
          handleUserInput={handleUserInput}
          inaccuracteCount={inaccuracteCount}
        />
        <Statistics
          statistics={statistics}
          statsDisplay={statsDisplay}
          setMinutesDisplay={setMinutesDisplay}
          setStatsDisplay={setStatsDisplay}
        />
      </Container>
      <BackgroundContainer>
        <Heading>SPEED</Heading>
        <SubHeading>TEST</SubHeading>
        <Countdown
          seconds={seconds}
          isTimerOn={isTimerOn}
        />
      </BackgroundContainer>
    </Section>
  )
}

export default App;