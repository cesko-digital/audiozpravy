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

class ListenerNode(DjangoObjectType):
    plays = List(NonNull(PlayNode), required=True)
    queue = List(NonNull(ArticleNode), article_ids=List(Int))

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

    def resolve_queue(root, info, **kwargs):
        print(info)
        print(kwargs)
        return Article.objects.all()
        #TODO: Napojit na recommendation engine

