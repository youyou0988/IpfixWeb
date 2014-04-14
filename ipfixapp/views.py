# coding:utf-8
# Create your views here.

from django.http import HttpResponse
from django.forms.models import model_to_dict
from django.shortcuts import render_to_response
from django.template import RequestContext
from models import IpfixAdEntropyAllQ2T10
from os.path import dirname
import os
import json

SDIC = {'code': 200, 'msg': 'OK'}


def process(req,type):
    print dirname(dirname(__file__))
    return render_to_response('main_page.html', RequestContext(req, locals()))

def get_data(req,type):
    st = req.GET.get('starttime')
    et = req.GET.get('endtime')
    alldata = IpfixAdEntropyAllQ2T10.objects.filter(tstamp__gte=st).filter(tstamp__lte=et)
    dic = []
    for ad in alldata:
        dic.append(model_to_dict(ad))
    
    res = HttpResponse(json.dumps(dic), content_type='application/json')
    res.status_code = '200'

    return res
    