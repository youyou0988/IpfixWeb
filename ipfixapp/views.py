# coding:utf-8
# Create your views here.

from django.http import HttpResponse
from django.forms.models import model_to_dict
from django.shortcuts import render_to_response
from django.template import RequestContext
from models import IpfixAdEntropyAllQ2T10,IpfixAdEntropyInToInQ2T10,IpfixAdEntropyInToOutQ2T10,IpfixAdEntropyOutToInQ2T10,IpfixAdEntropyOutToOutQ2T10
from os.path import dirname
import os
import json

SDIC = {'code': 200, 'msg': 'OK'}
def preprocess(req):
    return render_to_response('detail.html', RequestContext(req, locals()))

def process(req):
    ctype = req.GET.get('type')
    # res = HttpResponse(json.dumps(ctype), content_type='application/json')
    # res.status_code = '200'
    # return res
    return render_to_response('detail.html', RequestContext(req, locals()))

def get_data(req,type):
    ctype = req.GET.get('type')
    st = req.GET.get('starttime')
    et = req.GET.get('endtime')
    if ctype == 'all':
        alldata = IpfixAdEntropyAllQ2T10.objects.filter(tstamp__gte=st).filter(tstamp__lte=et)
    elif ctype=='in-to-in':
        alldata = IpfixAdEntropyInToInQ2T10.objects.filter(tstamp__gte=st).filter(tstamp__lte=et)
    elif ctype == 'in-to-out':
        alldata = IpfixAdEntropyInToOutQ2T10.objects.filter(tstamp__gte=st).filter(tstamp__lte=et)
    elif ctype == 'out-to-in':
        alldata = IpfixAdEntropyOutToInQ2T10.objects.filter(tstamp__gte=st).filter(tstamp__lte=et)
    elif ctype == 'out-to-out':
        alldata = IpfixAdEntropyOutToOutQ2T10.objects.filter(tstamp__gte=st).filter(tstamp__lte=et)

    dic = []
    for ad in alldata:
        dic.append(model_to_dict(ad))
    
    res = HttpResponse(json.dumps(dic), content_type='application/json')
    res.status_code = '200'

    return res
    