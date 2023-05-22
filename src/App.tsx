import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const Window = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Sidebar = styled.ul`
  width: 250px;
  height: 100vh;
  border-right: 1px solid;
  padding: 12px 16px;
  list-style-type: none;
  box-sizing: border-box;
  margin: 0;
`

const Content = styled.div`
  height: 100vh;
  position: absolute;
  top: 0;
  left: 250px;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 12px 16px;
`

const SidebarLine = styled.li<{ active: boolean }>`
  line-height: 32px;
  cursor: pointer;
  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({ active }) => active ? 'lightgray' : 'transparent'};
  &:hover {
    background-color: lightgray;
    border-color: lightgray;
  }
`

const Title = styled.h2`
  margin: 0 0 12px 0;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 500px;
  margin-bottom: 12px;
`

const Text = styled.p`
  margin-bottom: 8px;
`

const Button = styled.button`
  margin-bottom: 8px;
`

const DAYS = [1, 2, 3, 4, 5]

const App = () => {
  const [activeDay, setActiveDay] = useState<number>(null)
  const [dayInput, setDayInput] = useState<string>(null)

  const loadDayInput = useCallback(async (dayNum: number): Promise<string> =>
    fetch(`${process.env.PUBLIC_URL}/inputs/input${dayNum}.txt`).then(response => response.text()),
    []
  )

  const execute = useCallback((dayNum: number, part: number, input: string) =>
    import(`./solutions/day-${dayNum}/${part}.ts`)
      .then(({ run }) => run(input)),
    []
  )

  const renderDayContent = useCallback(() => {
    if (!activeDay) {
      return 'Please select a day on the left!'
    }
    return (
      <>
        <Title>{`Day ${activeDay}`}</Title>
        {!_.isNil(dayInput) && (
          <>
            <Text>Input:</Text>
            <TextArea value={dayInput} onChange={(event) => setDayInput(event.target.value)}></TextArea>
            <Button onClick={() => execute(activeDay, 1, dayInput)}>Run part 1</Button>
            <br />
            <Button onClick={() => execute(activeDay, 2, dayInput)}>Run part 2</Button>
          </>
        )}
      </>
    )
  }, [activeDay, dayInput, execute])

  useEffect(() => {
    if (!activeDay) {
      return
    }
    loadDayInput(activeDay)
      .then((dayInput) => {
        setDayInput(dayInput)
      })
  }, [activeDay, loadDayInput])

  useEffect(() => {
    console.log('day input changed')
  }, [dayInput])

  return (
    <Window>
      <Sidebar>
        {DAYS.map((dayNum: number) => {
          return (
            <SidebarLine
              key={dayNum}
              active={activeDay === dayNum}
              onClick={() => setActiveDay(dayNum)}
            >
              {`Day ${dayNum}`}
            </SidebarLine>
          )
        })}
      </Sidebar>
      <Content>{renderDayContent()}</Content>
    </Window>
  )
}

export default App
