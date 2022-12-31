import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../lib/context";

class Form extends React.Component<{ onCloseDialog: any}> {
  constructor(props) {
    super(props);
    this.state = { value: '', isSettingsOpen: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleCancel(event){
    event.preventDefault();
    this.props.onCloseDialog()
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onCloseDialog(event.target.value)

  }

  render() {
    return (
              <form method="dialog" onSubmit={this.handleSubmit}>
                  {/* <label>Theme
                      <select>
                      <option value="default">Choose…</option>
                      <option>Brine shrimp</option>
                      <option>Red panda</option>
                      <option>Spider monkey</option>
                      </select>
                  </label> */}
                  <fieldset>
                      <legend>Theme:</legend>
                      <div>
                      <input type="radio" id="light" name="theme" value="" defaultChecked onChange={this.handleChange}/>
                      <label htmlFor="light">Light</label>
                      </div>
                      <div>
                      <input type="radio" id="dark" name="theme" value="dark" />
                      <label htmlFor="dark">Dark</label>
                      </div>
                      <div>
                      <input type="radio" id="crazy" name="theme" value="crazy" />
                      <label htmlFor="crazy">Crazy</label>
                      </div>
                  </fieldset>
                  <div>
                  <button value="cancel" onClick={this.handleCancel} >Cancel</button>
                  <button id="confirmBtn"onClick={this.handleSubmit} >Confirm</button>
                  </div>
              </form>
    );
  }
}


export default function Dialog() {
  const { settingsDialogOpen ,setSettingsDialogOpen } = useContext(AppContext)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const prevElement = useRef(null)
  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    if( firstRender.current){
      firstRender.current = false;
    } else {
      const dialogNode = dialogRef.current
      const prevNode = prevElement.current
      if(dialogNode) {
        if(settingsDialogOpen){
          if(document.activeElement) prevElement.current = document.activeElement;
          dialogNode.showModal()
        } else {
          dialogNode.close()
          if(prevNode) prevNode.focus();
        }
      }
    }
  },[settingsDialogOpen])

  /* useEffect(() => {
    const dialogNode = dialogRef.current
    const handleClose = (e) => {
      e.preventDefault();
      setSettingsDialogOpen(false)
    }
    dialogNode.addEventListener('cancel', handleClose);
    return () => {
      dialogNode.removeEventListener('cancel', handleClose)
    }
  },[settingsDialogOpen]) */
  
  function onCloseDialog(){
    setSettingsDialogOpen(false)
  }

    console.log('settingsDialogOpen: ', settingsDialogOpen)
      return (
        <dialog id="favDialog" ref={dialogRef}>
          <Form onCloseDialog={onCloseDialog}></Form>
        </dialog>
      );
    
  }

