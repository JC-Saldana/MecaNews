import React from 'react';

const Preview = ({ text, input }) => {
  
  //console.log("text: " + text)
  //console.log("input: " + input)
  if (text) {
    const newText = text.split('')

    return (
      <div className="preview">
        {
          newText.map((s, i) => {
            let color;
            if (i < input.length) {
              color = s === input[i] ? '#dfffa0' : '#fcbea4';
            }
            return <span key={i} style={{ backgroundColor: color }}>{s}</span>
          })
        }
      </div>
    )
  } else {
    return null
  }

}
export default Preview