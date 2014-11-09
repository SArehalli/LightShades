import requests
import tweepy
import json
import calendar

def shades(username, isChart):
    cred = open("auth.txt").read().split()
    auth = tweepy.OAuthHandler(cred[0], cred[1])
    api = tweepy.API(auth)
    if not isChart:
        score = 0;
        for tweet in api.user_timeline(screen_name=username, count=5):
            r = requests.get("https://www.tweetsentimentapi.com/api/?key=aa0957a66e88ede2e377b9bb9a6d31f2f0cdfdc6&text='" + tweet.text + "'");
            score += r.json()[u'score']
        return str(score)
    else:
        result = []
        times = []
        for tweet in api.user_timeline(screen_name=username, count=10):
            r = requests.get("https://www.tweetsentimentapi.com/api/?key=aa0957a66e88ede2e377b9bb9a6d31f2f0cdfdc6&text='" + tweet.text + "'");
            result += [r.json()[u'score']]
            times  += [calendar.timegm(tweet.created_at.timetuple()) * 1000]
        data = zip(times, result) 
        return json.dumps(data)

