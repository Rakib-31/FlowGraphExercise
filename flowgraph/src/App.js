import React, { useRef, useEffect, useState } from 'react';
import QuestionModal from './modal/questionModal';
 
function App() {

  const [openModal, setOpenModal] = useState(false);

  const canvas = useRef();
  //let size = {x: 100,y: 100,w: 170,h: 80};
  let ctx = null;
  let parentBox = null;
  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;

  const boxes = [
    {
      id: '0',
      pid: null,
      text: '+',
      size: {x: 600,y: 120, r: 50},
      isCircle: true
    },
    {
      id: '1',
      pid: '0',
      text: 'Are you feeling any pain today?',
      size: {x: 350,y: 100,w: 170,h: 80},
      dropdownBox: {x: 370, y: 110, w: 130, h: 15},
      threeDotButtonSize: {x: 490, y: 160, w: 30, h: 20},
      addField: {x: 520, y: 80, w: 100, h: 30},
      editField: {x: 520, y: 110, w: 100, h: 30},
      deleteField: {x: 520, y: 140, w: 100, h: 30},
      responseField: {x: 520, y: 170, w: 100, h: 30},
      isCircle: false
    },
    {
      id: '2',
      pid: '0',
      text: 'Yes',
      next: '2',
      size: {x: 50,y: 250,w: 170,h: 80},
      dropdownBox: {x: 70, y: 260, w: 130, h: 15},
      threeDotButtonSize: {x: 190, y: 310, w: 30, h: 20},
      addField: {x: 220, y: 230, w: 100, h: 30},
      editField: {x: 220, y: 260, w: 100, h: 30},
      deleteField: {x: 220, y: 290, w: 100, h: 30},
      responseField: {x: 220, y: 320, w: 100, h: 30},
      isCircle: false
    },
    {
      id: '3',
      pid: '1',
      text: '+',
      size: {x: 400,y: 600, r: 50},
      isCircle: true
    }
  ]
  
 
  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    console.log(canvasEle.clientWidth);
    console.log(canvasEle.clientHeight);
 
    // get context of the canvas
    ctx = canvasEle.getContext("2d");
    //drawStartCircle(boxes[0]);
    draw();
  });

  const drawStartCircle = (circle) => {
    ctx.beginPath();
    ctx.arc(circle.size.x, circle.size.y, circle.size.r, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.font = '50px';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(circle.text, circle.size.x, circle.size.y + 4);
  }
 
  const draw = () => {
    

    console.log(canvas.current.clientWidth);
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    boxes.map(info => {
      if(info.isCircle) drawStartCircle(info);
      else drawFillRect(info);
      if(info.pid){
        parentBox = getParent(info.pid);
        console.log('parent ' ,parentBox);
        linDrawBetweenPrentAndChild(parentBox.size, info.size, parentBox.isCircle, info.isCircle);
      }
    });
    
  }

  const linDrawBetweenPrentAndChild = (parentBox, childBox, parentIsCircle, childIsCiercle) => {
    if(parentIsCircle){
      ctx.beginPath();
      ctx.moveTo(parentBox.x, parentBox.y);
      ctx.lineTo(childBox.x + childBox.w / 2, childBox.y);
      ctx.stroke();
    }
    else if(childIsCiercle){
      ctx.beginPath();
      ctx.moveTo(parentBox.x + parentBox.w / 2, parentBox.y + parentBox.h);
      ctx.lineTo(childBox.x, childBox.y);
      ctx.stroke();
    }
    else{
      ctx.beginPath();
      ctx.moveTo(parentBox.x + parentBox.w / 2, parentBox.y + parentBox.h);
      ctx.lineTo(childBox.x + childBox.w / 2, childBox.y);
      ctx.stroke();
    }
  }

  const getParent = (pid) => {
    for(let i = 0; i < boxes.length; i++){
      if(boxes[i].id === pid){
        return boxes[i];
      }
    }
  }
 
  // draw rectangle with background
  const drawFillRect = (info, style = {}) => {
    console.log(info.id);
    const { x, y, w, h } = info.size;
    const dotRect = info.threeDotButtonSize;
    const { backgroundColor = 'black' } = style;
 
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = 'white';
    
    ctx.fillRect(info.dropdownBox.x, info.dropdownBox.y, info.dropdownBox.w, info.dropdownBox.h);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000000";
    ctx.font="12px Georgia";
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "red";
    ctx.fillText('Question?...', info.dropdownBox.x + (info.dropdownBox.w/2), info.dropdownBox.y + (info.dropdownBox.h/2));

    let tringleX1 = info.dropdownBox.x + info.dropdownBox.w - 18;
    let tringleX2 = info.dropdownBox.x + info.dropdownBox.w - 15;
    let tringleX3 = (tringleX1 + tringleX2) / 2;
    
    //drawing dropdown triangle
    ctx.moveTo(tringleX1, info.dropdownBox.y + 6);
    ctx.lineTo(tringleX2, info.dropdownBox.y + 6);
    ctx.lineTo(tringleX3, info.dropdownBox.y + 8);
    ctx.closePath();
    

    ctx.lineWidth = 10;
    ctx.strokeStyle = '#666666';
    ctx.stroke();
    
    ctx.fillStyle = 'black';
    ctx.fillRect(dotRect.x, dotRect.y, dotRect.w, dotRect.h);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000000";
    ctx.font="20px Georgia";
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "red";
    ctx.fillText('...', dotRect.x + (dotRect.w/2), dotRect.y + (dotRect.h/2));

    // ctx.lineWidth = 4;
    // ctx.strokeStyle = "#000000";
    // ctx.font="12px Georgia";
    // ctx.textAlign="center"; 
    // ctx.textBaseline = "middle";
    // ctx.fillStyle = "red";
    // ctx.fillText(info.id,x+(w/2),y+(h/5));

    // ctx.lineWidth = 4;
    // ctx.strokeStyle = "#000000";
    // ctx.font="12px Georgia";
     
    // ctx.textBaseline = "middle";
    // ctx.fillStyle = "red";    
    // ctx.fillText(info.text,x+(w/2),y+(h/2));

    // ctx.lineWidth = 4;
    // ctx.strokeStyle = "#000000";
    // ctx.font="12px Georgia";
    // ctx.textAlign="center"; 
    // ctx.textBaseline = "middle";
    // ctx.fillStyle = "red";
    // let next = 'null';
    // if(info.next) next = info.next;
    // ctx.fillText(next,x+(w/2),y+(3*h/4));
    //size.x += 150;
    //size.y += 150;
  }

  const positioningMenuItem = (menuItem , text) => {
    console.log(menuItem)
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(menuItem.x, menuItem.y, menuItem.w, menuItem.h);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000000";
    ctx.font="12px Georgia";
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";
    ctx.fillStyle = "red";
    ctx.fillText(text, menuItem.x + (menuItem.w/2), menuItem.y + (menuItem.h/2));
    ctx.moveTo(menuItem.x, menuItem.y + menuItem.h);
    ctx.lineTo(menuItem.x + menuItem.w, menuItem.y + menuItem.h);
    ctx.stroke();
  }

  const drawPopupMenu = (box) => {
    console.log(box);
    positioningMenuItem(box.addField, 'Add');
    positioningMenuItem(box.editField, 'Edit');
    positioningMenuItem(box.deleteField, 'Delete');
    positioningMenuItem(box.responseField, 'Add response');
  }
 
  // identify the click event in the rectangle
  const hitBox = (x, y) => {

    let isTarget = null;

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];

      if(box.isCircle){
        if((x-box.size.x) * (x-box.size.x) + (y-box.size.y) * (y-box.size.y) - box.size.r * box.size.r <= 0){
          dragTarget = box;
          isTarget = true;
          boxes.push({
            id: '5',
            pid: '0',
            text: 'Are you feeling any pain today?',
            size: {x: 350,y: 100,w: 170,h: 80},
            dropdownBox: {x: 370, y: 110, w: 130, h: 15},
            threeDotButtonSize: {x: 490, y: 160, w: 30, h: 20},
            addField: {x: 520, y: 80, w: 100, h: 30},
            editField: {x: 520, y: 110, w: 100, h: 30},
            deleteField: {x: 520, y: 140, w: 100, h: 30},
            responseField: {x: 520, y: 170, w: 100, h: 30},
            isCircle: false
          })
          break;
        }
      }

      else if(x >= box.dropdownBox.x && x <= box.dropdownBox.x + box.dropdownBox.w && y >= box.dropdownBox.y && y <= box.dropdownBox.y + box.dropdownBox.h){
        setOpenModal(true);
      }

      else if (x >= box.threeDotButtonSize.x && x <= box.threeDotButtonSize.x + box.threeDotButtonSize.w && y >= box.threeDotButtonSize.y && y <= box.threeDotButtonSize.y + box.threeDotButtonSize.h) {
        console.log('in threedot button');
        dragTarget = box;
        isTarget = true;
        drawPopupMenu(box);
        break;
      }
      else if(x >= box.addField.x && x <= box.addField.x + box.addField.w && y >= box.addField.y && y <= box.addField.y + box.addField.h){
        console.log('addfield');
        dragTarget = box;
        console.log('in', dragTarget);
        isTarget = true;
        break;
      }
      else if(x >= box.editField.x && x <= box.editField.x + box.editField.w && y >= box.editField.y && y <= box.editField.y + box.editField.h){
        console.log('editfield');
        dragTarget = box;
        console.log('in', dragTarget);
        isTarget = true;
        break;
      }
      else if(x >= box.deleteField.x && x <= box.deleteField.x + box.deleteField.w && y >= box.deleteField.y && y <= box.deleteField.y + box.deleteField.h){
        console.log('deletefield');
        dragTarget = box;
        console.log('in', dragTarget);
        isTarget = true;
        break;
      }
      else if(x >= box.responseField.x && x <= box.responseField.x + box.responseField.w && y >= box.responseField.y && y <= box.responseField.y + box.responseField.h){
        console.log('responsefield');
        dragTarget = box;
        console.log('in', dragTarget);
        isTarget = true;
        break;
      }
      else if (x >= box.size.x && x <= box.size.x + box.size.w && y >= box.size.y && y <= box.size.y + box.size.h) {
        dragTarget = box;
        console.log('in', dragTarget);
        isTarget = true;
        
        break;
      }
    }
    return isTarget;
  }
 
  const handleMouseDown = e => {
    console.log('mouse down');

    console.log(e.nativeEvent.offsetX , canvas.current.clientLeft);
    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    console.log(startX, startY);
    isDown = hitBox(startX, startY);
    console.log('isdown ', isDown);

  }

  const handleMouseMove = e => {

    console.log(isDown);
    if (!isDown) return;
    console.log('in move ' + e.nativeEvent.offsetX , canvas.current.clientLeft)

    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);

    const dx = mouseX - startX;
    const dy = mouseY - startY;

    startX = mouseX;
    startY = mouseY;

    console.log('dragtarget',dragTarget);
    dragTarget.size.x += dx;
    dragTarget.size.y += dy;

    if(!dragTarget.isCircle){
      dragTarget.threeDotButtonSize.x += dx;
      dragTarget.threeDotButtonSize.y += dy;
      dragTarget.addField.x += dx;
      dragTarget.addField.y += dy;
      dragTarget.editField.x += dx;
      dragTarget.editField.y += dy;
      dragTarget.deleteField.x += dx;
      dragTarget.deleteField.y += dy;
      dragTarget.responseField.x += dx;
      dragTarget.responseField.y += dy;
      dragTarget.dropdownBox.x += dx;
      dragTarget.dropdownBox.y += dy;
    }
    draw();
    
  }
  const handleMouseUp = e => {
    dragTarget = null;
    isDown = false;
  }
  const handleMouseOut = e => {
    handleMouseUp(e);
  }

  const questionSelection = (question) => {
    console.log(question);

  }

  const closeModal = (status) => {
    setOpenModal(status);
  }
 
  return (
    <div className="App">
    <QuestionModal openModal={openModal} closeModal={closeModal} questionSelection={questionSelection}/>
      
      <canvas 
        style={{height: '1000px', width: '100%'}}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        ref={canvas}
      ><div id="showmodal"></div></canvas>
      
    </div>
  );
}
 
export default App;