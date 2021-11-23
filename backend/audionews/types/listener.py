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

    def resolve_queue(root, info, played_article_ids: List(int)):
        history = Listener.objects.get(id=root.id).plays.all()
        articles_from_history = [play.article for play in history]
        played_articles = Article.objects.filter(id__in=played_article_ids)
        #vyzobrat articles ze play history
        recommended_article_ids =  QueueFiller.recommend_articles(played_articles=played_articles, article_history=articles_from_history)
        return Article.objects.filter(id__in=recommended_article_ids)


