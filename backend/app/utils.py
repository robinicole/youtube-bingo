
from typing import List
from copy import deepcopy

def parse_output(transcript: dict, words: List[str]):
    """
    Parse a transcript and only keep the part of it which contain the words 
    in the words list
    Input: 
        transcript: [{
            'text': .......
        }]
    Output: 
        [
            {
                text: .....
                words: [w1, w2, ....]
            }
        ]
    """
    output = []
    transcript = deepcopy(transcript)
    for transcript_part in transcript:
        words_in_transcript_part = [
            word for word in words
            if word in transcript_part['text'].lower()
        ]
        if words_in_transcript_part:
            transcript_part['words'] = words_in_transcript_part
            output.append(transcript_part)
    return output