import os
from datetime import datetime
from audionews.models import Provider, Play, Playlist, Listener, Category, Article
import django


if __name__ == '__main__':
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "API.settings")
    django.setup()
    provider, created = Provider.objects.get_or_create(name="čtidoma", website_url="ctidoma.cz")
    listener, created = Listener.objects.get_or_create(device_id="1")
    category, created = Category.objects.get_or_create(name="Politika")
    article, created = Article.objects.get_or_create(category=category,
                                  title="Babiš prohrál",
                                  perex="Změna je tu",
                                  pub_date=datetime.today(),
                                  url="ctidoma.cz/babis",
                                  provider=provider
    )
    playlist, created = Playlist.objects.get_or_create(category=category)
    playlist.articles.add(article)
    play, created = Play.objects.get_or_create(article=article, listener=listener)
