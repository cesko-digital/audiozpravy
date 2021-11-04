from django.contrib.auth.models import User
from django.db import models


class Listener(User):
    device_id = models.CharField(max_length=256)

    class Meta:
        proxy = True
        ordering = ['device_id']
        db_table="a_listener"

    def __str__(self) -> str:
        return self.device_id


class Provider(models.Model):
    name = models.CharField(max_length=256)
    website_url = models.CharField(max_length=256)
    rss_feed_url = models.CharField(max_length=256)

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table="a_provider"


class Category(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table="a_category"


class Article(models.Model):
    title = models.CharField(max_length=256)
    perex = models.CharField(max_length=1000)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='articles')
    url = models.CharField(max_length=256)
    text = models.CharField(max_length=10000)
    pub_date = models.DateField()
    recording_url = models.CharField(max_length=256)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='articles')

    class Meta:
        ordering = ['pub_date']
        db_table="a_article"

    def __str__(self) -> str:
        return self.title


class Play(models.Model):
    listener =  models.ForeignKey(Listener, on_delete=models.CASCADE, related_name='plays')
    article =  models.ForeignKey(Article, on_delete=models.CASCADE, related_name='plays')
    play_date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.listener.username}-{self.article.title}"

    class Meta:
        db_table="a_play"


class Playlist(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='playlists')
    articles = models.ManyToManyField(Article, related_name='playlists')
    prepared_for_date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.listener.username}-{self.article.title}"

    class Meta:
        db_table="a_playlist"



