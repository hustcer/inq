
# Inq

inq is a CLI tool to query U.S. stock insider tradings.

## Install

- First you should have [node.js](http://nodejs.org/download/)(v0.10.0 or later) installed.
- Then install <code>inq</code> by: <code>sudo npm install -g inq</code>.

## Usage

```javascript
Usage: inq [options] or inq <symbols>

Options:

  -h, --help               output usage information
  -V, --version            output the version number
  -s, --symbol  <symbols>  Symbol list to query, separated by comma.
  -t, --time    <span>     Insider trading time span, should be one of: 1m, 2m, 3m, 4m, or 5m.

Usage Examples:

  inq aapl,yhoo               , Query insider trading of aapl and yhoo in latest 3 months(default).
  inq -s aapl,yhoo            , Query insider trading of aapl and yhoo.
  inq -s aapl,yhoo -t 2m      , Query insider trading of aapl and yhoo in latest 2 months.
  inq --symbol aapl,yhoo      , Query insider trading of aapl and yhoo.
  inq --symbol aapl --time 5m , Query insider trading of aapl in latest 5 months.

```

## Demo Output

## Issues

Tell me if you have any questions, please submit an issue [here](https://github.com/hustcer/inq/issues/new).
