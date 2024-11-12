import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import './curve.css';
// import HeaderInfo from './HeaderInfo';
import Typewriter from "typewriter-effect"
import ReactCurvedText from './lib/ReactCurvedText';

function CurvedTextApp() {
    const [width, setWidth] = useState(665);
    const [height, setHeight] = useState(382);
    const [cx, setCx] = useState(307);
    const [cy, setCy] = useState(147);
    const [rx, setRx] = useState(227);
    const [ry, setRy] = useState(100);
    const [startOffset, setStartOffset] = useState(-4);
    const [reversed, setReversed] = useState(true);
    const [text, setText] = useState('WELCOME TO CHESS GAMEBLOC');
    const [fontSize, setFontSize] = useState(33);
    const [textPathFill, setTextPathFill] = useState();
    const [dy, setDy] = useState(0);
    const [fill, setFill] = useState();
    const [rotate, setRotate] = useState(0);

    const textProps = fontSize ? { style: { fontSize: fontSize } } : null;
    const textPathProps = textPathFill ? { fill: textPathFill } : null;
    const tspanProps = dy ? { dy: dy } : null;
    const ellipseProps = fill ? { style: `fill: ${fill}` } : null;
    const svgProps = rotate ? { style: { transform: `rotate(${rotate}deg)` } } : null;

    const currentJsx = (
        <ReactCurvedText
            width={width}
            height={height}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            startOffset={startOffset}
            reversed={reversed}
            text={text}
            textProps={textProps}
            textPathProps={textPathProps}
            tspanProps={tspanProps}
            ellipseProps={ellipseProps}
            svgProps={svgProps}
        />
    );

    let currentJsxString = jsxToString(currentJsx, {
        displayName: 'ReactCurvedText',
        useFunctionCode: true,
    });
    currentJsxString = "import ReactCurvedText from 'react-curved-text';\n\n" + currentJsxString;
    return (
        <div className="App">
            {/* <HeaderInfo /> */}
            <div className="exampleDemo">
                {/* <br />
                <h1>
                    <a href={'https://www.npmjs.com/package/react-curved-text'} target="_blank" rel="noreferrer">
                        react-curved-text
                    </a>
                </h1>

                <div className="installationDiv">
                    <pre>npm install react-curved-text</pre>
                    <pre>yarn add react-curved-text</pre>
                </div>

                <h3>
                    <a
                        href="https://github.com/obss/react-curved-text/blob/master/src/App.jsx"
                        target="_blank"
                        rel="noreferrer"
                    >
                        View on GitHub
                    </a>
                </h3> */}
                {/* <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("GeeksForGeeks")
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString("Welcomes You")
                            .start();
                    }}
                /> */}
                <div className="exampleWrapperDiv">{currentJsx}</div>
            </div>
        </div>
    );
}

export default CurvedTextApp;