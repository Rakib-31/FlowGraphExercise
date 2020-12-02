import React, {useState, useEffect} from 'react';
import { SteppedLineTo } from 'react-lineto';
//import OrgChart from '@balkangraph/orgchart.js';

const style = {
    width: '200px',
    height: '100px',
    background: 'blue'
}


function Flowgraph(){

    const [nodes, setNodes] = useState(
        [
            {id: 1, text: "", nextId: ""},
            {id: 2, text: "", nextId: "" },
            {id: 3, pid: 1, text: "", nextId: "" },
            {id: 4, pid: 1, text: "", nextId: "" }
        ]);
    
    const [statusOfStartClick, setStatusOfStartClick] = useState(true);

    const [styleRectangleBox, setStyleRectangleBOx] = useState(style);
    const [classname, setClassName] = useState('');
    const [childClassName, setChildClassName] = useState('');
    const [childSerial, setChildSerial] = useState(0);
    const [lineArray, setLineArray] = useState([]);
    const [temporaryLineArray, setTemporaryLineArray] = useState([]);

    useEffect(() => {
        console.log(childClassName);
    }, [childClassName, classname]);

    const clickHandler = () => {
        console.log('clicked');
    }

    const rectangleBoxStyle = (id, text) => {

        let startChild = document.getElementById(id);
        let child = document.createElement('div');
        let threeDotButton = document.createElement('button');

        

        threeDotButton.style.background = 'blue';
        threeDotButton.style.border = 'none';
        threeDotButton.style.position = 'absolute';
        threeDotButton.style.bottom = '5px';
        threeDotButton.style.right= '5px';
        threeDotButton.style.color = 'white';
        threeDotButton.innerHTML = '...';
        threeDotButton.setAttribute('onClick', clickHandler());

        console.log(threeDotButton);

        child.style.width = '15%';
        child.style.height = '100px';
        child.style.background = 'blue';
        child.style.color = 'white';
        child.style.position = 'relative';
        //child.style.left = '42%';
        child.innerHTML = text;
        
        child.setAttribute('class','child' + childSerial);
        child.style.display = 'inline-block'

        child.appendChild(threeDotButton);
        console.log(child);
        startChild.appendChild(child);

        console.log('child' + childSerial)

        setChildSerial(prev => prev + 1)
        
        return 'child' + childSerial;
    } 


    const openStartChild = (id, rootclassname) => {

        //if(statusOfStartClick){
            var childClass = rectangleBoxStyle(id, 'Are you feeling any pain today?');
        //}
        console.log(childClass);

        setStatusOfStartClick(false);
        setClassName(rootclassname);
        setChildClassName(childClass);
    }

    const drawLineBtwnRootAndChild = () => {
        //console.log('root to child');
        let x = document.getElementById('start-child');
        if(x!==null){
            
            // for(let i = 0; i < x.childElementCount; i++){
            //     console.log(i);
            //     //lineArray.push('<SteppedLineTo from={classname} to={x.childNodes[i].className} orientation="v" />');
            //     <SteppedLineTo from={classname} to={x.childNodes[i].className} orientation="v" />
            // }
            //setTemporaryLineArray(lineArray);
            // while(lineArray.length){
            //     lineArray.pop();
            // }
            //return lineArray;
            //x.childNodes.map(res => console.log(res));
            console.log(typeof(x.childNodes));
        }
        
    }

    return (
        <div style={{height: '100%', width: '70%'}}>
            <div className="parent" onClick={() => openStartChild('start-child', 'parent')} style={{height: '100px', width: '15%', background: 'blue', position: 'relative', left: '42%', top: '100px', textAlign:'center'}}>
                <h4 style={{position: 'relative', top: '40px', color: 'white'}}>
                    Start
                </h4>
            </div>
            <div id="start-child" style={{  marginTop: '150px'}}>
            </div>
            { drawLineBtwnRootAndChild()}
            
            
        </div>
    );
}

export default Flowgraph;