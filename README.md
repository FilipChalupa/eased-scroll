# Eased scroll [![npm](https://img.shields.io/npm/v/eased-scroll.svg)](https://www.npmjs.com/package/eased-scroll) [![Dependencies](https://img.shields.io/david/FilipChalupa/eased-scroll.svg)](https://www.npmjs.com/package/eased-scroll?activeTab=dependencies) ![npm type definitions](https://img.shields.io/npm/types/eased-scroll.svg)

Listen to eased window scroll. [Demo](https://filipchalupa.cz/eased-scroll/demo.html).

![UI example](https://raw.githubusercontent.com/FilipChalupa/eased-scroll/main/screencast.gif)

## Installation

```bash
npm install eased-scroll
```

## How to use

### JavaScript:

```javascript
import { easedScroll } from 'eased-scroll'

easedScroll(200).addListener((value) => {
	console.log('Actual value', window.scrollY)
	console.log('Smooth value', value)
})
```

For more advanced cases you get use methods `removeListener` and `getValue` too.
