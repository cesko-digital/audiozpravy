import datetime

from django.db.models.query import QuerySet
from graphene import Field, Int, List, NonNull, Date, String
from graphene.relay import Connection, Node
from graphene_django import DjangoConnectionField, DjangoObjectType
from ..models import Article, Listener, Play, Provider, Playlist, Category
from .play import PlayNode
from .category import CategoryNode
from .article import ArticleNode


class PlaylistNode(DjangoObjectType):
    articles = List(NonNull(ArticleNode), required=True)
    articles_for_category = List(NonNull(ArticleNode), for_date=Date(), category_name=String())
    category = NonNull(CategoryNode)

    class Meta:
        model = Playlist
        interfaces = (Node,)
        filter_fields = {
            "type": ["exact"],
            "prepared_for_date": ["gte", "lte"],
        }

    def resolve_articles(root, info, **kwargs):
        return Playlist.objects.get(id=root.id).articles.all()

    def resolve_category(root, info, **kwargs):
        return Playlist.objects.get(id=root.id).category

    def resolve_articles_for_category(root, info, for_date: Date, category_name: str):
        playlist = Playlist.objects.filter(
            prepared_for_date=for_date,
            category__name=category_name
        )
        return playlist.articles.all()
