from django.db.models.query import QuerySet
from graphene import Field, Int, List, NonNull
from graphene.relay import Connection, Node
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql.execution.base import ResolveInfo
from promise.promise import Promise
from ..models import Article, Listener, Play, Provider, Playlist
from .play import PlayNode
from .category import CategoryNode
from .article import ArticleNode


class PlaylistNode(DjangoObjectType):
    articles = List(NonNull(ArticleNode), required=True)
    category = NonNull(CategoryNode)

    class Meta:
        model = Playlist
        interfaces = (Node,)
        filter_fields = {
            "type": ["exact"],
            "prepared_for_date": ["gte", "lte"],
        }

    def resolve_articles(root, info, **kwargs):
        return Playlist.objects.get(id=root.id).articles

    def resolve_category(root, info, **kwargs):
        return Playlist.objects.get(id=root.id).category


