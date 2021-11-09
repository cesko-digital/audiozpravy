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
    articles = DjangoFilterConnectionField(ArticleNode, description='Return list of Articles.')
    providers = List(ProviderNode, description='Return list of Providers.')
    listeners = DjangoFilterConnectionField(ListenerNode, description='Return list of Listeners.')
    playlists = DjangoFilterConnectionField(PlaylistNode, description='Return list of Playlists.')
    playlists_for_today = List(PlaylistNode, required=True)
    playlists_for_this_week = List(PlaylistNode, required=True)

    def resolve_articles(root, info):
        return Article.objects.all()

    def resolve_providers(root, info):
        return Provider.objects.all()

    def resolve_listeners(root, info):
        return Listener.objects.all()

    def resolve_playlists(root, info):
        return Playlist.objects.all()

    def resolve_playlists_for_today(root, info):
        return Playlist.objects.filter(prepared_for_date=datetime.today()).filter(type="Day").all()

    def resolve_playlists_for_this_week(root, info):
        return Playlist.objects.filter(prepared_for_date=datetime.today()).filter(type="Week").all()
