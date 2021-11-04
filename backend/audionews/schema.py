from graphene import ObjectType
from graphene.relay import Node
from graphene import Field, Int, List, String
from graphene_django.filter import DjangoFilterConnectionField
from datetime import datetime

from .mutations import CreateListener
from .types import ArticleNode, ListenerNode, PlayNode, ProviderNode, PlaylistNode
from .models import Article, Listener, Play, Provider, Playlist


class Mutation(ObjectType):
    create_listener = CreateListener.Field(description='Create a single Listener.')


class Query(ObjectType):
    article = Node.Field(ArticleNode, description='Retrieve a single Article node.')
    listener = Node.Field(ListenerNode, description='Retrieve a single Listener node.')
    articles = List(ArticleNode, description='Return list of Articles.')
    providers = List(ProviderNode, description='Return list of Providers.')
    listeners = List(ListenerNode, description='Return list of Listeners.')
    playlists = List(PlaylistNode, description='Return list of Playlists.')
    playlists_for_today = List(PlaylistNode, required=True)
    articles_by_query = List(ArticleNode, required=True, query=String(required=True))
    listeners_by_query = List(ListenerNode, required=True, query=String(required=True))

    def resolve_articles(root, info):
        return Article.objects.all()

    def resolve_providers(root, info):
        return Provider.objects.all()

    def resolve_listeners(root, info):
        return Listener.objects.all()

    def resolve_playlists(root, info):
        return Playlist.objects.all()

    def resolve_playlists_for_today(root, info):
        return Playlist.objects.filter(prepared_for_date=datetime.today()).all()

    def resolve_articles_by_query(root, info, query):
        return Article.objects.filter(text__contains=query).all()

    def resolve_listeners_by_query(root, info, query):
        return Listener.objects.filter(username__contains=query).all()
