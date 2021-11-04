from django.contrib import admin

from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'pub_date', 'perex', 'url', 'text', 'recording_url')
    list_filter = ('pub_date',)
    raw_id_fields = ('provider',)
