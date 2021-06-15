import React from 'react';
import ReactPlayer from 'react-player'
import { IProps, EventProps } from './types'
import { extractIdFromURl } from './utils/utils'

class App extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    this.state = {videoId: extractIdFromURl(this.props.url)}
  }
  handleProgress(event: EventProps)
  {
    console.log(`${event.playedSeconds} second already played`)
    return event
  }
  render() {
    return (
      <div className="App">
      <p>
      Hello sir
      </p>
      <p>
      <ReactPlayer url={this.props.url} onProgress={(event) => this.handleProgress(event)} controls={true}/>
      </p>
      </div>
    );
  }
}

export default App;