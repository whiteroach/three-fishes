import { useState, useEffect } from 'react'
import { HtmlEditor, Toolbar, Editor } from '@aeaton/react-prosemirror'
import { plugins, schema, toolbar } from '@aeaton/react-prosemirror-config-default'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const initialValue = '<p></p>'

const Prose = () => {
  const [value, setValue] = useState(initialValue)
  
  console.log({ value })
    // useEffect(()=>{document.getElementsByClassName('val').innerHTML = value})
  return (
      <>
    <HtmlEditor
      schema={schema}
      plugins={plugins}
      value={initialValue}
      handleChange={setValue}
      debounce={250}
    >
      <Editor autoFocus />
      <Toolbar toolbar={toolbar} />
    </HtmlEditor>

    <div>{ReactHtmlParser(value)}</div>
    <div className='val'></div>
    </>
  )
}

export default Prose