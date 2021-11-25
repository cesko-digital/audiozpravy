from django.contrib import admin

from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'pub_date', 'perex', 'url', 'text', 'recording_url', 'provider','category')
    list_filter = ('pub_date',)
