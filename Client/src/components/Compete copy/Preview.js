import React from 'react';

const Preview = ({ text, userInput }) => {
  //console.log("text: " + text)
  if (text) {
    const newText = text.split('')

    return (
      <div className="preview">
        {
          newText.map((s, i) => {
            let color;
            if (i < userInput.length) {
              color = s === userInput[i] ? '#dfffa0' : '#fcbea4';
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