# Inq

inq is a CLI tool to query U.S. stock insider tradings.

## Usage

```javascript
Usage: inq [options]

Options:

  -h, --help               output usage information
  -V, --version            output the version number
  -s, --symbol  <symbols>  Symbol list to query, separated by comma.
  -t, --time    <span>     Insider trading time span, should be one of: 1m, 2m, 3m, 4m, or 5m.

Usage Examples:

  inq aapl,yhoo                   , Query insider trading of aapl and yhoo in latest 3 months(default).
  inq -s aapl,yhoo                , Query insider trading of aapl and yhoo.
  inq -s aapl,yhoo -t 2m          , Query insider trading of aapl and yhoo in latest 2 months.
  inq --symbol aapl,yhoo          , Query insider trading of aapl and yhoo.
  inq --symbol aapl --time 5m     , Query insider trading of aapl in latest 5 months.
```
