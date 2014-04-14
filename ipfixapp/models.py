# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#     * Rearrange models' order
#     * Make sure each model has one field with primary_key=True
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.

from django.db import models

class Ipfix12456789ABCDEF1011209899(models.Model):
    id_ipfix_messages = models.IntegerField()
    ie0_8 = models.CharField(max_length=4096, blank=True)
    ie0_c = models.CharField(max_length=4096, blank=True)
    ie0_5 = models.IntegerField(null=True, blank=True)
    ie0_4 = models.IntegerField(null=True, blank=True)
    ie0_7 = models.IntegerField(null=True, blank=True)
    ie0_b = models.IntegerField(null=True, blank=True)
    ie0_20 = models.IntegerField(null=True, blank=True)
    ie0_a = models.IntegerField(null=True, blank=True)
    ie0_9 = models.IntegerField(null=True, blank=True)
    ie0_d = models.IntegerField(null=True, blank=True)
    ie0_10 = models.IntegerField(null=True, blank=True)
    ie0_11 = models.IntegerField(null=True, blank=True)
    ie0_f = models.CharField(max_length=4096, blank=True)
    ie0_6 = models.IntegerField(null=True, blank=True)
    ie0_e = models.IntegerField(null=True, blank=True)
    ie0_1 = models.BigIntegerField(null=True, blank=True)
    ie0_2 = models.BigIntegerField(null=True, blank=True)
    ie0_98 = models.BigIntegerField(null=True, blank=True)
    ie0_99 = models.BigIntegerField(null=True, blank=True)
    class Meta:
        db_table = u'ipfix_1_2_4_5_6_7_8_9_a_b_c_d_e_f_10_11_20_98_99'

class Ipfix8290A0D6D7(models.Model):
    id_ipfix_messages = models.IntegerField()
    ie0_90 = models.IntegerField(null=True, blank=True)
    ie0_a0 = models.BigIntegerField(null=True, blank=True)
    ie0_82 = models.CharField(max_length=4096, blank=True)
    ie0_d6 = models.IntegerField(null=True, blank=True)
    ie0_d7 = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'ipfix_82_90_a0_d6_d7'

class IpfixAdEntropyAllQ2T10(models.Model):
    id = models.IntegerField(primary_key=True)
    tstamp = models.IntegerField()
    srcip_entro = models.FloatField(null=True, db_column='srcIP_Entro', blank=True) # Field name made lowercase.
    dstip_entro = models.FloatField(null=True, db_column='dstIP_Entro', blank=True) # Field name made lowercase.
    srcport_entro = models.FloatField(null=True, db_column='srcPort_Entro', blank=True) # Field name made lowercase.
    dstport_entro = models.FloatField(null=True, db_column='dstPort_Entro', blank=True) # Field name made lowercase.
    anomaly = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'ipfix_AD_entropy_all_q_2_t_10'

class IpfixAdEntropyInToInQ2T10(models.Model):
    id = models.IntegerField(primary_key=True)
    tstamp = models.IntegerField()
    srcip_entro = models.FloatField(null=True, db_column='srcIP_Entro', blank=True) # Field name made lowercase.
    dstip_entro = models.FloatField(null=True, db_column='dstIP_Entro', blank=True) # Field name made lowercase.
    srcport_entro = models.FloatField(null=True, db_column='srcPort_Entro', blank=True) # Field name made lowercase.
    dstport_entro = models.FloatField(null=True, db_column='dstPort_Entro', blank=True) # Field name made lowercase.
    anomaly = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'ipfix_AD_entropy_in_to_in_q_2_t_10'

class IpfixAdEntropyInToOutQ2T10(models.Model):
    id = models.IntegerField(primary_key=True)
    tstamp = models.IntegerField()
    srcip_entro = models.FloatField(null=True, db_column='srcIP_Entro', blank=True) # Field name made lowercase.
    dstip_entro = models.FloatField(null=True, db_column='dstIP_Entro', blank=True) # Field name made lowercase.
    srcport_entro = models.FloatField(null=True, db_column='srcPort_Entro', blank=True) # Field name made lowercase.
    dstport_entro = models.FloatField(null=True, db_column='dstPort_Entro', blank=True) # Field name made lowercase.
    anomaly = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'ipfix_AD_entropy_in_to_out_q_2_t_10'

class IpfixAdEntropyOutToInQ2T10(models.Model):
    id = models.IntegerField(primary_key=True)
    tstamp = models.IntegerField()
    srcip_entro = models.FloatField(null=True, db_column='srcIP_Entro', blank=True) # Field name made lowercase.
    dstip_entro = models.FloatField(null=True, db_column='dstIP_Entro', blank=True) # Field name made lowercase.
    srcport_entro = models.FloatField(null=True, db_column='srcPort_Entro', blank=True) # Field name made lowercase.
    dstport_entro = models.FloatField(null=True, db_column='dstPort_Entro', blank=True) # Field name made lowercase.
    anomaly = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'ipfix_AD_entropy_out_to_in_q_2_t_10'

class IpfixAdEntropyOutToOutQ2T10(models.Model):
    id = models.IntegerField(primary_key=True)
    tstamp = models.IntegerField()
    srcip_entro = models.FloatField(null=True, db_column='srcIP_Entro', blank=True) # Field name made lowercase.
    dstip_entro = models.FloatField(null=True, db_column='dstIP_Entro', blank=True) # Field name made lowercase.
    srcport_entro = models.FloatField(null=True, db_column='srcPort_Entro', blank=True) # Field name made lowercase.
    dstport_entro = models.FloatField(null=True, db_column='dstPort_Entro', blank=True) # Field name made lowercase.
    anomaly = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = u'ipfix_AD_entropy_out_to_out_q_2_t_10'

class IpfixExporters(models.Model):
    id = models.IntegerField(primary_key=True)
    observation_domain = models.IntegerField()
    ipaddr = models.TextField()
    description = models.TextField(blank=True)
    class Meta:
        db_table = u'ipfix_exporters'

class IpfixMapping(models.Model):
    id_ipfix_messages = models.IntegerField()
    id_ipfix_templates = models.IntegerField()
    class Meta:
        db_table = u'ipfix_mapping'

class IpfixMessages(models.Model):
    id = models.IntegerField(primary_key=True)
    id_exporters = models.IntegerField()
    tstamp = models.IntegerField()
    class Meta:
        db_table = u'ipfix_messages'

class IpfixTemplates(models.Model):
    id = models.IntegerField(primary_key=True)
    template_ident = models.TextField(blank=True)
    table_name = models.TextField(blank=True)
    class Meta:
        db_table = u'ipfix_templates'

