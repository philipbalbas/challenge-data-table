var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

const reduce = (row, memo) => {
  if (row.type === 'impression') {
    memo.impressions = (memo.impressions || 0) + 1
  }
  if (row.type === 'load') {
    memo.loads = (memo.loads || 0) + 1
  }
  if (row.type === 'display') {
    memo.displays = (memo.displays || 0) + 1
  }

  if (memo.loads) {
    if (memo.impressions) {
      memo.loadRate = memo.loads / memo.impressions
    }
    if (memo.displays) {
      memo.displayRate = memo.displays / memo.loads
    }
  }

  return memo
}

const calculations = [
  {
    title: 'Impressions',
    value: 'impressions',
    template: (val, row) => val
  },
  {
    title: 'Loads',
    value: 'loads',
    template: (val, row) => val
  },
  {
    title: 'Displays',
    value: 'displays',
    template: (val, row) => val
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    template: (val, row) => {
      if (val) {
        return `${(val * 100).toFixed(1)}%`
      }
    }
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    template: (val, row) => {
      if (val) {
        return `${(val * 100).toFixed(1)}%`
      }
    }
  }
]

module.exports = createReactClass({
  render() {
    return (
      <div>
        <ReactPivot
          rows={rows}
          dimensions={[
            { value: 'date', title: 'Date' },
            { value: 'host', title: 'Host' }
          ]}
          reduce={reduce}
          calculations={calculations}
          activeDimensions={['Date', 'Host']}
        />
      </div>
    )
  }
})
