from typing import Optional, List
from fastapi import FastAPI, HTTPException
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api import TranscriptsDisabled
from functools import lru_cache
from .utils import parse_output
app = FastAPI()

@lru_cache(maxsize=None)
def cached_transcript(video_id: str):
    """
    Caching layer on top of the youtube subtitles api
    """
    return YouTubeTranscriptApi.get_transcript(video_id)


@app.get("/video_transcript/raw/{video_id}")
def raw_transcript(video_id: str, q: Optional[str] = None):
    """
    Interface to download the raw transcript from youtube
    video
    """
    try:
        return {
            'video_id': video_id,
            'transcript': cached_transcript(video_id)
        }
    except TranscriptsDisabled as e:
        raise HTTPException(status_code=500, detail=e.__str__())

@app.get("/video_transcript/processed/{video_id}/{words_list}")
def process_transcript(video_id: str, words_list: str):
    """
    Endpoint to retrieve the part of the transcript which contain one of the words supplied in the 
    words_list
    Input:
    video_id: the id of the video we want to check
    words_list: a coma separated list of the words that need to appear
    """
    words = [word.lower() for word in words_list.split(',')]
    transcript = cached_transcript(video_id)
    return {'video_id': video_id,
            'parsed_transcript': parse_output(transcript, words)
    }
