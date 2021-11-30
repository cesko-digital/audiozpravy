from datetime import datetime

from django.db.models.query import QuerySet
from graphene import Field, Int, List, NonNull
from graphene.relay import Connection, Node
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql.execution.base import ResolveInfo
from promise.promise import Promise
from ..models import Article, Listener, Play, Provider
from .play import PlayNode
from .article import ArticleNode
from classes.queue_filler import QueueFiller

class ListenerNode(DjangoObjectType):
    plays = List(NonNull(PlayNode), required=True)
    queue = List(NonNull(ArticleNode), played_article_ids=List(Int))

    class Meta:
        model = Listener
        interfaces = (Node,)
        filter_fields = {
            "username": ["exact", "icontains", "istartswith"],
            "first_name": ["exact", "icontains", "istartswith"],
            "last_name": ["exact", "icontains", "istartswith"],
            "email": ["exact", "icontains"],
            "device_id": ["exact"],
        }

    def resolve_plays(root, info, **kwargs):
        return Play.objects.filter(listener_id=root.id).all()


    def resolve_queue(root, user_id, n_of_articles: int = 10):
        user_plays = Listener.objects.get(user_ptr_id=user_id).plays.all()

        user_articles_ids = [play.article.id for play in user_plays]
        user_articles = Article.objects.filter(id__in=user_articles_ids)

        # get user history articles
        our_date = datetime.datetime(2018, 10, 10)
        all_articles = Article.objects.filter(pub_date__gte=our_date)

        recommended_ids = QueueFiller.recommend_articles(user_articles, all_articles)
        recommended_articles_queue = Article.objects.filter(id__in=recommended_ids[:n_of_articles])
        return recommended_articles_queue
