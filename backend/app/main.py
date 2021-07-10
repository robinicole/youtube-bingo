from typing import Optional
from fastapi import FastAPI, HTTPException
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api import TranscriptsDisabled

app = FastAPI()

@app.get("/video_transcript/{video_id}")
def read_item(video_id: str, q: Optional[str] = None):
    try:
        return {
            'video_id': video_id,
            'transcript': YouTubeTranscriptApi.get_transcript(video_id)
        }
    except TranscriptsDisabled as e:
        raise HTTPException(status_code=500, detail=e.__str__())