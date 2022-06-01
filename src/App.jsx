import { useState } from 'react'


function App() {
  const [content, setContent] = useState('')

  const onConvertedClick = (e) => {
    var text = e.target.value;
    navigator.clipboard.writeText(text).then(
      function () {
        console.log('Async: Copying to clipboard was successful!');
        e.target.select()
      },
      function (err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
  };

  const onContentChange = e => {
    let value = e.target.value
    if (!value) return

    value = value.replace('div', 'Box')
    value = value.replace('span', 'Text')
    value = value.replace('textarea', 'Input')

    value = value.replace(/(?<preClassName>className=(?<quotes>"|'))(?<classNames>.*)(?=\k<quotes>)/g, (matched, preClassName, quotes, classNames) => {
      const classes = classNames.split(' ')
      const converted = classes.reduce((prev, curr) => {
        const c = curr.split('-')
        let propName = ''
        if (c.length === 3) {
          propName = `${c[0]}='${c[1]}.${c[2]}'`
        } else if (c.length === 2) {
          propName = `${c[0]}='${c[1]}'`
        }

        return prev + ' ' + propName
      }, '').replace(/\s\s/, ' ').replace(/^\s/, '')

      return `${converted} ${preClassName}${classNames}${quotes}`
    })

    setContent(value)

  }

  return (
    <div className="App">
      <head>
        <title>Tailwind to Native Base</title>
      </head>
      <textarea onChange={onContentChange} name="content" id="" style={{ width: '100vw' }} rows="10" width="100%"></textarea>
      <textarea value={content} onClick={onConvertedClick} style={{
        padding: 10,
        width: '100vw',
        height: '100vh'
      }}>

      </textarea>
    </div>
  )
}

export default App
