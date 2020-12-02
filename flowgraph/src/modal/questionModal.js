import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',

    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'grey'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('showmodal'))
 
export default function QuestionModal(props){
  var subtitle;
  const [modalIsOpen,setIsOpen] = useState(false);

  useEffect(() => {
      console.log('false is false');
    setIsOpen(props.openModal);
  });

  function showModal(){
      
          return (
            <div className="text-center" onClick={()=>props.closeModal(false)}>
            
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              contentLabel="Example Modal"
              
            >
                <div className="text-center ml-4">
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}}  type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}} type="text" value="Are you feeling any pain today?"/><br/>
                    <input onClick={(e) => props.questionSelection(e.target.value)} style={{width: '500px', cursor: 'pointer'}}  type="text" value="Are you feeling any pain today?"/><br/>
                    
                </div>
              </Modal>
          </div>
          );
      
  }
 
    return (

        <div>{showModal()}</div>
      
    );
}