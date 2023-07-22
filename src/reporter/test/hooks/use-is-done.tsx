import { Minimal } from '@tapjs/core'
import { Box, Text } from 'ink'
import { render } from 'ink-testing-library'
import React, { FC } from 'react'
import t from 'tap'
import { useIsDone } from '../../dist/hooks/use-is-done.js'
import { sleep } from '../fixtures/sleep.js'
import { reduce } from '../fixtures/reduce.js'

const Tag: FC<{ test: Minimal }> = ({ test }) => {
  const done = useIsDone(test)
  return (
    <Box flexDirection="column">
      <Text>{JSON.stringify(done)}</Text>
    </Box>
  )
}

t.test('check if test is done', async t => {
  const tb = new Minimal({ name: 'done test' })
  const app = render(<Tag test={tb} />)
  await sleep(64)
  tb.pass('this is fine')
  tb.test('child test', async () => sleep(64))
  tb.pass('this is fine')
  tb.end()
  await tb.concat()
  app.unmount()

  t.strictSame(reduce(app.frames), ['false', 'true'])
})
