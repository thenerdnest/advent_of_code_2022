const path = require('path')
const { createReadStream } = require('fs')
const readline = require('readline')
const events = require('events')

async function main () {
  let redundantAssignmentCount = 0

  const inputLineReader = readline.createInterface({
    input: createReadStream(path.resolve(process.argv[2]), 'utf-8')
  })

  inputLineReader.on('line', (line) => {
    let [groupA, groupB] = line.split(',')
      .map((g) => {
        return g.split('-').map((n) => {
          return Number.parseInt(n)
        })
      })
    if (groupA[0] < groupB[0]) {
      if (groupA[1] >= groupB[1]) {
        redundantAssignmentCount += 1
      }
    } else if (groupB[0] < groupA[0]) {
      if (groupB[1] >= groupA[1]) {
        redundantAssignmentCount += 1
      }
    } else {
      redundantAssignmentCount += 1
    }
  })
  
  await events.once(inputLineReader, 'close')

  console.log(`the number of redundant assignments is: ${redundantAssignmentCount}`)
}

main()
  .catch(console.error)