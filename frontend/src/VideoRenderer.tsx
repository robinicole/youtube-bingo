import React from 'react';
import ReactPlayer from "react-player"
import API from './api';


interface ProgressProps{
  played: number
  playedSeconds: number
  loaded: number
  loadedSeconds: number
}

interface ITranscript{
  text?: string,
  start: number,
  duration: number,
  words?: string[]
}

interface IState{
  transcript: ITranscript[],
  nextTranscript: ITranscript
}

interface IProps{
  videoId: string,
  words: string[]
}


function findNextTranscript(transcript: ITranscript[], time: number): ITranscript
{
  for (var i = 0; i < transcript.length; i++) {
     if (transcript[i].start > time) return transcript[i]
  }
  return {start: -1, duration: 0}
}

export default class VideoRenderer extends React.Component<IProps,IState>
   {
     async componentDidMount()
     {
      let response = await API.get(`video_transcript/processed/${this.props.videoId}/${this.props.words.join()}`)
      console.log(response.data)
      this.setState({
        transcript: response.data.parsed_transcript,
        nextTranscript: response.data.parsed_transcript[0]
      })
      console.log(this.state)
     }
     
     updateNextTranscript(progress: ProgressProps)
     {
      let nextTranscript = findNextTranscript(this.state.transcript, progress.playedSeconds)
      this.setState({nextTranscript: nextTranscript})
     }

     handleProgress(progress: ProgressProps)
     {
       console.log(progress)
       if ((this.state.nextTranscript.start > 0) && (this.state.nextTranscript.start + this.state.nextTranscript.duration < progress.playedSeconds))
       {
         console.log(this.state.nextTranscript)
        this.updateNextTranscript(progress)
       }
      }
     render() {
    return (
    <div className="App">
      <ReactPlayer url={`https://www.youtube.com/watch?v=${this.props.videoId}`} 
      onProgress={(arg) => this.handleProgress(arg)}/>
    </div>
  );
}
   }
