import requests
import tweepy
import json
import calendar
import io
import re
import nltk, nltk.classify.util, nltk.metrics
from nltk.classify import NaiveBayesClassifier

def feature_select(words):
    return dict([(word, True) for word in words])

def getClassifier():
    # split data
    with io.open('rt-polaritydata/rt-polarity.pos', encoding = "ISO-8859-1") as pos:
      pos = pos.read().split('\n')
    with io.open('rt-polaritydata/rt-polarity.neg', encoding = "ISO-8859-1") as neg:
      neg = neg.read().split('\n')
    
    # Extract positive and negative features
    pFeatures = []
    nFeatures = []
    for i in pos: 
        posWords = re.findall(r"[\w]+|[..!?;]", i)
        posWords = [feature_select(posWords), '1']
        pFeatures.append(posWords)
    for i in neg:
        negWords = re.findall(r"[\w]+|[..!?;]", i)
        negWords = [feature_select(negWords), '-1']
        nFeatures.append(negWords)
    traindata = nFeatures + pFeatures 
    classifier = NaiveBayesClassifier.train(traindata)
    return classifier

def shades(username, classifier, isChart):
    cred = open("auth.txt").read().split()
    auth = tweepy.OAuthHandler(cred[0], cred[1])
    api = tweepy.API(auth)
    if not isChart:
        score = 0
        for tweet in api.user_timeline(screen_name=username, count=5):
            score += int(classifier.classify(feature_select(str(tweet.text).split())))
        return str(score)
    else:
        result = []
        times = []
        for tweet in api.user_timeline(screen_name=username, count=10):
            result += [int(classifier.classify(feature_select(str(tweet.text).split())))]
            times  += [calendar.timegm(tweet.created_at.timetuple()) * 1000]
        data = zip(times, result) 
        return json.dumps(data)

