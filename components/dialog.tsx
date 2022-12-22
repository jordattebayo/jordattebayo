import React from "react";

class Dialog extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '', isSettingsOpen: false };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
    }

    closeDialog(){
        this.setState({ isSettingsOpen: false})
    }
  
    render() {
      return (
        <dialog id="favDialog" /* open={openSettings} */>
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
                        <input type="radio" id="light" name="theme" value="light" defaultChecked onChange={this.handleChange}/>
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
                    <button value="cancel" onClick={this.closeDialog} >Cancel</button>
                    <button id="confirmBtn" >Confirm</button>
                    </div>
                </form>
                </dialog>
      );
    }
  }

  export default Dialog;