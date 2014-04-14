# coding:utf-8
# Create your views here.

from django.http import HttpResponse
from django.forms.models import model_to_dict
from django.shortcuts import render_to_response
from django.template import RequestContext
from models import IpfixAdEntropyAllQ2T10
import os
import json

SDIC = {'code': 200, 'msg': 'OK'}


def process(req,type):
    
    return render_to_response('main_page.html', RequestContext(req, locals()))

def get_data(req,type):
    ts = req.GET.get('time')
    alldata = IpfixAdEntropyAllQ2T10.objects.filter(tstamp=ts)
    dic = {}
    for ad in alldata:
        dic = model_to_dict(ad)
    
    dic = {'error':SDIC,'data':dic}
    res = HttpResponse(json.dumps(dic), content_type='application/json')
    res.status_code = '200'

    return res
    